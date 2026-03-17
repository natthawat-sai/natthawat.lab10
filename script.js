// --- Part 3: Local Storage ---
function saveName() {
    let name = document.getElementById("username").value;
    localStorage.setItem("username", name);
    showName();
}

function showName() {
    let name = localStorage.getItem("username");
    if (name) {
        document.getElementById("result").innerHTML = "Welcome back, " + name;
    } else {
        document.getElementById("result").innerHTML = "";
    }
}

function clearName() {
    localStorage.removeItem("username");
    document.getElementById("result").innerHTML = "";
}

// เรียกใช้ฟังก์ชันทันทีที่โหลดหน้าเว็บเพื่อให้แสดงชื่อที่เคยบันทึกไว้
showName(); 


// --- Part 4: Session Storage ---
let count = sessionStorage.getItem("visit"); 

if (count == null) {
    count = 1; 
} else {
    count++;
}

sessionStorage.setItem("visit", count);

document.getElementById("visitCount").innerHTML = "Visited this tab " + count + " times";


// --- ส่วนสำหรับการติดตั้ง PWA ---
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installApp').style.display = 'block';
});

document.getElementById('installApp').addEventListener('click', (e) => {
    document.getElementById('installApp').style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    });
});
