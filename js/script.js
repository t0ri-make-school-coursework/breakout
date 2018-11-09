/********************************
        CANVAS VARIABLES
********************************/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/********************************
            CLASSES
********************************/
class Background {
    constructor(color1 = "#fff", color2 = "#f0efef") {
        this.grd = ctx.createLinearGradient(0, 0, 0, 400);
        this.color1 = color1;
        this.color2 = color2
    };

    render() {
        this.grd.addColorStop(1, this.color1);
        this.grd.addColorStop(0, this.color2);
        ctx.fillStyle = this.grd;
        ctx.fillRect(0, 0, 1200, 800);
    };

    rainbows() {
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.rect((canvas.width / 10 * i), 0, (canvas.width / 10), canvas.height);
            ctx.fillStyle = 'hsl(' + (360 / 10) * i + ', 100%, 50%)';
            ctx.fill();
            ctx.closePath();
        }

        for (let i = 0; i < 10; i++) {
            const steps = 12;

            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height, 225 - 25 * i, 1 * Math.PI, 0);
            ctx.fillStyle = 'hsl(' + 360 / steps * i + ', 100%, 50%)';
            ctx.fill();
            ctx.closePath();
        }

            // RAINBOW w/ Better handpicked Colors
            // const steps = 12;
            // ctx.beginPath();
            // ctx.arc(canvas.width/2, canvas.height, 200, 1*Math.PI, 0);
            // ctx.fillStyle = 'hsl('+ 360 / steps * 0 + ', 100%, 50%)';
            // ctx.fill();
            // ctx.closePath();
            //
            // ctx.beginPath();
            // ctx.arc(canvas.width/2, canvas.height, 175, 1*Math.PI, 0);
            // ctx.fillStyle = 'hsl('+ 360 / steps * 1 + ', 100%, 50%)';
            // ctx.fill();
            // ctx.closePath();
            //
            // ctx.beginPath();
            // ctx.arc(canvas.width/2, canvas.height, 150, 1*Math.PI, 0);
            // ctx.fillStyle = 'hsl('+ 360 / steps * 2 + ', 100%, 50%)';
            // ctx.fill();
            // ctx.closePath();
            //
            // ctx.beginPath();
            // ctx.arc(canvas.width/2, canvas.height, 125, 1*Math.PI, 0);
            // ctx.fillStyle = 'hsl('+ 360 / steps * 4 + ', 100%, 50%)';
            // ctx.fill();
            // ctx.closePath();
            //
            // ctx.beginPath();
            // ctx.arc(canvas.width/2, canvas.height, 100, 1*Math.PI, 0);
            // ctx.fillStyle = 'hsl('+ 360 / steps * 7 + ', 100%, 50%)';
            // ctx.fill();
            // ctx.closePath();
            //
            // ctx.beginPath();
            // ctx.arc(canvas.width/2, canvas.height, 75, 1*Math.PI, 0);
            // ctx.fillStyle = 'hsl('+ 360 / steps * 9.5 + ', 100%, 50%)';
            // ctx.fill();
            // ctx.closePath();

            /* TARGET
            // outer circle
            ctx.beginPath();
            ctx.arc(canvas.width/2, canvas.height/2, 200, 0, 2*Math.PI);
            ctx.fillStyle = "#ff0000";
            ctx.fill();
            ctx.closePath();

            // middle circle
            ctx.beginPath();
            ctx.arc(canvas.width/2, canvas.height/2, 140, 0, 2*Math.PI);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.closePath();

            // inner circle
            ctx.beginPath();
            ctx.arc(canvas.width/2, canvas.height/2, 80, 0, 2*Math.PI);
            ctx.fillStyle = "#ff0000";
            ctx.fill();
            ctx.closePath();
            */
    }

};

class Ball {
    constructor(xPos = canvas.width/2, yPos = canvas.height-30, radius = 15, color = "#fff", stroke = "#857c7a") {
        this.xPos = xPos;
        this.yPos = yPos;

        this.radius = radius;
        this.color = color;
        this.stroke = stroke;

        // Movement
        this.xDir = 2;
        this.yDir = -2;
    }

    render() {
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.stroke;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        // Movement
        this.xPos += this.xDir;
        this.yPos += this.yDir;
    }

    bounce() {
        if (this.xPos + this.xDir > canvas.width - this.radius || this.xPos + this.xDir < this.radius) {
            this.xDir = -this.xDir
        }

        if (this.yPos + this.yDir < this.radius) {
            this.yDir = -this.yDir
        } else if (this.yPos + this.yDir > canvas.height - this.radius) {
            if (this.xPos > paddle.xPos && this.xPos < paddle.xPos + paddle.width) {
                this.yDir = -this.yDir
            } else {
                breakout.livesManager();
            }
        }
    }
};

class Paddle {
    constructor(height = 10, width = 200, color = "#857c7a") {
        this.height = height;
        this.width = width;

        this.xPos = (canvas.width - this.width) / 2;

        this.color = color;
    }

    render() {
        ctx.beginPath();
        ctx.rect(this.xPos, canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    movement() {
        if (breakout.rightPressed && this.xPos < canvas.width - this.width) {
            this.xPos += 7;
        } else if (breakout.leftPressed && this.xPos > 0) {
            this.xPos -= 7;
        }
    }
}

class Game {
    constructor() {
        this.rightPressed = false;
        this.leftPressed = false;

        this.brickColumnCount = 15;      // 15
        this.brickRowCount = 5;         // 5

        this.score = 0;
        this.scoreX = 8;
        this.scoreY = 20;
        this.scoreColor = "#9b9797";
        this.scoreFont = "16px Arial";

        this.lives = 3;
    }

    keyDownHandler(e) {
        if (e.keyCode == 39) {
            this.rightPressed = true;
            console.log(e.keyCode, this.rightPressed);
        } else if (e.keyCode == 37) {
            this.leftPressed = true;
            console.log(e.keyCode, this.leftPressed);
        }
    }

    keyUpHandler(e) {
        if (e.keyCode == 39) {
            this.rightPressed = false;
        } else if (e.keyCode == 37) {
            this.leftPressed = false;
        }
    }

    mouseMoveHandler(e) {
        let relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddle.xPos = relativeX - paddle.width / 2;
        }
    }

    livesManager() {
        this.lives--;
        if (!this.lives) {
            breakout.endGame("l");
        } else {
            ball.xPos = canvas.width / 2;
            ball.yPos = canvas.height - 30;
            ball.xDir = 2;
            ball.yDir = -2;
            paddle.xPos = (canvas.width - paddle.width) / 2;
        }
    }



    createBricks() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            bricks[c] = []
            for (let r = 0; r < this.brickRowCount; r++) {
                let brick = new Brick(1, c, r);
                bricks[c].push(brick);
            }
        }
    }

    collisionDetection() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                let b = bricks[c][r];
                if (b.status == 1) {
                    if (ball.xPos > b.brickX && ball.xPos < b.brickX + b.width && ball.yPos < b.brickY + b.height) {
                        ball.yDir = -ball.yDir;
                        b.status = 0;
                        this.score++;
                    }
                }
            }
        }
    }

    livesRender() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#9b9797";
        ctx.fillText("Lives: " + this.lives, canvas.width - 65, 20);
    }

    scoreRender() {
        ctx.font = this.scoreFont;
        ctx.fillStyle = this.scoreColor;
        ctx.fillText("Score: " + this.score, this.scoreX, this.scoreY);
    }

    checkScore() {
        if (this.score == this.brickRowCount* this.brickColumnCount) {
            this.endGame("w");
        }
    }

    endGame(condition) {
        if (condition == "w") {
            console.log("YOU WIN");
            document.location.reload();
        } else {
            console.log("GAME OVER");
            document.location.reload();
        }
    }
}

class Brick {
    constructor(status, rLocation, cLocation, height = 40, width = 50, padding = 20, offsetTop = 30) {
        this.status = status;
        this.rLocation = rLocation;
        this.cLocation = cLocation;

        this.height = height;
        this.width = width;
        this.padding = padding;

        this.offsetTop = offsetTop;
        this.offsetLeft = this.getOffsetLeft();


        this.brickX = (this.rLocation * (this.width + this.padding)) + this.offsetLeft
        this.brickY = (this.cLocation * (this.height + this.padding)) + this.offsetTop
        this.color = 'hsl(' + this.rLocation * 25 + ', 100%, 60%)'
    }

    getOffsetLeft() {
        if (this.cLocation % 2 !== 0) {
            return 90
        } else {
            return 60
        }
    };

    render() {
        if (this.status == 1) {
            ctx.beginPath();
            ctx.rect(this.brickX, this.brickY, this.width, this.height);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }
};

/********************************
            RUN GAME
********************************/

const bg = new Background();
let breakout = new Game();
let ball = new Ball();
let paddle = new Paddle();

let bricks = [];
breakout.createBricks();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bg.render();

    for (let c = 0; c < breakout.brickColumnCount; c++) {
        for (let r = 0; r < breakout.brickRowCount; r++) {
            bricks[c][r].render();
        }
    }

    ball.render();
    ball.bounce(breakout);

    paddle.render();
    paddle.movement();

    breakout.livesRender();
    breakout.scoreRender();
    breakout.checkScore()
    breakout.collisionDetection();

    requestAnimationFrame(draw);
}

draw();

/********************************
        EVENT LISTENERS
********************************/
document.addEventListener('keydown', (e) => {
    breakout.keyDownHandler(e);
}, false);

document.addEventListener('keyup', (e) => {
    breakout.keyUpHandler(e);
}, false);

document.addEventListener('mousemove', (e) => {
    breakout.mouseMoveHandler(e);
}, false);
