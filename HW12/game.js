const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 50, size: 30, speed: 5 };
let obstacles = [];
let collectibles = [];
let score = 0;

// Classes for objects
class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Collectible {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.collected = false;
    }
    draw() {
        if (!this.collected) {
            ctx.fillStyle = "grey";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Load Obstacles from JSON & create objects
fetch("json/obstacles.json")
    .then(response => response.json())
    .then(data => {
        obstacles = data.map(obj => new Obstacle(obj.x, obj.y, obj.width, obj.height));
    });

// Load Collectibles from JSON & create objects
fetch("json/collectibles.json")
    .then(response => response.json())
    .then(data => {
        collectibles = data.map(obj => new Collectible(obj.x, obj.y, obj.size));
    });

// Handle Player Movement
let keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// Check Collision with Obstacles
function isColliding(x, y) {
    return obstacles.some(obs =>
        x < obs.x + obs.width &&
        x + player.size > obs.x &&
        y < obs.y + obs.height &&
        y + player.size > obs.y
    );
}

// Check Collision with Collectibles
function collectItem() {
    collectibles.forEach(item => {
        if (!item.collected &&
            player.x < item.x + item.size &&
            player.x + player.size > item.x &&
            player.y < item.y + item.size &&
            player.y + player.size > item.y) {
            item.collected = true;
            score += 10;
        }
    });
}

// Update Game Logic
function update() {
    let newX = player.x;
    let newY = player.y;

    if (keys["ArrowUp"]) newY -= player.speed;
    if (keys["ArrowDown"]) newY += player.speed;
    if (keys["ArrowLeft"]) newX -= player.speed;
    if (keys["ArrowRight"]) newX += player.speed;

    if (!isColliding(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }

    collectItem();
}

// Draw Everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Draw Obstacles
    obstacles.forEach(obstacle => obstacle.draw());

    // Draw Collectibles
    collectibles.forEach(collectible => collectible.draw());

    // Draw Score
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
