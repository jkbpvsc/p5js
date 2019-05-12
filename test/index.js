const WIDTH = 1600;
const HEIGHT = 900;
const Y_AXIS = 1;
const X_AXIS = 2;

let points = [];
let button;

const POPULATION = 300;
const DISTANCE_THRESHOLD = 20;
let DEBUG = false;
const RESPAWN_RATE_PERCENT = 0.5;
let VAR1 = 0;
const comparisonSet = generateComparisonSet(POPULATION);

let LINE_COLOR;

let mic;
let track, amp, fft;
let inp;

let spectrum, waveform;


function preload() {
    soundFormats('mp3');
    track = loadSound('../assets/jonh/04 - Collider.mp3');
}

function setup () {
    createCanvas(WIDTH, HEIGHT);
    color(255);
    stroke(255);
    fill(255);
    frameRate(60);

    button = createButton('DEBUG');
    button.position(15, 15);
    button.mousePressed(() => DEBUG = !DEBUG);

    inp = createSlider(0, 1000, VAR1);
    inp.position(100, 15);

    for (let i = 0; i < POPULATION; i++) {
        points[i] = new MatrixNode();
    }

    // mic = new p5.AudioIn();
    LINE_COLOR = color(255);
    amp = new p5.Amplitude();
    fft = new p5.FFT();
    // mic.start();
    track.play();
}

function draw() {
    background(0);
    spectrum = fft.analyze();
    waveform = fft.waveform();
    VAR1 = inp.value();
    points.forEach(updatePoint);
    comparisonSet.forEach(drawConnections);
    debugStats();
}

function updatePoint(point) {
    const mod = modFFTWaveformAbsScale;
    const vec = centerVec();
    const waveform_index = 200;
    setVelocity(point, 0.3);
    stroke(LINE_COLOR);
    respawnPoint(point, vec, mod(0, 5, waveform_index), 50);

    directionRepulsionPoint(point, vec);
    // directionAttractionPoint(point, vec);

    velocityProximityIncrease(point, vec, mod(250, 150, waveform_index), mod(0, 10, waveform_index), mod(0, 30, waveform_index));
    reachProximityIncrease(point, vec, mod(400, 200, waveform_index), mod(30, 20, waveform_index), mod(70, 20, waveform_index));

    // reachProximityIncrease(point, vec, mod(400, 200, ypos), mod(100, 300, ypos), mod(0, 5, ypos));

    directionRandomChange(point, mod(0, PI / 4, waveform_index));
    velocityRandomChange(point, mod(-1, 50, waveform_index));

    setStrokeWeight(point, mod(1, 5, waveform_index));

    point.move();
    point.draw();
}

function debugStats() {
    if (!DEBUG) return;

    const margin = 25;
    const offset = 15;
    const x_offset = 10;

    strokeWeight(0.3);
    stroke(255);

    text(`x: ${mouseX}`, x_offset, margin + offset);
    text(`y: ${mouseY}`, x_offset, margin +  2 * offset);
    text(`pop: ${POPULATION}`, x_offset,  margin + 3 * offset);
    text(`rr: ${RESPAWN_RATE_PERCENT}%`, x_offset,  margin + 4 * offset);
    text(`mic_lv: ${mic ? mic.getLevel() : 'OFF' }`, x_offset,  margin + 5 * offset);
    text(`amp_lv: ${amp ? amp.getLevel() : 'OFF' }`, x_offset,  margin + 6 * offset);

    const spectrum_h = 100;
    const s_w = 100;
    noStroke();
    fill(0,255,0); // spectrum is green
    for (var i = 0; i< spectrum.length; i++) {
        var x = map(i, 0, spectrum.length, 0, s_w);
        var h = -spectrum_h + map(spectrum[i], 0, 255, spectrum_h, 0);
        rect(x, spectrum_h, s_w / spectrum.length, h );
    }

    noFill();
    beginShape();
    stroke(255,0,0); // waveform is red
    strokeWeight(1);
    for (var i = 0; i< waveform.length; i++) {
        var x = map(i, 0, waveform.length, 0, s_w);
        var y = map( waveform[i], -1, 1, 0, spectrum_h);
        vertex(x,y);
    }

    stroke(255)
}

function drawConnections([a, b]) {

    const distance = points[a].distance(points[b]);
    if (points[a].inReach(points[b]))
        points[a].drawConnection(points[b]);
}

class Vec2d {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

function centerVec () {
    return new Vec2d(WIDTH / 2, HEIGHT / 2);
}

function mouseVec () {
    return new Vec2d(mouseX, mouseY);
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

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();

    if (axis === Y_AXIS) {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis === X_AXIS) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}
