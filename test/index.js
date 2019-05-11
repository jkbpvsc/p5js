const WIDTH = 1920;
const HEIGHT = 1080;

let points = [];

const POPULATION = 250;
const DISTANCE_THRESHOLD = 50;
const DEBUG = false;
const RESPAWN_RATE_PERCENT = 0.2;

const compSet = generateComparisonSet(POPULATION);


function setup () {
    createCanvas(WIDTH, HEIGHT);
    color(255);
    stroke(255);
    fill(255);

    for (let i = 0; i < POPULATION; i++) {
        points[i] = new Point();
    }
}

function draw() {
    background(0);
    const cursorVec = new Vec2d(mouseX, mouseY);
    points.forEach(updatePoint);
    compSet.forEach(drawConnections);
    debugStats();
}

function updatePoint(point) {
    rebaseVelocity(point);
    //mouseAttractionAngle(point);
    // mouseAttractionVelocity(point);
    mouseProximityTurbolent(point);
    mouseProximityIncreasedReach(point);
    // mouseProximityDecreasedReach(point);
    point.move();
    point.draw();
}

function debugStats() {
    if (!DEBUG) return;

    const offset = 15;

    text(`x: ${mouseX}`, 5, offset);
    text(`y: ${mouseY}`, 5, 2 * offset);
    text(`pop: ${POPULATION}`, 5, 3 * offset);
    text(`rr: ${RESPAWN_RATE_PERCENT}%`, 5, 4 * offset);
}

function drawConnections([a, b]) {

    const distance = points[a].distance(points[b]);
    if (points[a].inReach(points[b]))
        points[a].drawConnection(points[b]);
}

class Point {
    hide = !DEBUG;
    direction = PI;
    debug = DEBUG;
    reach = DISTANCE_THRESHOLD;

    constructor(
        velocity = 0,
        size = 5,
        x = Math.floor(Math.random() * WIDTH),
        y = Math.floor(Math.random() * HEIGHT)
    ) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.size = size;
    }

    changeDirection(delta) {
        this.direction = this.direction + delta;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    setVelocity(velocity) {
        this.velocity = velocity;
    }

    changeVelocity(delta) {
        this.velocity = this.velocity + delta;
    }

    setReach(reach) {
        this.reach = reach;
    }

    changeReach(delta) {
        this.reach += delta;
    }

    inReach(p) {
        return this.distance(p) <= Math.min(this.reach, p.reach);
    }

    drawConnection(p) {
        const max_weight = 2;
        const base_weight = 0.1;
        const roundTo = 1000;

        const ratio = 1 - this.distance(p) / Math.min(this.reach, p.reach);
        const weight = Math.min(max_weight, base_weight + Math.round(ratio * max_weight * roundTo) / roundTo);

        strokeWeight(weight);
        line(this.x, this.y, p.x, p.y);
    }

    move() {
        this.x += Math.sin(this.direction) * this.velocity;
        this.y += Math.cos(this.direction) * this.velocity;
    }

    draw() {
        if (!this.hide)
            ellipse(this.x, this.y, this.size, this.size);

        if (this.debug)
            this.debugText();

        if ((Math.random() * 100) > (100 - RESPAWN_RATE_PERCENT))
            this.respawn();
    }

    respawn() {
        this.x = Math.floor(Math.random() * WIDTH);
        this.y = Math.floor(Math.random() * HEIGHT);
    }

    distance(p) {
        return Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2));
    }

    angle(p) {
        return Math.atan2((p.x - this.x), (p.y -  this.y));
    }

    debugText() {
        text(`x: ${this.x}`, this.x + 10, this.y);
        text(`y:${this.y}`, this.x + 10, this.y + 20);
        text(`direction ${this.direction}`,this.x + 10, this.y + 40);
        text(`velocity ${this.velocity}`,this.x + 10, this.y + 60);

        const dx = this.x + Math.sin(this.direction) * 30;
        const dy = this.y + Math.cos(this.direction) * 30;

        stroke(0, 255, 255);
        line(this.x, this.y, dx, dy);
        stroke(0);
    }
}

class Vec2d {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}



function randomRange(x1, x2) {
    return  x1 + Math.round(Math.random() * (x2 - x1));
}

function randomRangeFloat(x1, x2){
    return  x1 + Math.random() * (x2 - x1);
}

function generateComparisonSet(size) {
    const set = [];
    for(let i = 0; i < size; i++) {
        for(let j = size - 1; j > i; j--) {
            set.push([i, j]);
        }
    }

    return set;
}

function rebaseVelocity(point) {
    point.setVelocity(0);
}

function mouseProximityTurbolentOnClick(point) {
    mouseProximityTurbolent(point, mouseIsPressed);
}

function mouseProximityTurbolent(point, ignore = false) {
    const base_turbolence = 0.5;
    const max_turbolence = 3;
    const distance_treshold = 700;
    const mouse_distance = point.distance(new Vec2d(mouseX, mouseY));

    const distanceRatio = Math.min(mouse_distance / distance_treshold, 1);

    const turbolence = Math.min(
        base_turbolence + (max_turbolence - (distanceRatio * max_turbolence)),
        max_turbolence
    );

    point.changeDirection(randomRangeFloat(-turbolence, turbolence));
    point.changeVelocity(randomRangeFloat(base_turbolence, turbolence));
}

function mouseProximityTurbolentInverseOnClick(point) {
    mouseProximityTurbolentInverse(point, mouseIsPressed);
}

function mouseProximityTurbolentInverse(point, ignore) {
    const base_turbolence = 4;
    const min_turbolence = 0.05;
    const distance_treshold = 400;
    const mouse_distance = point.distance(new Vec2d(mouseX, mouseY));
    const distanceRatio = 1 - mouse_distance / distance_treshold;

    const turbolence = Math.min(base_turbolence - (ignore ? 0 : distanceRatio) * (base_turbolence - min_turbolence), base_turbolence);

    point.changeDirection(randomRangeFloat(-turbolence, turbolence));
    point.setVelocity(randomRangeFloat(min_turbolence, turbolence));
    point.move();
}

function mouseAttractionAngle(point) {
    const angle = point.angle(new Vec2d(mouseX, mouseY));
    point.setDirection(angle);
}

function mouseAttractionVelocity(point) {
    const distance_treshold = 600;
    const base_velocity = 0.2;
    const mouse_distance = point.distance(new Vec2d(mouseX, mouseY));
    const distanceRatio = 1 - Math.min(1, mouse_distance / distance_treshold);

    point.setVelocity(base_velocity * distanceRatio);
}

function mouseProximityDecreasedReach(point) {
    const distance_treshold = 600;
    const base_reach = 100;
    const min_reach = 20;
    const mouse_distance = point.distance(new Vec2d(mouseX, mouseY));
    const distanceRatio = Math.min(1, mouse_distance / distance_treshold);

    const reach = min_reach + (base_reach - min_reach) * distanceRatio;

    point.setReach(reach);
}

function mouseProximityIncreasedReach(point) {
    const distance_treshold = 600;
    const base_reach = 60;
    const max_reach = 100;
    const mouse_distance = point.distance(new Vec2d(mouseX, mouseY));
    const distanceRatio = 1 - Math.min(1, mouse_distance / distance_treshold);

    const reach = base_reach + (randomRange(max_reach - 5, max_reach + 5) - base_reach) * distanceRatio;

    point.setReach(reach);
}
