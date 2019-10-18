// Random int
function randomInt(min, max) {
    // RandomInt(1,8)-->[1,7]
    return Math.floor(Math.random() * (max - min)) + min;
}

// Random Negative
function randomNegative() {
    return Math.random() < 0.5 ? -1 : 1;
}
// Shuffle list
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = randomInt(0, array.length - 1); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
}

// Rotate random the image
function randomRadiant(degree, times) {
    let radiant = (degree * 3.14159) / 180;
    return radiant * randomInt(0, times);
}

// Responsive 
function resizeHandler() {
    const w = Math.max(window.innerWidth, document.documentElement.clientWidth);
    const h = Math.max(window.innerHeight, document.documentElement.clientHeight);
    const scaleFactor = Math.min(
        w / LOGICAL_WIDTH,
        h / LOGICAL_HEIGHT
    );
    const newWidth = Math.ceil(LOGICAL_WIDTH * scaleFactor);
    const newHeight = Math.ceil(LOGICAL_HEIGHT * scaleFactor);

    app.renderer.resize(newWidth, newHeight);
    app.stage.scale.set(scaleFactor);
};

// Get texture list
function getTextures(amounts, name, person = true) {
    textures = [];
    for (let i = 0; i <= amounts; i++) {
        let texture = Texture.fromImage(`${name}${i}.png`);
        textures.push(texture);
    }
    if (person) {
        textures.push(Texture.fromImage("front0.png"));
    }
    return textures;
}

// Set timeout function
function wait(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    });
}

// Random coordinate
function randomV(target, limit, up = false) {
    let negative = randomNegative();
    let randomNum = randomInt(0, limit) / 10;
    if (up && negative === -1) {
        return target + (randomNum / 2) * negative;
    }
    return target + randomNum * negative;
}

// Create new sprite
function newSprite(
    url,
    container,
    scale,
    width,
    height,
    anchorX = 0,
    anchorY = 0,
    x,
    y,
    visible = true
) {
    let el = new Sprite(url);
    el.scale.set(scale);
    if (width) {
        el.width = width;
    }
    if (height) {
        el.height = height;
    }
    container.addChild(el);
    el.anchor.set(anchorX, anchorY);
    el.x = x;
    el.y = y;
    el.visible = visible;
    return el;
}

// Set size for the sprite
function setSize(el, w, h) {
    el.width = w;
    el.height = h;
}

// On, off interactive
function setInteractive(sprite, status) {
    sprite.interactive = status;
    sprite.buttonMode = status;
}
