/*
 * A lista de exercícios vem do catálogo, não de uma cópia mantida à mão:
 * adicionar exercício não pode exigir lembrar de editar este arquivo.
 */
importScripts("./exercises.js");

const CACHE = "rep-treino-v5";

/* O shell precisa estar no cache para o app abrir offline. */
const SHELL = [
  "./", "./index.html", "./styles.css",
  "./exercises.js", "./storage.js", "./app.js",
  "./manifest.webmanifest", "./icon.svg", "./body-map.png"
];

const EXERCISE_IMAGES = self.REP_EXERCISE_IDS.flatMap(id => [
  `./exercises/${id}-0.jpg`,
  `./exercises/${id}-1.jpg`
]);

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // O shell é obrigatório. As ~90 imagens (5,8 MB) entram uma a uma e sem
    // travar a instalação: com addAll, uma única falha de rede derrubava o
    // service worker inteiro e o app ficava sem offline nenhum.
    await cache.addAll(SHELL);
    await Promise.allSettled(EXERCISE_IMAGES.map(url => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

/*
 * Cache-first. O app é estático e a academia costuma ser o pior sinal do dia:
 * esperar a rede antes de servir o que já está em disco era o padrão errado.
 * A revalidação acontece em segundo plano, então a próxima abertura já pega
 * a versão nova.
 */
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // `no-cache` força a revalidação com o servidor: sem isso o HTTP cache do
  // browser devolve a cópia velha e o arquivo novo nunca chega ao SW.
  const network = fetch(request, { cache: "no-cache" }).then(async response => {
    if (response && response.ok) {
      const cache = await caches.open(CACHE);
      await cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);

  // Mantém o service worker vivo até a revalidação terminar. Sem isso o
  // browser encerra o worker assim que respondemos do cache, e a atualização
  // em segundo plano é abortada — o app ficaria preso na versão antiga.
  event.waitUntil(network);

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await network;
    if (response) return response;
    // Navegação sem rede e sem cache da rota: cai no shell.
    return (await caches.match("./index.html")) || Response.error();
  })());
});
