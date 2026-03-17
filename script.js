// --- ส่วนควบคุมการติดตั้ง PWA (Install Button) ---
let deferredPrompt;
const installBtn = document.getElementById('installApp');

// ลงทะเบียน Service Worker เพื่อให้ Browser ยอมรับว่าเป็น PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker Registered!', reg))
            .catch(err => console.error('Service Worker Registration Failed', err));
    });
}

// ดักจับ Event ก่อนที่จะติดตั้ง
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // ป้องกันไม่ให้ Browser แสดงหน้าต่างติดตั้งแบบอัตโนมัติ
    deferredPrompt = e; // เก็บ Event ไว้ใช้ตอนกดปุ่ม
    installBtn.style.display = 'block'; // แสดงปุ่ม Install
});

// เมื่อผู้ใช้กดปุ่ม Install
installBtn.addEventListener('click', async () => {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt(); // แสดงหน้าต่างยืนยันการติดตั้ง
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
        installBtn.style.display = 'none'; // ซ่อนปุ่มหลังดำเนินการเสร็จ
    }
});

// ดักจับ Event เมื่อติดตั้งเสร็จสมบูรณ์
window.addEventListener('appinstalled', () => {
    installBtn.style.display = 'none';
    console.log('PWA installed successfully!');
});


// --- Part 3: Local Storage ---
function saveName() {
    let name = document.getElementById("username").value;
    if(name.trim() !== "") { // เช็คว่าไม่ได้พิมพ์แค่ช่องว่าง
        localStorage.setItem("username", name);
        showName();
        document.getElementById("username").value = ""; // ล้างช่อง input
    }
}

function showName() {
    let name = localStorage.getItem("username");
    if (name) {
        document.getElementById("result").innerHTML = "Welcome back, " + name + " 👋";
    }
}

function clearName() {
    localStorage.removeItem("username");
    document.getElementById("result").innerHTML = "";
    document.getElementById("username").value = "";
}

// เรียกใช้งานทันทีเมื่อโหลดหน้า
showName(); 


// --- Part 4: Session Storage ---
let count = sessionStorage.getItem("visit"); 

if (count == null) {
    count = 1; 
} else {
    count++;
}

sessionStorage.setItem("visit", count);

document.getElementById("visitCount").innerHTML = "Visited this tab: " + count + " times";
