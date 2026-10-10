/* ZeitMeister offline app shell. Works on HTTPS or localhost only. */
// Increment this shell key whenever the HTML, CSS, JS, manifest, or icons change.
const CACHE_NAME = "zeitmeister-shell-audit-2026-10-10";
const APP_SHELL = [
  "index.html",
  "css/style.css",
  "js/app.js",
  "manifest.webmanifest",
  "assets/favicon.svg",
  "assets/icon-180.png",
  "assets/icon-192.png",
  "assets/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const requests = APP_SHELL.map((path) => new Request(new URL(path, self.registration.scope), { cache: "reload" }));
    await cache.addAll(requests);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("zeitmeister-shell-") && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    let cache = null;

    // A cache failure must not prevent the app from working online.
    try {
      cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request, { ignoreSearch: true });
      if (cached) return cached;
    } catch (_) {
      cache = null;
    }

    try {
      const response = await fetch(request);
      if (response && response.ok && cache) {
        // Quota/storage failures should not turn a valid network response into an error.
        try {
          await cache.put(request, response.clone());
        } catch (_) {}
      }
      return response;
    } catch (_) {
      if (request.mode === "navigate") {
        try {
          const fallbackCache = cache || await caches.open(CACHE_NAME);
          const offlinePage = await fallbackCache.match(
            new URL("index.html", self.registration.scope).toString()
          );
          if (offlinePage) return offlinePage;
        } catch (_) {}
      }

      return new Response("ZeitMeister is offline and this file is not cached yet.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  })());
});
