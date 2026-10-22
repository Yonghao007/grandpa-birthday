
// =====================================
// 1. 生日祝福打字效果
// =====================================

const message = `
亲爱的外公：

🎂 祝您生日快乐！

愿您身体健康，平安喜乐；
愿您笑口常开，幸福常伴；
愿您福如东海，寿比南山！

❤️ 愿往后的每一天，
都有阳光、有欢笑、有幸福。

外公，我们永远爱您！
`;

const messageElement = document.getElementById(
    "birthday-message"
);

let index = 0;

function typeMessage() {

    if (index < message.length) {

        messageElement.textContent += message[index];

        index++;

        setTimeout(typeMessage, 70);

    }

}

typeMessage();


// =====================================
// 2. 点击蜡烛吹灭火焰
// =====================================

const candles = document.querySelectorAll(".candle");

candles.forEach((candle) => {

    candle.addEventListener("click", () => {

        const flame = candle.querySelector(".flame");

        if (flame.style.display !== "none") {

            flame.style.display = "none";

            checkCandles();

        }

    });

});

function checkCandles() {

    const flames = document.querySelectorAll(".flame");

    const allOut = [...flames].every(
        flame => flame.style.display === "none"
    );

    if (allOut) {

        setTimeout(() => {

            alert("🎉 愿外公所有美好的愿望都能实现！");

            launchFireworks();

        }, 500);

    }

}


// =====================================
// 3. 背景音乐
// =====================================

const music = document.getElementById(
    "birthday-music"
);

const musicBtn = document.getElementById(
    "music-btn"
);

musicBtn.addEventListener("click", async () => {

    if (music.paused) {

        try {
            await music.play();

            musicBtn.textContent = "⏸️ 暂停音乐";
        } catch (error) {
            alert("音乐播放失败，请检查 assets/birthday.mp3 文件。");
        }

    } else {

        music.pause();

        musicBtn.textContent = "🎵 播放生日歌";

    }

});


// =====================================
// 4. 烟花动画
// =====================================

const canvas = document.getElementById("fireworks");

const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// 烟花粒子

class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;

        this.color = color;

        this.radius = Math.random() * 3 + 1;

        const angle = Math.random() * Math.PI * 2;

        const speed = Math.random() * 6 + 2;

        this.vx = Math.cos(angle) * speed;

        this.vy = Math.sin(angle) * speed;

        this.life = 100;

    }

    update() {

        this.x += this.vx;

        this.y += this.vy;

        this.vy += 0.05;

        this.life--;

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = this.color;

        ctx.globalAlpha = Math.max(0, this.life / 100);

        ctx.fill();

        ctx.globalAlpha = 1;

    }

}


// 创建烟花

function createFirework(x, y) {

    const colors = [
        "#ff6b81",
        "#ffd166",
        "#06d6a0",
        "#118ab2",
        "#ef476f"
    ];

    for (let i = 0; i < 80; i++) {

        const color = colors[
            Math.floor(Math.random() * colors.length)
        ];

        particles.push(
            new Particle(x, y, color)
        );

    }

}


// 动画循环

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles = particles.filter(
        particle => particle.life > 0
    );

    particles.forEach((particle) => {

        particle.update();

        particle.draw();

    });

    requestAnimationFrame(animate);

}

animate();


// 发射烟花

function launchFireworks() {

    for (let i = 0; i < 6; i++) {

        setTimeout(() => {

            const x = Math.random() * canvas.width;

            const y = Math.random() * canvas.height * 0.6;

            createFirework(x, y);

        }, i * 400);

    }

}


// 烟花按钮

document.getElementById(
    "fireworks-btn"
).addEventListener("click", launchFireworks);


// 页面打开时自动播放一次烟花

window.addEventListener("load", () => {

    setTimeout(launchFireworks, 1000);

});