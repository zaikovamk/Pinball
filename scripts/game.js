
import { Ball, rand } from './Ball.js';
import { Borders, Circle, Walls } from './StaticBlocks.js';
import { Points } from './Points.js';
import { Paddles } from './Paddles.js';



// Подключение двумерного движка физики твердого тела
Matter.use('matter-attractors');


// Глобальные переменные и константы
let engine, world, render, runner, startGame;
let circle, wall, borders;
let paddle, pinball, score;


const GRAVITY = 0.75;
const WIREFRAMES = false;
const COLOR = {
    BACKGROUND: '#000120',
};

main();

function main(){

    startGame = false;

    pinball = new Ball(14);
    score = new Points();
    circle = new Circle(25);
    borders = new Borders();
    wall = new Walls();
    paddle = new Paddles();

    function load() {
		init();
        control();
		createStaticBlocks(world);
		pinball.createPinball(world);
        pinball.launchPinball(score);
		events();
	}

    window.addEventListener('load', load(), false);
}


function init() {
    // Движок для визуализации мира
    engine = Matter.Engine.create();

    // Для управления миром
    world = engine.world;
    world.bounds = {
        x: 500, 
        y: 800
    };
    world.gravity.y = GRAVITY; // иммитация движения по наклонному столу

    // Создание нового рендера
    render = Matter.Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: world.bounds.x,
            height: world.bounds.y,
            wireframes: WIREFRAMES,
            background: COLOR.BACKGROUND
        }
    });

    // Запускаем игровой цикл
    Matter.Render.run(render);
}

// Рисование элементов игрового поля

function createStaticBlocks()
{
    circle.createCircle(world),
    borders.createBorders(world),
    wall.createWalls(world),
    paddle.createPaddle(world);
}

// События при столкновении объектов

function events()
{
    Matter.Events.on(engine, 'collisionStart', function(event) {
        let pairs = event.pairs;
        pairs.forEach(function(pair) {
            if (pair.bodyA.label === 'pinball') {
                switch (pair.bodyB.label) {
                    case 'reset':
                        //Останавливаем бегунок
                        Matter.Runner.stop(runner, engine);
                        //Удаляем мячик
                        Matter.Composite.remove(world, pinball.pinball);
                        startGame = false;
                        //Создаем новый мяч
                        pinball.createPinball(world);
                        pinball.launchPinball(score);
                        break;
                    case 'circle':
                        circle.pingCircle(pair.bodyB, score);
                        break;
                    case 'wallSmall':
                        wall.pingWall(pair.bodyB, score);
                        break;
                    case 'paddleLeft':
                        if (paddle.LeftPaddle_Up === true){
                            pinball.changeVelocity();
                        }
                        break;
                    case 'paddleRight':
                        if (paddle.RightPaddle_Up === true){
                            pinball.changeVelocity();
                        }
                        break;
                }
            }
        });
    });
}

// Управление объектами

function control()
{
    document.addEventListener('keydown', function(e)
    {
        if (e.key === "Enter" && e.repeat == false){
            if (startGame === false){
                runner = Matter.Runner.create();
                Matter.Runner.run(runner, engine);
                startGame = true;
            };
        }else if(e.key === "ArrowLeft" && e.repeat == false){
            paddle.rotateLeft(-Math.PI/4);
            paddle.LeftPaddle_Up = true;
        }
        else if(e.key === "ArrowRight" && e.repeat == false){
            paddle.rotateRight(Math.PI/4);
            paddle.RightPaddle_Up = true;
        }
    });

    document.addEventListener('keyup', function(e)
    {
        if(e.key === "ArrowLeft"){
            paddle.LeftPaddle_Up = false;
            paddle.rotateLeft(Math.PI/4);
        }
        else if(e.key === "ArrowRight"){
            paddle.RightPaddle_Up = false;
            paddle.rotateRight(-Math.PI/4);
        }
    });
}