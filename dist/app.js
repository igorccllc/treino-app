const workoutPlan = [
  { id: "peito", label: "Peito", icon: "◒", code: "Treino A", exercises: [
    { id: "supino-reto", name: "Supino reto", detail: "Peitoral • Tríceps", target: "chest", targetLabel: "peitoral", sets: 4, tips: ["Apoie os pés e mantenha as escápulas firmes.", "Desça a barra com controle até a linha do peito.", "Empurre sem tirar os ombros do banco."] },
    { id: "supino-inclinado", name: "Supino inclinado", detail: "Peitoral superior", target: "chest", targetLabel: "peitoral superior", sets: 3, tips: ["Ajuste o banco entre 30° e 45°.", "Desça os halteres ao lado do peito.", "Suba mantendo os punhos alinhados."] },
    { id: "crucifixo", name: "Crucifixo com halteres", detail: "Peitoral", target: "chest", targetLabel: "peitoral", sets: 3, tips: ["Mantenha uma leve flexão nos cotovelos.", "Abra até sentir o peitoral alongar.", "Feche os braços sem bater os halteres."] },
    { id: "crossover", name: "Crossover", detail: "Peitoral • Core", target: "chest", targetLabel: "peitoral", sets: 3, tips: ["Incline o tronco levemente.", "Traga as mãos à frente do corpo.", "Retorne devagar, sem perder a postura."] },
    { id: "dips-peito", name: "Paralelas para peito", detail: "Peitoral inferior • Tríceps", target: "chest", targetLabel: "peitoral inferior", sets: 3, optional: true, tips: ["Incline o tronco levemente à frente.", "Desça até sentir o peitoral alongar.", "Suba sem travar os cotovelos."] },
    { id: "flexao", name: "Flexão de braços", detail: "Peitoral • Tríceps", target: "chest", targetLabel: "peitoral", sets: 3, optional: true, tips: ["Mantenha o corpo alinhado.", "Desça o peito com os cotovelos controlados.", "Empurre o chão mantendo o abdômen firme."] },
    { id: "supino-declinado", name: "Supino declinado", detail: "Peitoral inferior", target: "chest", targetLabel: "peitoral inferior", sets: 3, optional: true, tips: ["Prenda os pés e estabilize as escápulas.", "Desça os halteres na linha inferior do peito.", "Suba com controle e punhos alinhados."] }
  ]},
  { id: "costas", label: "Costas", icon: "⌁", code: "Treino B", exercises: [
    { id: "puxada", name: "Puxada frontal", detail: "Dorsais • Bíceps", target: "back", targetLabel: "dorsais", sets: 4, tips: ["Segure a barra um pouco além dos ombros.", "Puxe em direção à parte alta do peito.", "Suba controlando sem encolher os ombros."] },
    { id: "remada", name: "Remada baixa", detail: "Dorsais • Romboides", target: "back", targetLabel: "dorsais e romboides", sets: 3, tips: ["Mantenha a coluna neutra.", "Puxe o cabo em direção ao abdômen.", "Aproxime as escápulas no fim do movimento."] },
    { id: "serrote", name: "Remada unilateral", detail: "Dorsais", target: "back", targetLabel: "dorsais", sets: 3, tips: ["Apoie mão e joelho no banco.", "Puxe o halter perto do quadril.", "Evite girar o tronco durante a repetição."] },
    { id: "pulldown", name: "Pulldown", detail: "Dorsais", target: "back", targetLabel: "dorsais", sets: 3, tips: ["Mantenha os braços quase estendidos.", "Leve a barra até as coxas.", "Controle a volta e preserve o tronco firme."] },
    { id: "barra-fixa", name: "Barra fixa", detail: "Dorsais • Bíceps", target: "back", targetLabel: "dorsais", sets: 3, optional: true, tips: ["Comece com os ombros encaixados.", "Puxe o peito em direção à barra.", "Desça de forma controlada até estender os braços."] },
    { id: "remada-t", name: "Remada T", detail: "Dorsais • Romboides", target: "back", targetLabel: "meio das costas", sets: 3, optional: true, tips: ["Mantenha o tronco estável.", "Puxe a carga em direção ao peito.", "Aproxime as escápulas sem encolher os ombros."] },
    { id: "hiperextensao", name: "Hiperextensão lombar", detail: "Lombar • Glúteos", target: "back", targetLabel: "lombar", sets: 3, optional: true, tips: ["Apoie o quadril no banco.", "Desça mantendo a coluna neutra.", "Suba até alinhar o tronco, sem hiperestender."] }
  ]},
  { id: "pernas", label: "Pernas", icon: "⟋", code: "Treino C", exercises: [
    { id: "agachamento", name: "Agachamento livre", detail: "Quadríceps • Glúteos", target: "quads", targetLabel: "quadríceps", sets: 4, tips: ["Mantenha os pés firmes e o abdômen ativo.", "Desça com joelhos acompanhando a ponta dos pés.", "Suba empurrando o chão, sem curvar a coluna."] },
    { id: "legpress", name: "Leg press", detail: "Quadríceps • Glúteos", target: "quads", targetLabel: "quadríceps e glúteos", sets: 4, tips: ["Apoie toda a lombar no encosto.", "Desça a plataforma com controle.", "Estenda sem travar completamente os joelhos."] },
    { id: "extensora", name: "Cadeira extensora", detail: "Quadríceps", target: "quads", targetLabel: "quadríceps", sets: 3, tips: ["Alinhe o joelho ao eixo da máquina.", "Estenda as pernas sem tirar o quadril do banco.", "Desça lentamente até a posição inicial."] },
    { id: "flexora", name: "Mesa flexora", detail: "Posteriores", target: "hamstrings", targetLabel: "posteriores da coxa", sets: 3, tips: ["Mantenha o quadril apoiado.", "Flexione os joelhos até onde controlar.", "Retorne sem deixar o peso bater."] },
    { id: "panturrilha", name: "Panturrilha em pé", detail: "Panturrilhas", target: "calves", targetLabel: "panturrilhas", sets: 4, tips: ["Apoie a parte da frente dos pés.", "Suba o calcanhar o máximo possível.", "Desça devagar até alongar a panturrilha."] },
    { id: "stiff", name: "Stiff / Terra romeno", detail: "Posteriores • Glúteos", target: "hamstrings", targetLabel: "posteriores da coxa", sets: 3, optional: true, tips: ["Mantenha a coluna neutra e joelhos destravados.", "Leve o quadril para trás enquanto desce a barra.", "Suba contraindo glúteos e posteriores."] },
    { id: "afundo", name: "Afundo com halteres", detail: "Quadríceps • Glúteos", target: "quads", targetLabel: "quadríceps e glúteos", sets: 3, optional: true, tips: ["Dê um passo confortável à frente.", "Desça mantendo o joelho alinhado ao pé.", "Empurre o chão com a perna da frente."] },
    { id: "elevacao-pelvica", name: "Elevação pélvica", detail: "Glúteos • Posteriores", target: "hamstrings", targetLabel: "glúteos", sets: 4, optional: true, tips: ["Apoie as escápulas no banco.", "Eleve o quadril mantendo as costelas baixas.", "Contraia os glúteos no topo sem arquear a lombar."] },
    { id: "panturrilha-sentado", name: "Panturrilha sentado", detail: "Panturrilhas", target: "calves", targetLabel: "panturrilhas", sets: 4, optional: true, tips: ["Apoie a ponta dos pés na plataforma.", "Eleve os calcanhares até o máximo controle.", "Desça lentamente até alongar."] }
  ]},
  { id: "ombros", label: "Ombros", icon: "◇", code: "Treino D", exercises: [
    { id: "desenvolvimento", name: "Desenvolvimento", detail: "Deltoides • Tríceps", target: "shoulders", targetLabel: "ombros", sets: 4, tips: ["Mantenha o tronco firme e os punhos alinhados.", "Empurre os halteres acima da cabeça.", "Desça até os cotovelos ficarem próximos de 90°."] },
    { id: "elevacao-lateral", name: "Elevação lateral", detail: "Deltoide lateral", target: "shoulders", targetLabel: "deltoides laterais", sets: 3, tips: ["Use uma leve flexão nos cotovelos.", "Eleve até a linha dos ombros.", "Desça controlando, sem embalar o corpo."] },
    { id: "facepull", name: "Face pull", detail: "Deltoide posterior", target: "rear-shoulders", targetLabel: "deltoides posteriores", sets: 3, tips: ["Posicione a corda na altura do rosto.", "Puxe separando as pontas da corda.", "Mantenha os cotovelos altos e controle a volta."] },
    { id: "arnold-press", name: "Desenvolvimento Arnold", detail: "Deltoides • Tríceps", target: "shoulders", targetLabel: "ombros", sets: 3, optional: true, tips: ["Comece com as palmas voltadas para você.", "Gire os braços enquanto empurra os halteres.", "Retorne pelo mesmo caminho com controle."] },
    { id: "elevacao-frontal", name: "Elevação frontal", detail: "Deltoide anterior", target: "shoulders", targetLabel: "deltoides anteriores", sets: 3, optional: true, tips: ["Mantenha uma leve flexão nos cotovelos.", "Eleve os halteres até a linha dos ombros.", "Desça sem embalar o tronco."] },
    { id: "voador-inverso", name: "Voador inverso", detail: "Deltoide posterior", target: "rear-shoulders", targetLabel: "deltoides posteriores", sets: 3, optional: true, tips: ["Apoie o peito e mantenha o pescoço neutro.", "Abra os braços sem encolher os ombros.", "Retorne lentamente à posição inicial."] }
  ]},
  { id: "biceps", label: "Bíceps", icon: "⌇", code: "Treino E", exercises: [
    { id: "rosca-direta", name: "Rosca direta", detail: "Bíceps", target: "biceps", targetLabel: "bíceps", sets: 3, tips: ["Mantenha os cotovelos perto do tronco.", "Flexione sem projetar os ombros.", "Desça a barra de forma controlada."] },
    { id: "rosca-martelo", name: "Rosca martelo", detail: "Bíceps • Braquial", target: "biceps", targetLabel: "bíceps e braquial", sets: 3, tips: ["Segure os halteres com as palmas para dentro.", "Suba sem afastar os cotovelos.", "Controle toda a descida."] },
    { id: "rosca-scott", name: "Rosca Scott", detail: "Bíceps", target: "biceps", targetLabel: "bíceps", sets: 3, optional: true, tips: ["Apoie totalmente os braços no banco.", "Flexione os cotovelos sem levantar os ombros.", "Desça até quase estender os braços."] },
    { id: "rosca-concentrada", name: "Rosca concentrada", detail: "Bíceps", target: "biceps", targetLabel: "bíceps", sets: 3, optional: true, tips: ["Apoie o cotovelo na parte interna da coxa.", "Suba o halter contraindo o bíceps.", "Desça lentamente sem perder a posição."] },
    { id: "rosca-inclinada", name: "Rosca inclinada", detail: "Bíceps", target: "biceps", targetLabel: "bíceps", sets: 3, optional: true, tips: ["Mantenha as costas apoiadas no banco.", "Flexione sem projetar os cotovelos.", "Controle a descida até alongar o bíceps."] }
  ]},
  { id: "triceps", label: "Tríceps", icon: "⌁", code: "Treino F", exercises: [
    { id: "triceps-polia", name: "Tríceps na polia", detail: "Tríceps", target: "triceps", targetLabel: "tríceps", sets: 3, tips: ["Trave os cotovelos junto ao corpo.", "Estenda os braços até o final.", "Volte sem deixar os ombros avançarem."] },
    { id: "triceps-frances", name: "Tríceps francês", detail: "Tríceps", target: "triceps", targetLabel: "tríceps", sets: 3, tips: ["Mantenha os cotovelos apontados para frente.", "Desça o halter atrás da cabeça.", "Estenda os braços sem arquear a lombar."] },
    { id: "paralelas-triceps", name: "Paralelas para tríceps", detail: "Tríceps • Peitoral", target: "triceps", targetLabel: "tríceps", sets: 3, optional: true, tips: ["Mantenha o tronco mais vertical.", "Desça com os cotovelos apontando para trás.", "Estenda os braços sem perder o controle."] },
    { id: "supino-fechado", name: "Supino fechado", detail: "Tríceps • Peitoral", target: "triceps", targetLabel: "tríceps", sets: 3, optional: true, tips: ["Use uma pegada na largura dos ombros.", "Desça a barra mantendo os cotovelos próximos.", "Empurre concentrando a força nos tríceps."] },
    { id: "triceps-testa", name: "Tríceps testa", detail: "Tríceps", target: "triceps", targetLabel: "tríceps", sets: 3, optional: true, tips: ["Mantenha os braços apontados para cima.", "Flexione apenas os cotovelos.", "Estenda sem deixar os cotovelos abrirem."] }
  ]},
  { id: "core", label: "Core", icon: "◎", code: "Treino G", exercises: [
    { id: "prancha", name: "Prancha", detail: "Core • Estabilidade", target: "core", targetLabel: "core", sets: 3, tips: ["Alinhe ombros, quadril e calcanhares.", "Contraia abdômen e glúteos.", "Respire normalmente sem deixar o quadril cair."] },
    { id: "abdominal-cabo", name: "Abdominal no cabo", detail: "Abdômen", target: "core", targetLabel: "abdômen", sets: 3, tips: ["Mantenha o quadril estável.", "Flexione o tronco aproximando costelas e quadril.", "Retorne devagar sem puxar apenas com os braços."] },
    { id: "elevacao-pernas", name: "Elevação de pernas", detail: "Abdômen inferior", target: "lower-core", targetLabel: "abdômen inferior", sets: 3, tips: ["Mantenha a lombar estável.", "Eleve as pernas com controle.", "Desça sem relaxar totalmente o abdômen."] },
    { id: "bicicleta", name: "Abdominal bicicleta", detail: "Abdômen • Oblíquos", target: "core", targetLabel: "abdômen e oblíquos", sets: 3, optional: true, tips: ["Mantenha a lombar próxima ao chão.", "Aproxime cotovelo e joelho opostos.", "Alterne os lados sem puxar o pescoço."] },
    { id: "russian-twist", name: "Russian twist", detail: "Oblíquos • Core", target: "core", targetLabel: "oblíquos", sets: 3, optional: true, tips: ["Incline o tronco mantendo a coluna neutra.", "Gire as costelas de um lado ao outro.", "Mantenha o abdômen ativo durante todo o movimento."] },
    { id: "decline-crunch", name: "Abdominal declinado", detail: "Abdômen", target: "core", targetLabel: "abdômen", sets: 3, optional: true, tips: ["Prenda os pés no banco.", "Flexione o tronco usando o abdômen.", "Desça com controle sem relaxar completamente."] },
    { id: "ab-wheel", name: "Roda abdominal", detail: "Core • Ombros", target: "core", targetLabel: "core", sets: 3, optional: true, tips: ["Contraia abdômen e glúteos.", "Role para frente sem deixar a lombar ceder.", "Puxe a roda de volta mantendo o tronco firme."] }
  ]}
];

const now = new Date();
const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
const storageKey = `rep-workout-${todayKey}`;
const historyKey = "rep-workout-history";
const selectionKey = "rep-exercise-selections-v1";
let state = JSON.parse(localStorage.getItem(storageKey) || "{}") || {};
let exerciseSelections = JSON.parse(localStorage.getItem(selectionKey) || "{}") || {};
let activeMuscle = localStorage.getItem("rep-active-muscle") || workoutPlan[0].id;
if (activeMuscle === "bracos") activeMuscle = "biceps";
if (!workoutPlan.some(group => group.id === activeMuscle)) activeMuscle = workoutPlan[0].id;
localStorage.setItem("rep-active-muscle", activeMuscle);

const tabsEl = document.querySelector("#muscleTabs");
const listEl = document.querySelector("#exerciseList");
const titleEl = document.querySelector("#workoutTitle");
const kickerEl = document.querySelector("#workoutKicker");
const countEl = document.querySelector("#exerciseCount");
const setCountEl = document.querySelector("#setCount");
const progressEl = document.querySelector("#progressRing");
const progressValueEl = document.querySelector("#progressValue");
const overviewCopyEl = document.querySelector("#overviewCopy");
const toastEl = document.querySelector("#toast");
let toastTimer;

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function getSet(exerciseId, index) {
  return state[exerciseId]?.[index] || { weight: "", reps: "", done: false };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  updateProgress();
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1900);
}

function renderTabs() {
  tabsEl.innerHTML = workoutPlan.map(group => `
    <button class="muscle-tab" type="button" role="tab" aria-selected="${group.id === activeMuscle}" data-muscle="${group.id}">
      <span class="tab-icon" aria-hidden="true">${group.icon}</span><span>${group.label}</span>
    </button>`).join("");
}

function getSelectedExerciseIds(group) {
  const saved = exerciseSelections[group.id];
  const validIds = new Set(group.exercises.map(exercise => exercise.id));
  if (Array.isArray(saved)) return saved.filter(id => validIds.has(id));
  return group.exercises.filter(exercise => !exercise.optional).map(exercise => exercise.id);
}

function getSelectedExercises(group) {
  const selected = new Set(getSelectedExerciseIds(group));
  return group.exercises.filter(exercise => selected.has(exercise.id));
}

function renderWorkout() {
  const group = workoutPlan.find(item => item.id === activeMuscle) || workoutPlan[0];
  const selectedExercises = getSelectedExercises(group);
  titleEl.textContent = group.label;
  kickerEl.textContent = group.code.toUpperCase();
  countEl.textContent = `${selectedExercises.length} ${selectedExercises.length === 1 ? "exercício" : "exercícios"}`;
  const totalSets = selectedExercises.reduce((sum, exercise) => sum + (state[exercise.id]?.length || exercise.sets), 0);
  setCountEl.textContent = `${totalSets} séries`;
  if (!selectedExercises.length) {
    listEl.innerHTML = `<div class="empty-workout"><span aria-hidden="true">＋</span><h3>Nenhum exercício selecionado</h3><p>Escolha o que você quer treinar hoje.</p><button class="primary-button" type="button" data-open-picker>Escolher exercícios</button></div>`;
    updateProgress();
    return;
  }
  listEl.innerHTML = selectedExercises.map((exercise, exerciseIndex) => {
    const currentSets = Math.max(exercise.sets, state[exercise.id]?.length || 0);
    const rows = Array.from({ length: currentSets }, (_, index) => {
      const set = getSet(exercise.id, index);
      return `<div class="set-row" data-set="${index}">
        <span class="set-index">${index + 1}</span>
        <label class="input-wrap"><input inputmode="decimal" type="number" min="0" step="0.5" value="${escapeHtml(set.weight)}" aria-label="Peso da série ${index + 1}" data-field="weight"><span>kg</span></label>
        <label class="input-wrap"><input inputmode="numeric" type="number" min="0" step="1" value="${escapeHtml(set.reps)}" aria-label="Repetições da série ${index + 1}" data-field="reps"><span>reps</span></label>
        <button class="check-set ${set.done ? "done" : ""}" type="button" aria-label="${set.done ? "Desmarcar" : "Concluir"} série ${index + 1}" aria-pressed="${set.done}"></button>
      </div>`;
    }).join("");
    return `<article class="exercise-card ${exerciseIndex === 0 ? "open" : ""}" data-exercise="${exercise.id}">
      <div class="exercise-head">
        <div class="exercise-number">${String(exerciseIndex + 1).padStart(2, "0")}</div>
        <div class="exercise-info">
          <div><h3 class="exercise-name">${exercise.name}</h3><p class="exercise-detail">${exercise.detail}</p></div>
          <button class="muscle-map target-${exercise.target}" type="button" data-motion="${exercise.id}" aria-label="Abrir animação de ${exercise.name}. Foco principal: ${exercise.targetLabel}" title="Ver movimento e músculos trabalhados">
            <img src="./body-map.png" alt=""><span aria-hidden="true"></span><span aria-hidden="true"></span>
            <i aria-hidden="true">▶</i>
          </button>
        </div>
        <button class="expand-button" type="button" aria-label="Abrir ${exercise.name}" aria-expanded="${exerciseIndex === 0}">+</button>
      </div>
      <div class="exercise-body">
        <div class="table-head"><span>SÉRIE</span><span>PESO</span><span>REPS</span><span>OK</span></div>
        <div class="set-list">${rows}</div>
        <div class="exercise-actions">
          <button class="motion-button" type="button" data-motion="${exercise.id}"><span aria-hidden="true">▶</span> Ver movimento</button>
          <button class="add-set" type="button">+ adicionar série</button>
        </div>
      </div>
    </article>`;
  }).join("");
  updateProgress();
}

function updateProgress() {
  const currentGroup = workoutPlan.find(group => group.id === activeMuscle) || workoutPlan[0];
  const currentExercises = getSelectedExercises(currentGroup);
  const total = currentExercises.reduce((sum, exercise) => sum + Math.max(exercise.sets, state[exercise.id]?.length || 0), 0);
  const done = currentExercises.reduce((sum, exercise) => sum + (state[exercise.id] || []).filter(set => set?.done).length, 0);
  const percent = total ? Math.round((done / total) * 100) : 0;
  progressEl.style.setProperty("--progress", `${percent * 3.6}deg`);
  progressEl.setAttribute("aria-label", `${percent}% do treino concluído`);
  progressValueEl.textContent = `${percent}%`;
  overviewCopyEl.textContent = done ? `${done} de ${total} séries concluídas hoje. Continue assim.` : "Escolha um grupo muscular e comece sua sessão.";
}

function updateHistory() {
  const done = Object.values(state).flat().filter(set => set?.done).length;
  if (!done) return;
  const history = JSON.parse(localStorage.getItem(historyKey) || "[]");
  const existing = history.find(item => item.date === todayKey);
  if (existing) existing.sets = done;
  else history.unshift({ date: todayKey, sets: done });
  localStorage.setItem(historyKey, JSON.stringify(history.slice(0, 14)));
}

function findExercise(id) {
  return workoutPlan.flatMap(group => group.exercises).find(exercise => exercise.id === id);
}

function updatePickerCount() {
  const count = document.querySelectorAll('#exercisePickerList input[type="checkbox"]:checked').length;
  document.querySelector("#pickerCount").textContent = `${count} ${count === 1 ? "selecionado" : "selecionados"}`;
}

function openExercisePicker() {
  const group = workoutPlan.find(item => item.id === activeMuscle) || workoutPlan[0];
  const selected = new Set(getSelectedExerciseIds(group));
  document.querySelector("#pickerTitle").textContent = `Exercícios de ${group.label}`;
  document.querySelector("#exercisePickerList").innerHTML = group.exercises.map(exercise => `
    <label class="picker-card">
      <input type="checkbox" value="${exercise.id}" ${selected.has(exercise.id) ? "checked" : ""}>
      <img src="./exercises/${exercise.id}-0.jpg" alt="">
      <span><strong>${exercise.name}</strong><small>${exercise.detail}</small></span>
      <i aria-hidden="true">✓</i>
    </label>`).join("");
  updatePickerCount();
  document.querySelector("#exercisePickerDialog").showModal();
}

tabsEl.addEventListener("click", event => {
  const tab = event.target.closest("[data-muscle]");
  if (!tab) return;
  activeMuscle = tab.dataset.muscle;
  localStorage.setItem("rep-active-muscle", activeMuscle);
  renderTabs();
  renderWorkout();
});

listEl.addEventListener("click", event => {
  if (event.target.closest("[data-open-picker]")) {
    openExercisePicker();
    return;
  }
  const card = event.target.closest(".exercise-card");
  if (!card) return;
  const motionButton = event.target.closest("[data-motion]");
  if (motionButton) {
    openMotion(motionButton.dataset.motion);
    return;
  }
  if (event.target.closest(".exercise-head")) {
    card.classList.toggle("open");
    card.querySelector(".expand-button").setAttribute("aria-expanded", card.classList.contains("open"));
    return;
  }
  const row = event.target.closest(".set-row");
  if (event.target.closest(".check-set") && row) {
    const index = Number(row.dataset.set);
    state[card.dataset.exercise] ||= [];
    state[card.dataset.exercise][index] ||= { weight: "", reps: "", done: false };
    state[card.dataset.exercise][index].done = !state[card.dataset.exercise][index].done;
    event.target.classList.toggle("done", state[card.dataset.exercise][index].done);
    event.target.setAttribute("aria-pressed", state[card.dataset.exercise][index].done);
    saveState();
    updateHistory();
    if (state[card.dataset.exercise][index].done) showToast("Série concluída — boa!");
    return;
  }
  if (event.target.closest(".add-set")) {
    const exercise = findExercise(card.dataset.exercise);
    state[exercise.id] ||= Array.from({ length: exercise.sets }, () => ({ weight: "", reps: "", done: false }));
    state[exercise.id].push({ weight: "", reps: "", done: false });
    saveState();
    renderWorkout();
    document.querySelector(`[data-exercise="${exercise.id}"]`).classList.add("open");
    showToast("Nova série adicionada");
    return;
  }
});

listEl.addEventListener("input", event => {
  const input = event.target.closest("input[data-field]");
  if (!input) return;
  const card = input.closest(".exercise-card");
  const index = Number(input.closest(".set-row").dataset.set);
  state[card.dataset.exercise] ||= [];
  state[card.dataset.exercise][index] ||= { weight: "", reps: "", done: false };
  state[card.dataset.exercise][index][input.dataset.field] = input.value;
  saveState();
});

function openMotion(exerciseId) {
  const exercise = findExercise(exerciseId);
  document.querySelector("#motionTitle").textContent = exercise.name;
  document.querySelector("#motionStage").innerHTML = `
    <div class="exercise-animation" id="exerciseAnimation">
      <div class="frame-stack" role="img" aria-label="Animação demonstrando a posição inicial e final de ${exercise.name}">
        <img class="exercise-frame frame-start" src="./exercises/${exercise.id}-0.jpg" alt="Posição inicial de ${exercise.name}">
        <img class="exercise-frame frame-end" src="./exercises/${exercise.id}-1.jpg" alt="Posição final de ${exercise.name}">
        <span class="motion-badge"><b></b> MOVIMENTO</span>
      </div>
      <div class="focus-panel">
        <div class="muscle-map muscle-map-large target-${exercise.target}" role="img" aria-label="Região destacada: ${exercise.targetLabel}">
          <img src="./body-map.png" alt=""><span aria-hidden="true"></span><span aria-hidden="true"></span>
        </div>
        <div><span>FOCO PRINCIPAL</span><strong>${exercise.targetLabel}</strong><small>${exercise.detail}</small></div>
      </div>
      <button class="animation-toggle" type="button" aria-pressed="false"><span aria-hidden="true">Ⅱ</span> Pausar animação</button>
    </div>`;
  document.querySelector("#motionSteps").innerHTML = exercise.tips.map(tip => `<li>${tip}</li>`).join("");
  document.querySelector("#motionDialog").showModal();
}

document.querySelector("#motionStage").addEventListener("click", event => {
  const toggle = event.target.closest(".animation-toggle");
  if (!toggle) return;
  const animation = toggle.closest(".exercise-animation");
  const paused = animation.classList.toggle("paused");
  toggle.setAttribute("aria-pressed", paused);
  toggle.innerHTML = paused ? '<span aria-hidden="true">▶</span> Continuar animação' : '<span aria-hidden="true">Ⅱ</span> Pausar animação';
});

document.querySelectorAll("[data-close-dialog]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
document.querySelectorAll("dialog").forEach(dialog => dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
}));

document.querySelector("#historyButton").addEventListener("click", () => {
  updateHistory();
  const history = JSON.parse(localStorage.getItem(historyKey) || "[]");
  const formatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });
  document.querySelector("#historyList").innerHTML = history.length
    ? history.map(item => `<div class="history-item"><p><strong>${formatter.format(new Date(`${item.date}T12:00:00`))}</strong><br><span>Sessão registrada</span></p><strong>${item.sets} séries</strong></div>`).join("")
    : `<p class="empty-history">Seu histórico aparecerá aqui depois que você concluir a primeira série.</p>`;
  document.querySelector("#historyDialog").showModal();
});

document.querySelector("#helpButton").addEventListener("click", () => document.querySelector("#helpDialog").showModal());
document.querySelector("#chooseExercises").addEventListener("click", openExercisePicker);
document.querySelector("#exercisePickerList").addEventListener("change", updatePickerCount);
document.querySelector("#pickerAll").addEventListener("click", () => {
  document.querySelectorAll('#exercisePickerList input[type="checkbox"]').forEach(input => { input.checked = true; });
  updatePickerCount();
});
document.querySelector("#pickerClear").addEventListener("click", () => {
  document.querySelectorAll('#exercisePickerList input[type="checkbox"]').forEach(input => { input.checked = false; });
  updatePickerCount();
});
document.querySelector("#saveExerciseSelection").addEventListener("click", () => {
  exerciseSelections[activeMuscle] = [...document.querySelectorAll('#exercisePickerList input[type="checkbox"]:checked')].map(input => input.value);
  localStorage.setItem(selectionKey, JSON.stringify(exerciseSelections));
  document.querySelector("#exercisePickerDialog").close();
  renderWorkout();
  showToast("Seleção de exercícios salva");
});
document.querySelector("#resetDay").addEventListener("click", () => {
  if (!confirm("Limpar todos os pesos, repetições e séries concluídas de hoje?")) return;
  state = {};
  localStorage.removeItem(storageKey);
  const history = JSON.parse(localStorage.getItem(historyKey) || "[]").filter(item => item.date !== todayKey);
  localStorage.setItem(historyKey, JSON.stringify(history));
  renderWorkout();
  showToast("Sessão de hoje limpa");
});

document.querySelector("#dateChip").textContent = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short" }).format(new Date()).replaceAll(".", "").toUpperCase();
renderTabs();
renderWorkout();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
