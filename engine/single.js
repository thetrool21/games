let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let ballRadius = 10;

let ballPositionX = canvas.width / 2;
let ballPositionY =canvas.height - 30;
let dx = 2;
let dy = -2;
        
let paddleHeight = 10;
let paddleWidth = 75;
let paddlePositionX  = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

// control / kendali tatakan paddle
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.code == 'ArrowRight') {
        rightPressed = true;
    } else if (e.code == 'ArrowLeft') {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.code == 'ArrowRight') {
        rightPressed = false;
    } else if (e.code == 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballPositionX, ballPositionY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddlePositionX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (ballPositionX + dx > canvas.width - ballRadius || ballPositionX + dx < ballRadius){
        dx = -dx;
    }
    if (ballPositionY + dy < ballRadius) {
        dy = -dy;
    } else if (ballPositionY + dy > canvas.height - ballRadius) {
        if (ballPositionX > paddlePositionX && ballPositionX < paddlePositionX + paddleWidth) {
            dy = -dy;
                const audioBounceBall = new Audio('sound/bounce_ball.wav');
                audioBounceBall.play();
        } else {
            clearInterval(game);
                const audioGameOver = new Audio('sound/game_over.wav');
            audioGameOver.addEventListener('ended', function () {
                alert('kamu kalah wkwkwk');
                document.location.reload();
            });
                audioGameOver.play();
        }
    }

    if (rightPressed && paddlePositionX < canvas.width - paddleWidth) {
        paddlePositionX += 5;
    } else if (leftPressed && paddlePositionX > 0) {
        paddlePositionX -= 5;
    }

    ballPositionX += dx;
    ballPositionY += dy
}

let game = setInterval(draw, 5);