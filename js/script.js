/********************************
        CANVAS VARIABLES
********************************/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let rightPressed = false;
let leftPressed = false;

/********************************
            CLASSES
********************************/
class Ball {
    constructor(xPos = canvas.width/2, yPos = canvas.height-30, radius = 10, color = "#fff", stroke = "#857c7a") {
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

        if (this.yPos + this.yDir > canvas.height- this.radius || this.yPos + this.yDir < this.radius) {
            this.yDir = -this.yDir
        } else if (this.yPos + this.yDir > canvas.height - this.radius) {
            breakout.endGame();
        }
    }
};




class Paddle {
    constructor(height = 10, width = 75, color = "#857c7a") {
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

    // doesn't work!
    // movement() {
    //     if (breakout.rightPressed && this.xPos < canvas.width - this.width) {
    //         console.log('WOOOOOOOOOORKED');
    //         this.xPos += 7;
    //     } else if (breakout.leftPressed && this.xPos > 0) {
    //         this.xPos -= 7;
    //     }
    // }

    movement() {
        if (rightPressed && this.xPos < canvas.width - this.width) {
            this.xPos += 7;
        } else if (leftPressed && this.xPos > 0) {
            this.xPos -= 7;
        }
    }
}


class Game {
    constructor() {
        this.rightPressed = false;
        this.leftPressed = false;
    }

    // doesn't work!
    // keyDownHandler(e) {
    //     if (e.keyCode == 39) {
    //         console.log(e.keyCode, this.rightPressed);
    //         this.rightPressed = true;
    //     } else if (e.keyCode == 37) {
    //         console.log(e.keyCode, this.leftPressed);
    //         this.leftPressed = true;
    //     }
    // }
    //
    // keyUpHandler(e) {
    //     if (e.keyCode == 39) {
    //         this.rightPressed = false;
    //     } else if (e.keyCode == 37) {
    //         this.leftPressed = false;
    //     }
    // }

    keyDownHandler(e) {
        if (e.keyCode == 39) {
            // console.log(e.keyCode, rightPressed);
            rightPressed = true;
        } else if (e.keyCode == 37) {
            // console.log(e.keyCode, leftPressed);
            leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        } else if (e.keyCode == 37) {
            leftPressed = false;
        }
    }

    endGame() {
        alert("GAME OVER");
        document.location.reload();
    }
}

/********************************
            RUN GAME
********************************/

let breakout = new Game();
let ball = new Ball();
let paddle = new Paddle();


function logger() {
   console.log(ball.yPos, ball.yDir);
}
setInterval(logger, 5000);


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.render();
    ball.bounce();

    paddle.render();
    paddle.movement();

    if (ball.yPos + ball.yDir > canvas.height - ball.radius) {
        console.log('ugh');
    };

}

setInterval(draw, 10);

/********************************
        EVENT LISTENERS
********************************/
document.addEventListener('keydown', breakout.keyDownHandler, false);
document.addEventListener('keyup', breakout.keyUpHandler, false);
