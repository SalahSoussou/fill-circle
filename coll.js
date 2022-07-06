/**@type {HTMLCanvasElement}*/
const ctx = cnv.getContext("2d");
cnv.width = innerWidth;
cnv.height = innerHeight;

let particles,
    particle2,
    pNumber = 50,
    area = cnv.width * cnv.height;

let mouse = { x: -100, y: -100 };

if (area >= 100000) {
    pNumber = Math.ceil(area / 2000)
}
addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
addEventListener('resize', () => {
    cnv.width = innerWidth;
    cnv.height = innerHeight;
    area = cnv.width * cnv.height;
    if (area >= 100000) {
        pNumber = Math.ceil(area / 2000)
    }
    init()
    console.log(pNumber)
});
addEventListener('click', () => {
    init()
});

function ranRang(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a)
}

function distance(x1, x2, y1, y2) {
    let dX = x2 - x1,
        dY = y2 - y1;
    return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
}

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.direction = {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5
        }
        this.radius = radius;
        this.color = color;
        this.update = () => {
            this.x += this.direction.x;
            this.y += this.direction.y;
            if (this.x - this.radius <= 0 || this.x + this.radius >= cnv.width) {
                this.direction.x = -this.direction.x;
            }
            if (this.y - this.radius <= 0 || this.y + this.radius >= cnv.height) {
                this.direction.y = -this.direction.y;
            }
            this.draw();
        };
        this.draw = () => {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // ctx.fillStyle = this.color;
            ctx.lineWidth = 2
            ctx.strokeStyle = this.color;
            // ctx.fill();
            ctx.stroke();
            ctx.closePath()
        };
    }
};

function init() {
    particles = [];
    for (let i = 0; i < pNumber; i++) {
        let radius = 15,
            x = ranRang(radius, cnv.width - radius),
            y = ranRang(radius, cnv.height - radius),
            color = `hsl(${Math.random() * 360},100%, 50%)`;
        particles.push(new Particle(x, y, radius, color))
    }
}
let heu = 0;

function animate() {
    // ctx.fillStyle = `rgba(255, 255, 255, 0.07)`;
    ctx.fillStyle = `hsl(${heu},30%, 30%)`;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    particles.forEach(particle => {
        particle.update()
        if (distance(particle.x, mouse.x, particle.y, mouse.y) < 100) {
            ctx.fillStyle = particle.color
            ctx.fill();
        }
    });
    heu += 0.5;
    requestAnimationFrame(animate)
}
init();
animate();