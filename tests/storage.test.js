/* Teste da migração v1 -> v2 e do read-model do histórico. */
const path = require("path");
const assert = require("assert");
const STORAGE = path.resolve(process.argv[2] || "dist/storage.js");

/* Espelha a interface Storage do browser: getItem/setItem/removeItem/length/key(i). */
function fakeLocalStorage(seed) {
  const data = Object.assign({}, seed);
  const store = {
    getItem: k => (Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
    removeItem: k => { delete data[k]; },
    key: i => (Object.keys(data)[i] === undefined ? null : Object.keys(data)[i]),
    _data: data
  };
  Object.defineProperty(store, "length", { get: () => Object.keys(data).length });
  return store;
}

function boot(seed) {
  const store = fakeLocalStorage(seed);
  const sandbox = { localStorage: store };
  sandbox.self = sandbox;
  const vm = require("vm");
  vm.createContext(sandbox);
  vm.runInContext(require("fs").readFileSync(STORAGE, "utf8"), sandbox, { filename: STORAGE });
  return { RepDB: sandbox.RepDB, store };
}

/* Os objetos nascem dentro da VM, com protótipos de outro realm:
   deepStrictEqual falharia por identidade de construtor, não por conteúdo. */
function mesmoConteudo(atual, esperado, mensagem) {
  assert.strictEqual(JSON.stringify(atual), JSON.stringify(esperado), mensagem);
}

let falhas = 0;
function teste(nome, fn) {
  try { fn(); console.log("  ok  " + nome); }
  catch (e) { falhas += 1; console.log("FALHA " + nome + "\n      " + e.message); }
}

console.log("\n== migração v1 -> v2 ==");

// O fake precisa expor as chaves via Object.keys, como o localStorage real.
function seedRealista() {
  return {
    "rep-workout-2026-09-10": JSON.stringify({
      "supino-reto": [
        { weight: "60", reps: "10", done: true },
        { weight: "62.5", reps: "8", done: true },
        { weight: "", reps: "", done: false }
      ],
      "crucifixo": [{ weight: "14", reps: "12", done: true }]
    }),
    "rep-workout-2026-09-12": JSON.stringify({
      "supino-reto": [{ weight: "65", reps: "8", done: true }]
    }),
    "rep-workout-history": JSON.stringify([
      { date: "2026-09-12", sets: 1 },
      { date: "2026-09-10", sets: 3 },
      { date: "2026-08-28", sets: 11 }
    ]),
    "rep-exercise-selections-v1": JSON.stringify({ peito: ["supino-reto"] }),
    "rep-active-muscle": "peito"
  };
}

const a = boot(seedRealista());

teste("cria o banco v2", () => {
  const db = JSON.parse(a.store.getItem("rep-db-v2"));
  assert.strictEqual(db.version, 2);
  assert.ok(db.sessions["2026-09-10"], "sessao de 10/09 ausente");
});

teste("preserva carga e reps de cada série", () => {
  const db = JSON.parse(a.store.getItem("rep-db-v2"));
  const sets = db.sessions["2026-09-10"].exercises["supino-reto"];
  assert.strictEqual(sets.length, 3);
  mesmoConteudo(sets[1], { weight: "62.5", reps: "8", done: true });
});

teste("dia que só existia no resumo vira legacySets", () => {
  const db = JSON.parse(a.store.getItem("rep-db-v2"));
  assert.strictEqual(db.sessions["2026-08-28"].legacySets, 11);
  mesmoConteudo(db.sessions["2026-08-28"].exercises, {});
});

teste("apaga as chaves v1 depois de migrar", () => {
  assert.strictEqual(a.store.getItem("rep-workout-2026-09-10"), null);
  assert.strictEqual(a.store.getItem("rep-workout-2026-09-12"), null);
  assert.strictEqual(a.store.getItem("rep-workout-history"), null);
});

teste("não toca em seleção de exercícios nem no grupo ativo", () => {
  assert.ok(a.store.getItem("rep-exercise-selections-v1"));
  assert.strictEqual(a.store.getItem("rep-active-muscle"), "peito");
});

teste("é idempotente: segundo boot não duplica nem perde nada", () => {
  const antes = a.store.getItem("rep-db-v2");
  const b = boot(a.store._data);
  mesmoConteudo(
    JSON.parse(b.store.getItem("rep-db-v2")).sessions,
    JSON.parse(antes).sessions
  );
});

console.log("\n== read-model ==");

teste("lastPerformance acha a sessão mais recente anterior", () => {
  const r = a.RepDB.lastPerformance("supino-reto", "2026-09-16");
  assert.strictEqual(r.date, "2026-09-12");
  assert.strictEqual(r.sets[0].weight, "65");
});

teste("lastPerformance ignora o próprio dia e os não concluídos", () => {
  const r = a.RepDB.lastPerformance("supino-reto", "2026-09-12");
  assert.strictEqual(r.date, "2026-09-10");
  assert.strictEqual(r.sets.length, 2, "a série em branco não deveria contar");
});

teste("lastPerformance devolve null para exercício nunca feito", () => {
  assert.strictEqual(a.RepDB.lastPerformance("prancha", "2026-09-16"), null);
});

teste("histórico calcula volume (carga x reps)", () => {
  const dia = a.RepDB.history(30).find(item => item.date === "2026-09-10");
  // 60*10 + 62.5*8 + 14*12 = 600 + 500 + 168
  assert.strictEqual(dia.volume, 1268);
  assert.strictEqual(dia.doneSets, 3);
  assert.strictEqual(dia.detailed, true);
});

teste("histórico marca dia legado como sem detalhe", () => {
  const dia = a.RepDB.history(30).find(item => item.date === "2026-08-28");
  assert.strictEqual(dia.doneSets, 11);
  assert.strictEqual(dia.detailed, false);
});

teste("histórico vem do mais recente para o mais antigo", () => {
  mesmoConteudo(
    a.RepDB.history(30).map(i => i.date),
    ["2026-09-12", "2026-09-10", "2026-08-28"]
  );
});

teste("melhor série do exercício é a de maior carga", () => {
  const dia = a.RepDB.history(30).find(item => item.date === "2026-09-10");
  const supino = dia.exercises.find(e => e.id === "supino-reto");
  assert.strictEqual(supino.best.weight, "62.5");
});

console.log("\n== escrita e limpeza ==");

teste("escrever na sessão do dia persiste", () => {
  const hoje = "2026-09-16";
  const ex = a.RepDB.sessionExercises(hoje);
  ex["agachamento"] = [{ weight: "80", reps: "10", done: true }];
  a.RepDB.save(hoje);
  const db = JSON.parse(a.store.getItem("rep-db-v2"));
  assert.strictEqual(db.sessions[hoje].exercises["agachamento"][0].weight, "80");
});

teste("prune não remove a sessão aberta mesmo vazia", () => {
  const c = boot({});
  const ex = c.RepDB.sessionExercises("2026-09-16");
  c.RepDB.save("2026-09-16");
  ex["prancha"] = [{ weight: "", reps: "30", done: true }];
  c.RepDB.save("2026-09-16");
  const db = JSON.parse(c.store.getItem("rep-db-v2"));
  assert.ok(db.sessions["2026-09-16"].exercises["prancha"], "referência do app ficou órfã");
});

teste("prune descarta sessão antiga sem nada dentro", () => {
  const c = boot({ "rep-db-v2": JSON.stringify({ version: 2, sessions: {
    "2026-01-01": { exercises: { x: [{ weight: "", reps: "", done: false }] }, legacySets: null },
    "2026-01-02": { exercises: { x: [{ weight: "50", reps: "5", done: true }] }, legacySets: null }
  }}) });
  c.RepDB.save();
  const db = JSON.parse(c.store.getItem("rep-db-v2"));
  assert.ok(!db.sessions["2026-01-01"], "dia vazio deveria sumir");
  assert.ok(db.sessions["2026-01-02"], "dia com treino sumiu");
});

teste("clearSession apaga só o dia pedido", () => {
  a.RepDB.clearSession("2026-09-16");
  const db = JSON.parse(a.store.getItem("rep-db-v2"));
  assert.ok(!db.sessions["2026-09-16"]);
  assert.ok(db.sessions["2026-09-12"], "apagou dia que não devia");
});

console.log("\n== robustez ==");

teste("banco corrompido não derruba o app", () => {
  const c = boot({ "rep-db-v2": "{lixo:::" });
  mesmoConteudo(c.RepDB.history(30), []);
});

teste("sessão v1 corrompida é ignorada sem travar a migração", () => {
  const c = boot({
    "rep-workout-2026-05-05": "nao é json",
    "rep-workout-2026-05-06": JSON.stringify({ stiff: [{ weight: "40", reps: "10", done: true }] })
  });
  assert.strictEqual(c.RepDB.history(30).length, 1);
  assert.strictEqual(c.RepDB.history(30)[0].date, "2026-05-06");
});

teste("valores numéricos legados viram string sem quebrar o volume", () => {
  const c = boot({ "rep-workout-2026-06-01": JSON.stringify({
    legpress: [{ weight: 120, reps: 12, done: true }]
  })});
  const dia = c.RepDB.history(30)[0];
  assert.strictEqual(dia.volume, 1440);
  assert.strictEqual(typeof JSON.parse(c.store.getItem("rep-db-v2")).sessions["2026-06-01"].exercises.legpress[0].weight, "string");
});

teste("carga com vírgula conta no volume", () => {
  const c = boot({ "rep-workout-2026-06-02": JSON.stringify({
    rosca: [{ weight: "12,5", reps: "10", done: true }]
  })});
  assert.strictEqual(c.RepDB.history(30)[0].volume, 125);
});

console.log(falhas ? "\n" + falhas + " teste(s) falhando\n" : "\ntodos os testes passaram\n");
process.exit(falhas ? 1 : 0);
