import { Points } from './Points.js';

export class Paddles
{
    COLOR = {
		PADDLE: '#e64980',
		BACKGROUND: '#000120'
	};
    LeftPaddle;
    RightPaddle;
	LeftPaddle_Up = false;
	RightPaddle_Up = false;

	LeftPaddle_Big;
    RightPaddle_Big;

	CompLeft;
	CompRight;

	PADDLE_PULL = 0.7;

    constructor(){
        this.LeftPaddle = this.paddleLeft();
        this.RightPaddle = this.paddleRight();
		this.LeftPaddle_Big = this.stopperLeft();
        this.RightPaddle_Big = this.stopperRight();
		this.CompLeft = this.compLeft();
		this.CompRight = this.compRight();
    }

    createPaddle(world)
    {
		Matter.Composite.add(world, [ this.CompLeft, this.CompRight ]);
    }

	// Создание левого рычага

    paddleLeft()
    {
		return Matter.Bodies.trapezoid(165, 670, 20, 80, 0.33, {
			label: 'paddleLeft',
            isStatic: true,
			angle: 2,
			chamfer: {},
			render: {
				fillStyle: this.COLOR.PADDLE
			}
		});
    }

	stopperLeft()
    {
		return Matter.Bodies.rectangle(167, 680, 40, 75, {
			label: 'stopperLeft',
            isStatic: true,
			angle: 2,
			visible: false,
			render: {
				fillStyle: this.COLOR.BACKGROUND
			}
		});
    }

	compLeft() {
		return Matter.Body.create({
			isStatic: true,
			collisionFilter: {
				group: 1
			},
			label: 'paddleLeftComp',
			parts: [this.LeftPaddle_Big, this.LeftPaddle]
		});
	}

	// Создание правого рычага

    paddleRight()
    {
		return Matter.Bodies.trapezoid(285, 670, 20, 80, 0.33, {
			label: 'paddleRight',
            isStatic: true,
			angle: -2,
			chamfer: {},
			render: {
				fillStyle: this.COLOR.PADDLE
			}
		});
    }

	stopperRight()
    {
		return Matter.Bodies.rectangle(283, 680, 40, 75, {
			label: 'stopperRight',
            isStatic: true,
			angle: -2,
			visible: false,
			chamfer: { radius: 10 },
			render: {
				fillStyle: this.COLOR.BACKGROUND
			}
		});
    }

	compRight(){
		return Matter.Body.create({
			isStatic: true,
			collisionFilter: {
				group: 1
			},
			label: 'paddleRightComp',
			parts: [this.RightPaddle_Big, this.RightPaddle]
		});
	}


    rotateLeft(angle)
    {
        Matter.Body.rotate(this.CompLeft, angle, {x: 140, y: 660});
    }

    rotateRight(angle)
    {
        Matter.Body.rotate(this.CompRight, angle, {x: 310, y: 660});
    }

}