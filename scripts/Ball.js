import { Points } from './Points.js';

export class Ball
{
    COLOR = {
        PINBALL: '#dee2e6'
    };

	MAX_VELOCITY = 50;

    RADIUS = 1; //Радиус мячика
	pinball;

    constructor(radius)
    {
        this.RADIUS = radius;
		this.pinball = Matter.Bodies.circle(0, 0, this.RADIUS, {
			label: 'pinball',
			collisionFilter: {
				group: 1
			},
			render: {
				fillStyle: this.COLOR.PINBALL
			}
		});
    }

    createPinball(world) {
		Matter.Composite.add(world, this.pinball);
	}

    // Сброс мячика в начальное положение

    launchPinball(score) {
		score.updateScore(0);
		Matter.Body.setPosition(this.pinball, { x: 465, y: 765 });
		Matter.Body.setVelocity(this.pinball, { x: 0, y: -25 + rand(-2, 2) });
		Matter.Body.setAngularVelocity(this.pinball, 0);
	}

	// Смена вектора скорости мяча

	changeVelocity(){
		Matter.Body.setVelocity(this.pinball, { x: 0 + rand(-5, 5), y: -20 + rand(-5, 5) });
	}
}

export function rand(min, max) {
	return Math.random() * (max - min) + min;
}