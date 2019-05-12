class MatrixNode {
    direction = PI;
    reach = DISTANCE_THRESHOLD;
    stroke_weight = 2;

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

    setStrokeWeight(weight) {
        this.stroke_weight = weight;
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

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    inReach(p) {
        return this.distance(p) <= Math.min(this.reach, p.reach);
    }

    drawConnection(p) {
        const max_weight = this.stroke_weight;
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
        if (!DEBUG)
            return;
        point(this.x, this.y);
        //this.debugText();
        this.debugVec();
    }

    reset() {
        this.direction = PI;
        this.velocity = 0;
        this.reach = DISTANCE_THRESHOLD;
    }

    distance(p) {
        return Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2));
    }

    angle(p) {
        return Math.atan2((p.x - this.x), (p.y -  this.y));
    }

    debugText() {
        strokeWeight(0.3);
        text(`x: ${this.x}`, this.x + 10, this.y);
        text(`y:${this.y}`, this.x + 10, this.y + 20);
        text(`direction ${this.direction}`,this.x + 10, this.y + 40);
        text(`velocity ${this.velocity}`,this.x + 10, this.y + 60);
    }

    debugVec() {
        const dx = this.x + Math.sin(this.direction) * 5 * this.velocity;
        const dy = this.y + Math.cos(this.direction) * 5 * this.velocity;

        strokeWeight(1);
        stroke(0, 255, 255);
        line(this.x, this.y, dx, dy);
        stroke(255);
    }
}
