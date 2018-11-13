import * from './script.js'


export class Background {
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
