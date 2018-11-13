import * from './script.js'

export class Game {
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
