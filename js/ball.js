import * from './script.js'

export class Ball {
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
