const CACHE = "rep-treino-v4";
const EXERCISE_IDS = [
  "supino-reto", "supino-inclinado", "crucifixo", "crossover", "dips-peito", "flexao", "supino-declinado",
  "puxada", "remada", "serrote", "pulldown", "barra-fixa", "remada-t", "hiperextensao",
  "agachamento", "legpress", "extensora", "flexora", "panturrilha", "stiff", "afundo", "elevacao-pelvica", "panturrilha-sentado",
  "desenvolvimento", "elevacao-lateral", "facepull", "arnold-press", "elevacao-frontal", "voador-inverso",
  "rosca-direta", "rosca-martelo", "rosca-scott", "rosca-concentrada", "rosca-inclinada",
  "triceps-polia", "triceps-frances", "paralelas-triceps", "supino-fechado", "triceps-testa",
  "prancha", "abdominal-cabo", "elevacao-pernas", "bicicleta", "russian-twist", "decline-crunch", "ab-wheel"
];
const ASSETS = [
  "./", "./index.html", "./styles.css", "./app.js", "./manifest.webmanifest", "./icon.svg", "./body-map.png",
  ...EXERCISE_IDS.flatMap(id => [`./exercises/${id}-0.jpg`, `./exercises/${id}-1.jpg`])
];

self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => event.respondWith(fetch(event.request).then(response => {
  const copy = response.clone();
  caches.open(CACHE).then(cache => cache.put(event.request, copy));
  return response;
}).catch(() => caches.match(event.request))));
