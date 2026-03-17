// ไฟล์นี้จำเป็นสำหรับการให้ Browser (เช่น Chrome, Edge, Safari) มองว่าเว็บเราเป็น PWA
self.addEventListener('fetch', function(event) {
    // โค้ดพื้นฐานสำหรับให้ผ่านเกณฑ์การทำ PWA
    event.respondWith(
        fetch(event.request).catch(function() {
            return new Response('You are offline.');
        })
    );
});
