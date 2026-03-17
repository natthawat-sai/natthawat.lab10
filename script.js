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
    }
}

function clearName() {
    localStorage.removeItem("username"); // แก้คำผิดจาก removeltem เป็น removeItem
    document.getElementById("result").innerHTML = "";
}

// เรียกใช้ฟังก์ชันทันทีที่โหลดหน้าเว็บเพื่อให้แสดงชื่อที่เคยบันทึกไว้
showName(); 


// --- Part 4: Session Storage ---
let count = sessionStorage.getItem("visit"); // แก้คำผิดจาก session Storage เป็น sessionStorage

if (count == null) {
    count = 1; 
} else {
    count++;
}

sessionStorage.setItem("visit", count);

document.getElementById("visitCount").innerHTML = "You visited this page " + count + " times in this tab";
