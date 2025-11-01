const configColorPaddleTop = "#0095DD";
const configColorBall = '#ce0e00';
const audioGameOversource = '../sound/game_over.wav';
const alertGameOver = "GAME OVER AHHAHHAAH";
const gameSpeed = 10;
const paddleTopMovementSpeed = 7;
const paddleBottomMovementSpeed = 7;

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let ballRadius = 10;
let game;

let ballPositionX = canvas.width / 2;
let ballPositionY =canvas.height - 30;
let dx = 2;
let dy = -2;
        
let paddleHeight = 10;
let paddleWidth = 75;
let paddleBottomPositionX  = (canvas.width - paddleWidth) / 2;
let paddleTopPositionX = (canvas.width - paddleWidth) / 2;
let rightTopPressed = false;
let leftTopPressed = false;
let rightBottomPressed = false;
let leftBottomPressed = false;

// control / kendali tatakan paddle
document.addEventListener('keydown', keyDownTopHandler, false);
document.addEventListener('keyup', keyUpTopHandler, false);
document.addEventListener('keydown', keyDownBottomHandler, false);
document.addEventListener('keyup', keyUpBottomHandler, false);

function keyDownTopHandler(e) {
    if (e.key == 'd') {
        rightTopPressed = true;
    } else if (e.key == 'a') {
        leftTopPressed = true;
    }
}
function keyUpTopHandler(e) {
    if (e.key == 'd') {
        rightTopPressed = false;
    } else if (e.key == 'a') {
        leftTopPressed = false;
    }
}

function keyDownBottomHandler(e) {
    if (e.code == 'ArrowRight') {
        rightBottomPressed = true;
    } else if (e.code == 'ArrowLeft') {
        leftBottomPressed = true;
    }
}
function keyUpBottomHandler(e) {
    if (e.code == 'ArrowRight') {
        rightBottomPressed = false;
    } else if (e.code == 'ArrowLeft') {
        leftBottomPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballPositionX, ballPositionY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = configColorBall;
    ctx.fill();
    ctx.closePath();
}
function drawPaddleBottom() {
    ctx.beginPath();
    ctx.rect(paddleBottomPositionX, 0, paddleWidth, paddleHeight);
    ctx.fillStyle = configColorPaddleTop;
    ctx.fill();
    ctx.closePath();
}
function drawPaddleTop() {
    ctx.beginPath();
    ctx.rect(paddleTopPositionX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = configColorPaddleTop;
    ctx.fill();
    ctx.closePath();
}

function gameOver() {
    clearInterval(game);
    const audioGameOver = new Audio(audioGameOversource);
    audioGameOver.addEventListener('ended', function () {
    alert(alertGameOver)
    document.location.reload();
})
    audioGameOver.play();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddleBottom();
    drawPaddleTop();

    const isBallPositionTouchToTop = ballPositionY + dy < ballRadius;
    const isBallPositionTouchToDown = ballPositionY + dy > canvas.height - ballRadius;
    const isBallTouchPaddle =
        (ballPositionX > paddleBottomPositionX && ballPositionX < paddleBottomPositionX + paddleWidth) ||
        (ballPositionX > paddleTopPositionX && ballPositionX < paddleTopPositionX + paddleWidth);

    if (ballPositionX + dx > canvas.width - ballRadius || ballPositionX + dx < ballRadius){
        dx = -dx;
    }
    // player top ball position
    if (isBallPositionTouchToTop) {
        if (isBallTouchPaddle) {
            dy = -dy;
        } else {
            console.log('Player bottom menang');
            gameOver();
        }
        //player bottom ball position
    } else if (isBallPositionTouchToDown) {
        if (isBallTouchPaddle) {
            dy = -dy;
        } else {
            console.log('Player Top menang');
            gameOver();
        }
    }
    if (rightTopPressed && paddleTopPositionX < canvas.width - paddleWidth) {
        paddleTopPositionX += paddleTopMovementSpeed;
    } else if (leftTopPressed && paddleTopPositionX > 0) {
        paddleTopPositionX -= paddleTopMovementSpeed;
    }
    if (rightBottomPressed && paddleBottomPositionX < canvas.width - paddleWidth) {
        paddleBottomPositionX += paddleBottomMovementSpeed;
    } else if (leftBottomPressed && paddleBottomPositionX > 0) {
        paddleBottomPositionX -= paddleBottomMovementSpeed;
    }

    ballPositionX += dx;
    ballPositionY += dy
}

function startGame() {
    game = setInterval(draw, gameSpeed)
}