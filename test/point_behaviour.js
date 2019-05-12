function setVelocity(point, velocity) {
    point.setVelocity(velocity);
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

function respawnCenter(node, respawn_rate_percent, radius) {
    respawnPoint(node, new Vec2d(WIDTH / 2, HEIGHT / 2), respawn_rate_percent, radius);
}

function respawnPoint(node, vec, respawn_rate_percent, radius) {
    const respawns = Math.random() * 100 > (100 - respawn_rate_percent);
    if (!respawns)
        return;

    const random_angle = randomRangeFloat(-PI, PI);
    const random_scale = Math.random() * radius;

    node.setPosition(
        vec.x + random_scale * Math.sin(random_angle),
        vec.y + random_scale * Math.cos(random_angle),
    );
}

function directionAttractionPoint(node, vec) {
    const angle = node.angle(vec);
    node.setDirection(angle);
}

function directionRepulsionPoint(node, vec) {
    const angle = node.angle(vec) + PI;
    node.setDirection(angle);
}

function velocityProximityIncrease(node, vec, distance_treshold, base_velocity, max_velocity) {
    const distance = node.distance(vec);
    const distanceRatio = 1 - Math.min(1, distance / distance_treshold);

    const delta_velocity = max_velocity - base_velocity;

    const velocity = base_velocity + distanceRatio * delta_velocity;

    node.setVelocity(velocity);
}

function reachProximityIncrease(node, vec, distance_treshold, base_reach, max_reach) {
    const distance = node.distance(vec);
    const ratio = 1 - Math.min(1, distance / distance_treshold);

    const reach = base_reach + (max_reach - base_reach) * ratio;
    node.setReach(reach);
}

function directionRandomChange(node, max_change) {
    node.changeDirection(randomRangeFloat(-max_change, max_change));
}

function velocityRandomChange(node, max_change) {
    node.changeVelocity(randomRangeFloat(-max_change, max_change));
}

function setStrokeWeight(node, weight) {
    node.setStrokeWeight(weight);
}



// MODIFIERS

function modRandomScale(val, scale) {
    return val + Math.random() * scale;
}

function modRandomOffset(val, offset) {
    return val + randomRangeFloat(-offset, offset);
}

function modMicScale(val, scale) {
    const level = mic.getLevel();
    return val + level * scale;
}

function modAmpScale(val, scale) {
    const level = amp.getLevel();
    return val + level * scale;
}

function modFFTSpectrumScale(val, scale, i = VAR1) {
    const level = spectrum[i] / 255;
    return val + level * scale;
}

function modFFTWaveformAbsScale(val, scale, i = VAR1) {
    const level = Math.abs(waveform[i]);
    return val + level * scale;
}
