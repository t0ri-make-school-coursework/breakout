import * from './script.js'

export class Paddle {
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
