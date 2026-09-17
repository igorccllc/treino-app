/*
 * UI do REP.
 *
 * O catálogo de exercícios vive em exercises.js e a persistência em
 * storage.js — os dois são carregados antes deste arquivo pelo index.html.
 * Aqui fica só o que desenha e reage a toque.
 */
const workoutPlan = self.REP_WORKOUT_PLAN;

const selectionKey = "rep-exercise-selections-v1";

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

let todayKey = dateKey(new Date());
let state = RepDB.sessionExercises(todayKey);
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
  return state[exerciseId]?.[index] || RepDB.emptySet();
}

/*
 * Digitar carga dispara um evento por tecla; serializar o banco inteiro a
 * cada um delas é desperdício. Cliques (concluir série, adicionar série)
 * gravam na hora — são as ações que não podem se perder.
 */
let persistTimer;
function saveState(immediate) {
  clearTimeout(persistTimer);
  if (immediate) RepDB.save(todayKey);
  else persistTimer = setTimeout(() => RepDB.save(todayKey), 250);
  updateProgress();
}

function flushState() {
  clearTimeout(persistTimer);
  RepDB.save(todayKey);
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

/*
 * O dia vira enquanto o app está aberto, e o PWA instalado no iOS não
 * recarrega ao voltar do segundo plano — ele restaura a sessão suspensa.
 * Sem este check, treinar de manhã gravaria na sessão da véspera.
 */
function refreshDay() {
  const currentKey = dateKey(new Date());
  if (currentKey === todayKey) return;
  flushState();
  todayKey = currentKey;
  state = RepDB.sessionExercises(todayKey);
  renderDateChip();
  renderWorkout();
  showToast("Novo dia — sessão zerada");
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
    state[card.dataset.exercise][index] ||= RepDB.emptySet();
    state[card.dataset.exercise][index].done = !state[card.dataset.exercise][index].done;
    event.target.classList.toggle("done", state[card.dataset.exercise][index].done);
    event.target.setAttribute("aria-pressed", state[card.dataset.exercise][index].done);
    saveState(true);
    if (state[card.dataset.exercise][index].done) showToast("Série concluída — boa!");
    return;
  }
  if (event.target.closest(".add-set")) {
    const exercise = findExercise(card.dataset.exercise);
    state[exercise.id] ||= Array.from({ length: exercise.sets }, () => RepDB.emptySet());
    state[exercise.id].push(RepDB.emptySet());
    saveState(true);
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
  state[card.dataset.exercise][index] ||= RepDB.emptySet();
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

const dayFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });
const volumeFormatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

function formatSet(set) {
  const weight = String(set.weight).trim();
  const reps = String(set.reps).trim();
  if (weight && reps) return `${weight} kg × ${reps}`;
  if (weight) return `${weight} kg`;
  if (reps) return `${reps} reps`;
  return "concluída";
}

function renderHistoryItem(item) {
  const label = dayFormatter.format(new Date(`${item.date}T12:00:00`)).replaceAll(".", "");
  const volume = item.volume
    ? `${volumeFormatter.format(item.volume)} kg de volume`
    : "sem carga registrada";

  /* Sessões vindas da v1 só guardaram a contagem — não há detalhe a mostrar. */
  const detail = item.detailed
    ? item.exercises.map(entry => {
      const exercise = findExercise(entry.id);
      const series = entry.sets.map(formatSet).join(" · ");
      return `<li><span>${escapeHtml(exercise ? exercise.name : entry.id)}</span><small>${escapeHtml(series)}</small></li>`;
    }).join("")
    : `<li class="history-legacy"><span>Registro antigo</span><small>só a contagem de séries foi preservada</small></li>`;

  return `<details class="history-item">
    <summary>
      <p><strong>${escapeHtml(label)}</strong><br><span>${escapeHtml(volume)}</span></p>
      <strong>${item.doneSets} ${item.doneSets === 1 ? "série" : "séries"}</strong>
    </summary>
    <ul class="history-detail">${detail}</ul>
  </details>`;
}

document.querySelector("#historyButton").addEventListener("click", () => {
  flushState();
  const history = RepDB.history(20);
  document.querySelector("#historyList").innerHTML = history.length
    ? history.map(renderHistoryItem).join("")
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
  clearTimeout(persistTimer);
  RepDB.clearSession(todayKey);
  state = RepDB.sessionExercises(todayKey);
  renderWorkout();
  showToast("Sessão de hoje limpa");
});

function renderDateChip() {
  document.querySelector("#dateChip").textContent = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short" })
    .format(new Date(`${todayKey}T12:00:00`)).replaceAll(".", "").toUpperCase();
}

/* Grava antes de sair de cena e confere a data ao voltar. */
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") refreshDay();
  else flushState();
});
window.addEventListener("pagehide", flushState);

renderDateChip();
renderTabs();
renderWorkout();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
