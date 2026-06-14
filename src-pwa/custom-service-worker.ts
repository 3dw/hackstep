/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

declare const self: ServiceWorkerGlobalScope & typeof globalThis;

import { clientsClaim } from 'workbox-core';
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  matchPrecache,
} from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';

self.skipWaiting();
clientsClaim();

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    void self.skipWaiting();
  }
});

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (process.env.MODE !== 'ssr' || process.env.PROD) {
  const navigationHandler = async ({ request }: { request: Request }) => {
    try {
      const response = await fetch(request);

      if (response.ok) {
        return response;
      }
    } catch {
      // Fall back to the cached app shell when the network is unavailable.
    }

    return (
      (await matchPrecache(process.env.PWA_FALLBACK_HTML)) || Response.error()
    );
  };

  registerRoute(
    new NavigationRoute(navigationHandler, {
      denylist: [/sw\.js$/, /workbox-(.)*\.js$/],
    })
  );
}

// Use with precache injection.
precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();
