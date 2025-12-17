let enteredPin = ""; 
const correctPin = "171203";

function pressKey(num) {
    if (enteredPin.length < 6) {
        enteredPin += num;
        document.getElementById('pin-display').value = enteredPin;
    }
}

function clearInput() {
    enteredPin = "";
    document.getElementById('pin-display').value = "";
}

function submitPin() {
    if (enteredPin === correctPin) {
        const music = document.getElementById('bg-music');
        if (music) music.play().catch(() => console.log("Cần tương tác để phát nhạc"));
        showScreen('letter-screen');
    } else {
        alert("Sai mã PIN rồi! Thử lại nhé.");
        clearInput();
    }
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
    
    // Khởi động lại video nếu vào màn hình video
    if (id === 'video-screen') {
        const video = document.getElementById('reward-video');
        if (video) video.load(); 
    }
}

const questions = [
    { q: "Ông già Noel cưỡi con vật gì đi tặng quà?", a: ["Ngựa", "Tuần lộc", "Gấu Bắc Cực"], c: 1 },
    { q: "Đêm Noel chính thức diễn ra vào ngày mấy?", a: ["24/12", "25/12", "26/12"], c: 1 },
    { q: "Tớ là gì của cậu?", a: ["Cây thông", "Người eo", "Gà rán"], c: 1 },
    { q: "Cây gì là biểu tượng của Giáng Sinh?", a: ["Cây Thông", "Cây Đào", "Cây Tre"], c: 0 },
    { q: "Ai là người xinh đẹp nhất trong mắt tớ?", a: ["Người khác", "Một cô gái lạ", "Là Cậu đó!"], c: 2 }
];

let currentQ = 0;

function startQuiz() {
    currentQ = 0;
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQ];
    document.getElementById('question-text').innerText = q.q;
    const progress = (currentQ / questions.length) * 100;
    document.getElementById('progress').style.width = progress + "%";
    const container = document.getElementById('options-container');
    container.innerHTML = ""; 

    q.a.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerText = opt;
        btn.onclick = () => {
            if (i === q.c) {
                currentQ++;
                if (currentQ < questions.length) loadQuestion();
                else showScreen('video-screen');
            } else {
                alert("Sai rồi! Thử lại từ đầu nhé!");
                resetApp();
            }
        };
        container.appendChild(btn);
    });
}

function resetApp() {
    clearInput();
    showScreen('login-screen');
}