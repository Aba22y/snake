//map-grid
let blockSize = 25;
let rows = 20;
let cols = 20;
let score = 0;
let highestScore = 0;
var board;
var context;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

//snake head
let snakeX = blockSize * 5
let snakeY = blockSize * 5

let foodX;
let foodY;

lose = false;

window.onload = function () {
    board = document.getElementById("map");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used to draw on the board
    
    let restart = document.getElementById("Restart");

    placeFood();

    document.addEventListener("keyup", changeDirection);
    restart.addEventListener("click", restartGame);

    setInterval(update, 1000/10);
}

function restartGame() {
    snakeBody = [];
    if (score > highestScore) {
        highestScore = score;
        document.getElementById("highscore").innerHTML = score;
    }
    document.getElementById("prescore").innerHTML = score;
    score = 0;
    velocityX = 0;
    velocityY = 0;
    snakeX = blockSize * 5
    snakeY = blockSize * 5
    lose = false;
    placeFood();
}

function update() {
    if (lose) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score++;
        placeFood();
    }

    context.fillStyle="lime";

    snakeX = velocityX * blockSize + snakeX;
    if (snakeX > 500) {
        snakeX = 0
    } else if (snakeX < 0) {
        snakeX = 500
    }

    snakeY = velocityY * blockSize + snakeY;
    if (snakeY > 500) {
        snakeY = 0
    } else if (snakeY < 0) {
        snakeY = 500
    }

    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    for(let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            lose = true;
            alert("Game Over!");
        }
    }
    document.getElementById("score").innerHTML = score;
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY == 0) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY == 0) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX == 0) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX == 0) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}