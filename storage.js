/*
 * Camada de dados do REP (v2).
 *
 * O que mudou em relação à v1: existia uma chave de localStorage por dia de
 * treino (`rep-workout-2026-09-16`, nunca apagada) e, em paralelo, um
 * `rep-workout-history` que guardava só a contagem de séries concluídas.
 * Carga e repetições morriam à meia-noite — o app não conseguia responder
 * "quanto eu levantei da última vez?".
 *
 * A v2 tem um banco só. Cada sessão guarda as séries inteiras, e tanto o
 * histórico quanto a última carga são derivados dele em vez de armazenados
 * em separado.
 *
 *   {
 *     version: 2,
 *     sessions: {
 *       "2026-09-16": {
 *         exercises: { "supino-reto": [ { weight: "60", reps: "10", done: true } ] },
 *         legacySets: null
 *       }
 *     }
 *   }
 *
 * `legacySets` existe só para os dias que vieram do resumo da v1: dá para
 * preservar quantas séries foram feitas, não dá para reconstruir a carga.
 */
(function (global) {
  "use strict";

  const DB_KEY = "rep-db-v2";
  const LEGACY_SESSION_PREFIX = "rep-workout-";
  const LEGACY_HISTORY_KEY = "rep-workout-history";
  const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
  const MAX_SESSIONS = 400; // ~18 meses treinando 5x por semana

  let db = null;

  function readKey(key) {
    try { return global.localStorage.getItem(key); } catch (error) { return null; }
  }

  function writeKey(key, value) {
    try { global.localStorage.setItem(key, value); return true; } catch (error) { return false; }
  }

  function removeKey(key) {
    try { global.localStorage.removeItem(key); } catch (error) { /* modo privado */ }
  }

  /* Via length/key(i) em vez de Object.keys: é a API garantida do Storage. */
  function allKeys() {
    const keys = [];
    try {
      for (let i = 0; i < global.localStorage.length; i += 1) {
        const key = global.localStorage.key(i);
        if (key !== null) keys.push(key);
      }
    } catch (error) { return []; }
    return keys;
  }

  function parse(raw, fallback) {
    if (!raw) return fallback;
    try {
      const value = JSON.parse(raw);
      return value === null || value === undefined ? fallback : value;
    } catch (error) { return fallback; }
  }

  function toNumber(value) {
    const text = value === null || value === undefined ? "" : String(value);
    const parsed = Number(text.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function emptySet() {
    return { weight: "", reps: "", done: false };
  }

  function normalizeSet(raw) {
    if (!raw || typeof raw !== "object") return emptySet();
    return {
      weight: raw.weight === null || raw.weight === undefined ? "" : String(raw.weight),
      reps: raw.reps === null || raw.reps === undefined ? "" : String(raw.reps),
      done: raw.done === true
    };
  }

  function normalizeSession(raw) {
    const session = { exercises: {}, legacySets: null };
    if (!raw || typeof raw !== "object") return session;
    const source = raw.exercises && typeof raw.exercises === "object" ? raw.exercises : {};
    Object.keys(source).forEach(id => {
      if (Array.isArray(source[id])) session.exercises[id] = source[id].map(normalizeSet);
    });
    if (typeof raw.legacySets === "number" && raw.legacySets > 0) session.legacySets = raw.legacySets;
    return session;
  }

  function hasContent(session) {
    if (session.legacySets) return true;
    return Object.keys(session.exercises).some(id =>
      session.exercises[id].some(set => set.done || set.weight !== "" || set.reps !== ""));
  }

  /*
   * Descarta sessões que não guardam nada e corta o rabo do histórico.
   * `keepDate` protege a sessão que o app está editando agora: o app segura
   * uma referência direta ao objeto de exercícios, e removê-lo aqui faria as
   * escritas seguintes caírem no vazio.
   */
  function prune(keepDate) {
    Object.keys(db.sessions).forEach(date => {
      if (date !== keepDate && !hasContent(db.sessions[date])) delete db.sessions[date];
    });
    const dates = Object.keys(db.sessions).sort();
    if (dates.length > MAX_SESSIONS) {
      dates.slice(0, dates.length - MAX_SESSIONS)
        .filter(date => date !== keepDate)
        .forEach(date => { delete db.sessions[date]; });
    }
  }

  function persist(keepDate) {
    prune(keepDate);
    return writeKey(DB_KEY, JSON.stringify(db));
  }

  /*
   * Migração v1 -> v2. Idempotente: só copia chaves antigas que ainda
   * existem, e elas só são removidas depois que o banco novo é gravado e
   * relido com sucesso.
   */
  function migrateLegacy(target) {
    const consumed = [];
    let imported = 0;

    allKeys().forEach(key => {
      if (key.indexOf(LEGACY_SESSION_PREFIX) !== 0) return;
      const date = key.slice(LEGACY_SESSION_PREFIX.length);
      if (!DATE_PATTERN.test(date)) return; // deixa passar o rep-workout-history
      consumed.push(key);
      const parsed = parse(readKey(key), null);
      if (!parsed || typeof parsed !== "object") return;
      const session = target.sessions[date] || { exercises: {}, legacySets: null };
      Object.keys(parsed).forEach(id => {
        if (Array.isArray(parsed[id]) && !session.exercises[id]) {
          session.exercises[id] = parsed[id].map(normalizeSet);
        }
      });
      target.sessions[date] = session;
      imported += 1;
    });

    const rawHistory = readKey(LEGACY_HISTORY_KEY);
    if (rawHistory !== null) {
      consumed.push(LEGACY_HISTORY_KEY);
      const legacyHistory = parse(rawHistory, []);
      if (Array.isArray(legacyHistory)) {
        legacyHistory.forEach(item => {
          if (!item || !DATE_PATTERN.test(String(item.date))) return;
          const session = target.sessions[item.date] || { exercises: {}, legacySets: null };
          if (!Object.keys(session.exercises).length && typeof item.sets === "number" && item.sets > 0) {
            session.legacySets = item.sets;
            imported += 1;
          }
          target.sessions[item.date] = session;
        });
      }
    }

    return { consumed: consumed, imported: imported };
  }

  function load() {
    if (db) return db;
    db = { version: 2, sessions: {} };
    const stored = parse(readKey(DB_KEY), null);
    if (stored && typeof stored === "object" && stored.sessions) {
      Object.keys(stored.sessions).forEach(date => {
        if (DATE_PATTERN.test(date)) db.sessions[date] = normalizeSession(stored.sessions[date]);
      });
    }
    const migration = migrateLegacy(db);
    if (migration.imported && persist() && parse(readKey(DB_KEY), null)) {
      migration.consumed.forEach(removeKey);
    }
    return db;
  }

  function statsFor(session) {
    let doneSets = 0;
    let volume = 0;
    const exercises = [];
    Object.keys(session.exercises).forEach(id => {
      const sets = session.exercises[id].filter(set => set.done);
      if (!sets.length) return;
      let exerciseVolume = 0;
      let best = sets[0];
      sets.forEach(set => {
        exerciseVolume += toNumber(set.weight) * toNumber(set.reps);
        if (toNumber(set.weight) > toNumber(best.weight)) best = set;
      });
      doneSets += sets.length;
      volume += exerciseVolume;
      exercises.push({ id: id, sets: sets, volume: exerciseVolume, best: best });
    });
    return {
      doneSets: doneSets || session.legacySets || 0,
      detailed: doneSets > 0,
      volume: volume,
      exercises: exercises
    };
  }

  global.RepDB = {
    /* Objeto de exercícios da data, criado sob demanda. O app escreve direto nele. */
    sessionExercises: function (date) {
      load();
      if (!db.sessions[date]) db.sessions[date] = { exercises: {}, legacySets: null };
      return db.sessions[date].exercises;
    },

    save: function (keepDate) {
      load();
      return persist(keepDate);
    },

    clearSession: function (date) {
      load();
      delete db.sessions[date];
      persist();
    },

    /* Histórico derivado, do mais recente para o mais antigo. */
    history: function (limit) {
      load();
      return Object.keys(db.sessions)
        .sort()
        .reverse()
        .slice(0, limit || 30)
        .map(date => Object.assign({ date: date }, statsFor(db.sessions[date])))
        .filter(item => item.doneSets > 0);
    },

    stats: function (date) {
      load();
      return statsFor(db.sessions[date] || { exercises: {}, legacySets: null });
    },

    /*
     * Última vez que este exercício foi concluído antes de `beforeDate`.
     * É a pergunta que a v1 não conseguia responder.
     */
    lastPerformance: function (exerciseId, beforeDate) {
      load();
      const dates = Object.keys(db.sessions).filter(date => date < beforeDate).sort().reverse();
      for (let i = 0; i < dates.length; i += 1) {
        const sets = db.sessions[dates[i]].exercises[exerciseId] || [];
        const done = sets.filter(set => set.done && (set.weight !== "" || set.reps !== ""));
        if (done.length) return { date: dates[i], sets: done };
      }
      return null;
    },

    emptySet: emptySet
  };

  // Migra no carregamento do script, e não na primeira chamada de API: assim
  // o estado do localStorage não depende de qual leitura o app faz primeiro.
  load();
}(typeof self !== "undefined" ? self : this));
