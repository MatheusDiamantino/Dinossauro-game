let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dino/img;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
}

//cactus
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1/img;
let cactus2/img;
let cactus3/img;

let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    // context.fillStyle = "green";
    // context.fillRect(dino.x, dino.y, dino.width, dino.height)

    dino/img = new Image();
    dino/img.src = "//img/dino.png";
    dino/img.onload = function () {
        context.drawImage(dino/img, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1/img = new Image();
    cactus1/img.src = "/img/cactus1.png";

    cactus2/img = new Image();
    cactus2/img.src = "/img/cactus2.png";

    cactus3/img = new Image();
    cactus3/img.src = "/img/cactus3.png";

    requestAnimationFrame(update);
    setInterval(placeCactus, 1000);
    document.addEventListener("keydown", moveDino);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);
    context.drawImage(dino/img, dino.x, dino.y, dino.width, dino.height);

    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];


        cactus.x += velocityX;
        context.drawImage(cactus./img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision (dino, cactus)){
            gameOver = true;
            dino/img.src = "/img/dino-dead.png";
            dino/img.onload = function(){
                context.drawImage(dino/img, dino.x, dino.y, dino.width, dino.height);
            }
        }
    }

    context.fillStyle="black";
    context.font="20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function moveDino(e) {
    if (gameOver) {
        return;
    }
    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
        velocityY = -10;

    }

    else if (e.code == "ArrowDown" && dino.y == dinoY){
        
    }
}

function placeCactus() {
    if (gameOver) {
        return;
    }
    let cactus = {
        /img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    }

    let placeCactusChance = Math.random();

    if (placeCactusChance > .90) {
        cactus./img = cactus3/img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .70) {
        cactus./img = cactus2/img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .50) {
        cactus./img = cactus1/img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 5) {
        cactusArray.shift();

    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}
