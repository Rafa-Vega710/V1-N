// Service Worker de Café 11:11. Para forzar una actualización en los celulares, cambia el número de V (ej. cafe1111-v2)
const V='cafe1111-v2',F=['./','index.html','manifest.json','https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!=V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const c=n.clone();caches.open(V).then(h=>h.put(e.request,c));return n}).catch(()=>caches.match('./'))))});
