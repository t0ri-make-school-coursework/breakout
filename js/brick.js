import * from './script.js'

export class Brick {
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
