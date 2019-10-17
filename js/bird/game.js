/* global PIXI */

// Aliases

const Container = PIXI.Container;
const Application = PIXI.Application;
const loader = PIXI.loader;
const Sprite = PIXI.Sprite;
const logicalWidth = 240;
const logicalHeight = 240;

const app = new Application({
    width: logicalWidth,
    height: logicalHeight,
    transparent: true,
    antialias: true,
    resolution: 2,
    autoResize: true
});

const gameScene = new Container();

let scoreContainer;
let id;
let state;
let gameTime;
let isDay;

// Sprites
let background;
let darkBackground;
let bird;
let floor;
let gameOver;
let pipes;

const birdAnimationStates = [
    'yellow-bird-1.png',
    'yellow-bird-2.png',
    'yellow-bird-3.png',
    'yellow-bird-2.png',
];

const birdAnimationStatesIterator = {
    animationState: -1,
    [Symbol.iterator]() { return this; },

    next() {
        if (this.animationState > 2) {
            this.animationState = 0;
        } else {
            this.animationState += 1;
        }

        if (bird.vy >= 2.5) {
            this.animationState = 1;
        }

        return { value: birdAnimationStates[this.animationState], done: false };
    },
};

// Constants
const OPEN_SPACE_HEIGHT = 201;
const MAX_ROTATION = Math.PI / 2 - 0.2;
const MIN_ROTATION = -Math.PI / 10;
const DAY_LENGTH = 1000;

let PIPE_SEPARATION = app.width * 1;
let gameSpeed = 1;
let currentGapSize = 70;
let gameScore = 0;
let lastPipe;
let animationId;

class Throttler {
    constructor() {
        this.timer = undefined;
    }

    throttleAnimation(fps, fn) {
        if (this.timer === undefined) {
            this.timer = setTimeout(() => {
                this.timer = undefined;
                requestAnimationFrame(fn);
            }, 1000 / fps);
        }
    }
}

// Throttlers
const birdThrottler = new Throttler();

const gameLoop = () => {
    animationId = requestAnimationFrame(gameLoop);

    state();

    app.stage.addChild(gameScene);
};

const flyClickHandler = () => {
    bird.vy = -2.75;
};

const generatePipeContainer = (center) => {
    const pipeContainer = new Container();
    const upPipe = new Sprite(id['up-green-pipe.png']);
    const downPipe = new Sprite(id['down-green-pipe.png']);

    upPipe.x = 0;
    upPipe.y = center - (currentGapSize / 2) - upPipe.height;
    upPipe.vx = -gameSpeed;
    downPipe.x = 0;
    downPipe.y = center + (currentGapSize / 2);
    downPipe.vx = -gameSpeed;
    pipeContainer.addChild(upPipe);
    pipeContainer.addChild(downPipe);
    return pipeContainer;
};

const generatePipes = () => {
    // Abort if a pipe has not left the screen
    if (pipes[0].x < -(id['down-green-pipe.png'].width)) {
      pipes.splice(0, 1);
      return;
    }
  
    const stopGeneratingAt = renderer.width * 2;
    const centerPoint = Math.random() * ((OPEN_SPACE_HEIGHT - currentGapSize) - (currentGapSize)) + currentGapSize;
    let currentPosition = pipes.slice(-1)[0].x + PIPE_SEPARATION;
    
    while (currentPosition < stopGeneratingAt) {
      const pipeContainer = generatePipeContainer(centerPoint, currentPosition);
      pipeContainer.x = currentPosition;
  
      pipes.push(pipeContainer);
      gameScene.addChild(pipeContainer);
      // Move the floor to the front
      stage.setChildIndex(floor, stage.children.length - 1);
  
      currentPosition += PIPE_SEPARATION;
    }
  };

const animatePipes = (speed) => {
    pipes.forEach((pipe) => {
        pipe.x -= speed;
    });
};

const animateBirdWings = () => {
    // Make the wings flap
    bird.texture = id[birdAnimationStatesIterator.next().value];
};

const animateBirdStatic = () => {
    // Animate the bird's wings at 10fps
    birdThrottler.throttleAnimation(10, animateBirdWings);
};

const animateBirdPlay = () => {
    // Animate the bird's wings at 10fps
    birdThrottler.throttleAnimation(10, animateBirdWings);

    // Animate the bird's vertical position
    bird.vy += bird.ay;
    bird.y += bird.vy;

    // Animate the bird's rotation
    if (bird.vy > 0 && bird.rotation < MAX_ROTATION) {
        bird.rotation += 0.04 * bird.vy;
    } else if (bird.vy < 0 && bird.rotation > MIN_ROTATION) {
        bird.rotation -= 0.4;
    }

    // Check if the bird has collided with the ceiling
    if (bird.y - (bird.height / 2) < 0) {
        bird.y = bird.height / 2;
        bird.vy = 0;
    }
};

const checkScore = () => {
    pipes.forEach((pipe) => {
        if (pipe !== lastPipe && (Math.abs(pipe.x + pipe.width) - (bird.x + (bird.width / 2))) < 1) {
            lastPipe = pipe;
            gameScore += 1;
        }
    });
};

const displayScore = (score) => {
    const digits = String(score)
        .split('')
        .map(d => `${d}.png`);

    scoreContainer.removeChildren();

    digits.forEach((digit) => {
        const sprite = new Sprite(id[digit]);
        let lastChildWidth = 0;
        let lastChildX = 0;

        if (scoreContainer.children.length > 0) {
            const lastChild = scoreContainer.getChildAt(scoreContainer.children.length - 1);
            lastChildWidth = lastChild.width;
            lastChildX = lastChild.x;
        }

        sprite.x = lastChildX + lastChildWidth + 1;
        scoreContainer.addChild(sprite);
        gameScene.setChildIndex(scoreContainer, gameScene.children.length - 1);
    });

    // Center the scoreContainer
    scoreContainer.x = (app.width / 4) - (scoreContainer.width / 2);
};

const checkCollisions = () => {
    let collided = false;

    // Check if the bird has collided with the ground
    if (bird.y + (bird.height / 2) > OPEN_SPACE_HEIGHT) {
        // YOU LOST!!
        bird.y = OPEN_SPACE_HEIGHT - (bird.height / 2);
        collided = true;
    }

    // Check if the bird has collided with a pipe
    const birdRightX = bird.x + bird.width / 2;
    const birdLeftX = bird.x - bird.width / 2;
    const birdTopY = bird.y - bird.height / 2;
    const birdBottomY = bird.y + bird.height / 2;

    pipes.forEach((pipe) => {
        // Between pipe space in X
        if (birdRightX > pipe.x + 5 && birdLeftX < pipe.x + pipe.width - 5) {
            const upPipe = pipe.children[0];
            const downPipe = pipe.children[1];

            if (birdTopY < downPipe.getGlobalPosition().y - currentGapSize - 5
                || birdBottomY > upPipe.getGlobalPosition().y + upPipe.height + currentGapSize + 5) {
                collided = true;
            }
        }
    });

    return collided;
};


const animateGround = (speed) => {
    floor.x -= speed;

    if (floor.x < -100) {
        floor.x = 0;
    }
};

const prePlay = () => {
    // Animate the bird
    animateBirdStatic();

    // Animate the floor
    animateGround(gameSpeed);

    // Generate some pipes
    generatePipes();
};

const play = () => {
    // Add time
    gameTime += 1;

    // Animate the bird
    animateBirdPlay();

    // Animate the floor
    animateGround(gameSpeed);

    // Generate some pipes
    generatePipes();

    // Animate pipes
    animatePipes(gameSpeed);

    // Check for collisions
    if (checkCollisions() === true) {
        bird.vy = 0;
        state = preLost;
    }

    // Make gaps smaller
    if (currentGapSize > 48) {
        currentGapSize -= 0.01
    }
    // Make pipes closer together
    if (PIPE_SEPARATION > app.width * 0.35) {
        PIPE_SEPARATION -= 0.075;
    }

    // Set speed round
    // Speed up the ground
    if (gameSpeed < 1.3) {
        gameSpeed += 3;
    }

    if (gameTime % DAY_LENGTH === DAY_LENGTH - 1) {
        isDay = !isDay;
    }

    if (isDay) {
        if (background.alpha < 1) {
            background.alpha += 0.005;
        }
    }

    if (!isDay) {
        if (background.alpha > 0) {
            background.alpha -= 0.005;
        }
    }

    checkScore();

    displayScore(gameScore);
};

const lost = () => {
    // Animate the bird
    animateBirdPlay();

    // Prevent phasing through floor
    checkCollisions();
};

const preLost = () => {
    gameSpeed = 0;

    // Remove the fly click listener
    app.view.removeEventListener('click', flyClickHandler);

    gameOver = new Sprite(id['game-over.png']);
    gameOver.x = (app.width / 4) - (gameOver.width / 2);
    gameOver.y = (app.height / 4) - 60;
    gameScene.addChild(gameOver);

    document.addEventListener('keypress', function handler(event) {
        if (event.which === 32) {
            document.removeEventListener('keypress', handler);
            reset();
        }
    });

    state = lost;
};

/**
*
* Waits for the player to start the game by tapping/clicking
*/
const prePlaySetup = () => {
    // Waits for the player to click the play space to begin
    app.view.addEventListener('click', function starter() {
        state = play;
        app.view.removeEventListener('click', starter);
    });

    // Add the listeners for flying action
    app.view.addEventListener('click', flyClickHandler);

    state = prePlay;
};

// Ensures pixels are scaled up
// PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

const reset = () => {
    gameScene.removeChildren();
    cancelAnimationFrame(animationId);

    init();
};

const init = () => {
    gameTime = 0;
    isDay = true;
    birdAnimationStatesIterator.animationState = -1;
    PIPE_SEPARATION = app.width * 1;
    gameSpeed = 1;
    currentGapSize = 70;
    gameScore = 0;
    pipes = [];
    // Object which refers to sprites in atlas
    id = loader.resources["../../images/bird/sprites.json"].textures;

    // Adds night background
    darkBackground = new Sprite(id['night-bg.png']);
    darkBackground.width = 240;
    gameScene.addChild(darkBackground);

    // Adds day background
    background = new Sprite(id['day-bg.png']);
    background.width = 240;
    gameScene.addChild(background);

    // Adds the floor
    floor = new Sprite(id['floor.png']);
    floor.y = OPEN_SPACE_HEIGHT;
    floor.width = 380;
    gameScene.addChild(floor);

    // Adds bird
    bird = new Sprite(id[birdAnimationStates[0]]);
    bird.y = (OPEN_SPACE_HEIGHT / 2) - (bird.height / 2) + 10;
    bird.x = (gameScene.width / 2) - (80);
    bird.pivot.set(bird.width / 2, bird.height / 2);
    // Bird physics properties
    bird.vy = 0;
    bird.ay = 0.12;
    gameScene.addChild(bird);


    // Adds a pipe
    const pipeContainer = generatePipeContainer(OPEN_SPACE_HEIGHT / 2);
    pipeContainer.x = app.width;
    pipes.push(pipeContainer);
    gameScene.addChild(pipeContainer);

    // Adds a score container + scores
    scoreContainer = new Container();
    const zeroNum = new Sprite(id['0.png']);
    scoreContainer.x = (app.width / 4) - ((zeroNum.width / 2) - 1);
    scoreContainer.y = OPEN_SPACE_HEIGHT / 10;
    scoreContainer.addChild(zeroNum);
    gameScene.addChild(scoreContainer);

    state = prePlaySetup;

    gameLoop();
};

// Resize handler
const resizeHandler = () => {
    const w = Math.max(window.innerWidth, document.documentElement.clientWidth);
    const h = Math.max(window.innerHeight, document.documentElement.clientHeight);

    const scaleFactor = Math.min(
        w / logicalWidth,
        h / logicalHeight
    );

    const newWidth = Math.ceil(logicalWidth * scaleFactor);
    const newHeight = Math.ceil(logicalHeight * scaleFactor);

    app.renderer.resize(newWidth, newHeight);
    app.stage.scale.set(scaleFactor);
}
resizeHandler();
window.addEventListener('resize', resizeHandler);
document.body.appendChild(app.view);

loader
    .add("../../images/bird/sprites.json")
    .load(init);
