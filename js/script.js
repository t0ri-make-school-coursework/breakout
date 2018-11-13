/********************************
            IMPORTS
********************************/
import {Background} from './background.js'
import {Ball} from './ball.js'
import {Brick} from './brick.js'
import {Game} from './game.js'
import {Paddle} from './paddle.js'

/********************************
        CANVAS VARIABLES
********************************/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/********************************
        CREATE OBJECTS
********************************/
const bg = new Background();
let breakout = new Game();
let ball = new Ball();
let paddle = new Paddle();

let bricks = [];
breakout.createBricks();

/********************************
            DRAW
********************************/
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
