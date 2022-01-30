import { Points } from './Points.js';

export class Circle
{
    COLOR = {
        CIRCLE: '#fab005',
		CIRCLE_CHANGE: '#fff3bf'
    };

    CIRCLE_BOUNCE = 1.5;    //упругость круга
    RADIUS = 1;
	RADIUS_SMALL = this.RADIUS * 0.7;

    constructor(radius)
    {
        this.RADIUS = radius;
		this.RADIUS_SMALL = this.RADIUS * 0.7;
    }

    createCircle(world)
    {
        Matter.Composite.add(world, [
            this.circle(105, 280, this.RADIUS),
			this.circle(225, 280, this.RADIUS),
			this.circle(345, 280, this.RADIUS),
			this.circle(165, 360, this.RADIUS),
			this.circle(285, 360, this.RADIUS)
        ]);
    }

    circle(x, y, radius) {
		let circle = Matter.Bodies.circle(x, y, radius, {
			label: 'circle',
			isStatic: true,
			collisionFilter: {
				group: 1
			},
			render: {
				fillStyle: this.COLOR.CIRCLE
			}
		});

		circle.restitution = this.CIRCLE_BOUNCE;
		return circle;
	}

	pingCircle(circle, score) {
		score.updateScore(score.currentScore + 10);

		// Меняем цвет при столкновении
		circle.render.fillStyle = this.COLOR.CIRCLE_CHANGE;
		setTimeout(function() {
			circle.render.fillStyle = '#fab005';
		}, 150);
	}
    
}


export class Borders
{
    PATHS = {
		DROP_LEFT: '0 0 20 0 70 100 20 150 0 150 0 0',
		DROP_RIGHT: '50 0 68 0 68 150 50 150 0 100 50 0',
		APRON_LEFT: '0 0 180 120 0 120 0 0',
		APRON_RIGHT: '180 0 180 120 0 120 180 0',
		CORNER_LEFT: '0 0 20 0 70 100 20 150 0 150 0 0',
		CORNER_RIGHT: '50 0 68 0 68 150 50 150 0 100 50 0'
	};

    COLOR = {
        OUTER: '#495057',
        INNER: '#15aabf',
        BORDERS: '#000000'
    };

    createBorders(world)
    {
        Matter.Composite.add(world, [
            this.boundary(250, -30, 500, 100),
            this.boundary(0, 830, 400, 100),
			this.boundary(450, 830, 400, 100),
            this.boundary(-30, 400, 100, 800),
            this.boundary(530, 400, 100, 800),

            this.wall(440, 520, 20, 560, this.COLOR.BORDERS),

            this.path(25, 360, this.PATHS.DROP_LEFT),
		    this.path(425, 360, this.PATHS.DROP_RIGHT),

			this.path(20, 0, this.PATHS.CORNER_LEFT),
		    this.path(480, 0, this.PATHS.CORNER_RIGHT),

            this.path(79, 740, this.PATHS.APRON_LEFT),
			this.path(371, 740, this.PATHS.APRON_RIGHT),

			this.reset(225, 800, 50),
			this.reset(465, 783, 30)  
        ]);

    }

    boundary(x, y, width, height) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			isStatic: true,
			collisionFilter: {
				group: 1
			},
			render: {
				fillStyle: this.COLOR.BORDERS
			}
		});
	}

    path(x, y, path) {
		let vertices = Matter.Vertices.fromPath(path);
		return Matter.Bodies.fromVertices(x, y, vertices, {
			isStatic: true,
			collisionFilter: {
				group: 1
			},
			render: {
				fillStyle: this.COLOR.BORDERS,
				strokeStyle: this.COLOR.BORDERS,
				lineWidth: 1
			}
		});
	}

    wall(x, y, width, height, color, angle = 0) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			angle: angle,
			isStatic: true,
			collisionFilter: {
				group: 1
			},
			chamfer: { radius: 10 },
			render: {
				fillStyle: color
			}
		});
	}

	reset(x, y, width) {
		return Matter.Bodies.rectangle(x, y, width, 5, {
			label: 'reset',
			isStatic: true,
			collisionFilter: {
				group: 1
			},
			render: {
				fillStyle: '#ffffff'
			}
		});
	}
}


export class Walls
{
    COLOR = {
        OUTER: '#495057',
        INNER: '#15aabf',
    };

    constructor(){}

    createWalls(world)
    {
        Matter.Composite.add(world, [
            this.wall(140, 140, 20, 40, 0, 'wallSmall'),
			this.wall(225, 140, 20, 40, 0, 'wallSmall'),
			this.wall(310, 140, 20, 40, 0, 'wallSmall'),
			this.wall(380, 200, 20, 70, 1, 'wall'),
			this.wall(80, 200, 20, 70, -1, 'wall'),
			this.wall(120, 510, 20, 120, 0, 'wall'),
			this.wall(330, 510, 20, 120, 0, 'wall'),
			this.wall(60, 529, 20, 160, 0, 'wall'),
			this.wall(390, 529, 20, 160, 0, 'wall'),
			this.wall(93, 624, 20, 98, -0.96, 'wall'),
			this.wall(357, 624, 20, 98, 0.96, 'wall')
        ]);
    }

    wall(x, y, width, height, angle, LaBel) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			angle: angle,
			label: LaBel,
			isStatic: true,
			chamfer: { radius: 10 },
			collisionFilter: {
				group: 1
			},
			render: {
				fillStyle: this.COLOR.INNER
			}
		});
	}

	pingWall(wall, score) {
		score.updateScore(score.currentScore + 20);

		// Меняем цвет при столкновении
		wall.render.fillStyle = '#fc5c3f';
		setTimeout(function() {
			wall.render.fillStyle = '#15aabf';
		}, 150);
	}
}