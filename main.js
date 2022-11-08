import { checkIfSnakeTouchBottomBorder } from "./touchBorderChecker.js";
import { checkIfSnakeTouchLeftBorder } from "./touchBorderChecker.js";
import { checkIfSnakeTouchRightBorder } from "./touchBorderChecker.js";
import { checkIfSnakeTouchTopBorder } from "./touchBorderChecker.js";
import { mouseIsOverRestartButton } from "./utils.js";

var canvas = document.getElementById("canvas");
var canvasContext =  canvas.getContext("2d");
var gameInterval = null;
var gameStatus = "playing"; // can be playing or over
var restartBtnPosition = {x: canvas.width/2 - 50, y: canvas.height/2 + 20};
var restartBtnWidth = 100;
var restartBtnHeight = 50;
var snake, startPX, startPY, boxWidth, boxHeight, snakeBox, snakeBox2;
var food = null;

var snakeMoveDirection // default snake direction is right

function changeSnakeMovingDirection() {} {
    if (gameInterval != null) {
        clearInterval(gameInterval);
        gameInterval = setInterval(() => { moveSnake(snakeMoveDirection) }, 70)
    }
}

function createRandomFoodPosition() {
    let randomX = Math.floor(Math.random() * canvas.width) + 1;
    let randomY = Math.floor(Math.random() * canvas.height) + 1;

    if (randomX + boxWidth >= canvas.width) {
        randomX = randomX - boxWidth;
    }
    else if (randomX - boxWidth <= 0) {
        randomX = randomX + boxHeight
    }

    if (randomY + boxHeight >= canvas.height) {
        randomY = randomY - boxHeight;
    }
    else if (randomY - boxHeight <= 0) {
        randomY = randomY + boxHeight;
    }

    return {x: randomX, y: randomY}
}

window.addEventListener('keyup', (event) => {
    if (event.key == "b") {
        if (gameInterval != null) {
            clearInterval(gameInterval);
            gameInterval = null;
        } 
    }
    else if (event.key == "d") {
        if ((snakeMoveDirection != "left") && (snakeMoveDirection != "right")) {
            snakeMoveDirection = "right";
            changeSnakeMovingDirection();
        }
        
    }
    else if (event.key == "w") {
        if ((snakeMoveDirection != "up") && (snakeMoveDirection != "bottom")) {
            snakeMoveDirection = "up";
            changeSnakeMovingDirection();
        }
    }
    else if (event.key == "s") {
        if ((snakeMoveDirection != "up") && (snakeMoveDirection != "bottom")) {
            snakeMoveDirection = "bottom";
            changeSnakeMovingDirection();
        }
    }
    else if (event.key == "a") {
        if ((snakeMoveDirection != "left") && (snakeMoveDirection != "right")) {
            snakeMoveDirection = "left";
            changeSnakeMovingDirection();
        }
        
    }
})

function initializeGame() {
    document.getElementById("score").innerText = "0";

    snakeMoveDirection = "right";
    snake = [];
    startPX = 100;
    startPY = 100;
    boxWidth = 15;
    boxHeight = 15;

    snakeBox = {
        x: startPX,
        y: startPY,
        width: boxWidth,
        height: boxHeight
    }
    snakeBox2 = {
        x: startPX - snakeBox.width,
        y: startPY,
        width: boxWidth,
        height: boxHeight
    }

    snake.push(snakeBox);
    snake.push(snakeBox2);
    canvasContext.fillStyle = "black";

    for (let i in snake) {
        canvasContext.clearRect(snake[i].x, snake[i].y, snake[i].width, snake[i].height);
    }

    for (let i in snake) {
        canvasContext.fillRect(snake[i].x, snake[i].y, snake[i].width, snake[i].height);
    }

    if (food == null) food = createRandomFoodPosition();
    canvasContext.fillRect(food.x, food.y, boxWidth, boxHeight);
}

function updateGameScore() {
    let score = parseInt(document.getElementById("score").innerText);
    score = score + 10;
    document.getElementById("score").innerText = score.toString();
}

function appendSnakeHead(oldHead) { 
    let newHead = {width: oldHead.width, height: oldHead.height};

    if (snakeMoveDirection == "right") {
        newHead["x"] = oldHead.x + oldHead.width;
        newHead["y"] = oldHead.y;
    }
    else if (snakeMoveDirection == "left") {
        newHead["x"] = oldHead.x - oldHead.width;
        newHead["y"] = oldHead.y;
    }
    else if (snakeMoveDirection == "up") {
        newHead["x"] = oldHead.x;
        newHead["y"] = oldHead.y - oldHead.height;
    }
    else if (snakeMoveDirection == "bottom") {
        newHead["x"] = oldHead.x;
        newHead["y"] = oldHead.y + oldHead.height;
    }

    snake.push(newHead);
}

function gameOver() {
    if (gameInterval != null) {
        clearInterval(gameInterval);
        gameInterval = null;
    }

    for (let i in snake) {
        canvasContext.clearRect(snake[i].x, snake[i].y, snake[i].width, snake[i].height);
    }
    canvasContext.clearRect(food.x, food.y, boxWidth, boxHeight);

    gameStatus = "over";

    canvasContext.font = "50px Comic Sans MS";
    canvasContext.fillStyle = "red";
    canvasContext.textAlign = "center";
    canvasContext.fillText("Game Over", canvas.width/2, canvas.height/2);

    // draw restart game button
    canvasContext.font = "20px Comic Sans MS";
    canvasContext.fillStyle = "white";
    canvasContext.textAlign = "center";
    canvasContext.fillText("Restart", canvas.width/2, canvas.height/2 + 50);
    canvasContext.beginPath();
    canvasContext.rect(restartBtnPosition.x, restartBtnPosition.y, restartBtnWidth, restartBtnHeight);
    canvasContext.stroke();
}

canvas.addEventListener('click', (event) => {
    let isOverRestartButton = mouseIsOverRestartButton(canvas, event, restartBtnPosition, restartBtnWidth, restartBtnHeight);

    if (isOverRestartButton == true) {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        restartGame();
    }

})

function moveSnake(direction) {
    let newSnake = []
    let oldSnake = snake;
    let head;

    for (let i in oldSnake) {
        canvasContext.clearRect(
            oldSnake[i].x, oldSnake[i].y, oldSnake[i].width, oldSnake[i].height
        )
    }
    if (direction == "up") {
        head = {
            x: snake[0].x,
            y: snake[0].y - snake[0].height,
            width: snake[0].width,
            height: snake[0].height
        }
    }
    else if (direction == "right") {
        head = {
            x: snake[0].x + snake[0].width,
            y: snake[0].y,
            width: snake[0].width,
            height: snake[0].height
        }
    }
    else if (direction == "left") {
        head = {
            x: snake[0].x - snake[0].width,
            y: snake[0].y,
            width: snake[0].width,
            height: snake[0].height
        }
    }
    else if (direction == "bottom") {
        head = {
            x: snake[0].x,
            y: snake[0].y + snake[0].height,
            width: snake[0].width,
            height: snake[0].height
        }
    }
    newSnake.push(head);

    oldSnake.pop();
    newSnake = newSnake.concat(oldSnake);
    snake = newSnake;

    for (let i in newSnake) {
        canvasContext.fillRect(
            newSnake[i].x, newSnake[i].y, newSnake[i].width, newSnake[i].height
        )
    }
    if (
        (checkIfSnakeTouchBottomBorder(head, canvas) == true) ||
        (checkIfSnakeTouchRightBorder(head, canvas) == true) ||
        (checkIfSnakeTouchTopBorder(head) == true) ||
        (checkIfSnakeTouchLeftBorder(head) == true)
    ) {
        gameOver();
    }

    // snake eat food
    if (
        ((head.x + boxWidth >= food.x) && (head.y + boxHeight >= food.y)) &&
        ((head.x - boxWidth <= food.x) && (head.y - boxHeight <= food.y))
    ) {
        canvasContext.clearRect(food.x, food.y, boxWidth, boxHeight);
        food = createRandomFoodPosition();
        canvasContext.fillRect(food.x, food.y, boxWidth, boxHeight);   
          
        appendSnakeHead(head);
        updateGameScore(); 
    }

    if (checkIfSnakeTouchItSelf(snake[0]) == true) gameOver();

}

function checkIfSnakeTouchItSelf(head) {
    if (snake.length > 3) {
        for (let i in snake) {
            if (i != 0) {
                if ((head.x == snake[i].x) && (head.y == snake[i].y)) {
                    return true;
                }
            }
            
        }
    } 
    return false;
}

function restartGame() {
    if (gameInterval == null) {
        initializeGame();
        gameInterval = setInterval(() => { moveSnake(snakeMoveDirection) }, 70)
    }
}

restartGame();