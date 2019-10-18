// Front jump animation
function frontAnimation() {
    person.textures = frontAnimateTextures;
    person.animationSpeed = 0.09;
    person.gotoAndPlay(2);
    person.gotoAndPlay(0);
    person.loop = false;
    person.vy = -4.2;
}

// Right jump animation
function rightSideAnimation() {    
    person.textures = rightAnimateTextures;
    person.animationSpeed = 0.09;
    person.gotoAndPlay(2);
    person.gotoAndPlay(0);
    person.loop = false;
    person.vy = -3.6;
    person.vx = 3;
}

// Left jump animation
function leftSideAnimation() {
    person.textures = leftAnimateTextures;
    person.animationSpeed = 0.09;
    person.gotoAndPlay(2);
    person.gotoAndPlay(0);
    person.loop = false;
    person.vy = -3.6;
    person.vx = -3;
}

// Person loop
function personAnimationLoop(delta) {
    // Person moving
    person.x += person.vx * delta;
    person.y += person.vy * delta;

    if (person.isJumping) {
        if (person.y < LOGICAL_HEIGHT - person.height / 2) {
            person.vy += personGravity;
            person.isJumping = true;
        } else {
            person.vy = 0;
            person.y = LOGICAL_HEIGHT - person.height / 2;
            person.isJumping = false;
        }
    }

    if (person.isRightJumping) {
        if (person.x > 200 - person.width / 2) {
            person.vx = -2.6;
        } else if (person.x <= LOGICAL_WIDTH / 2 - person.width / 2) {
            person.vx = 0;
            person.x = LOGICAL_WIDTH / 2 - person.width / 2;
        }
    }

    if (person.isLeftJumping) {
        if (person.x < 40 - person.width / 2) {
            person.vx = 3;
        } else if (person.x >= LOGICAL_WIDTH / 2 - person.width / 2) {
            person.vx = 0;
            person.x = LOGICAL_WIDTH / 2 - person.width / 2;
        }
    }

    if (
        person.y == LOGICAL_HEIGHT - person.height / 2 &&
        person.x == LOGICAL_WIDTH / 2 - person.width / 2
    ) {
        person.isJumping = false;
        person.isLeftJumping = false;
        person.isRightJumping = false;
        person.isFrontJumping = false;
    }

    // Person Shape
    personShape.x = person.x - 2.5;
    personShape.y = person.y;

    // Person SAT
    personSAT.pos.x = person.x - 2.5;
    personSAT.pos.y = person.y;
}

// Ball animation
function ballAnimationLoop(delta) {
    // Ball moving
    ball.x += ball.vx * delta;
    ball.y += ball.vy * delta;
    ball.vy += ballGravity;
    // If ball is too fast
    if (ball.vx >= 2.5) {
        ball.vx -= 0.04;
    }
    if (ball.vx <= -2.5) {
        ball.vx += 0.04;
    }
    if (ball.vy <= -3) {
        ball.vy += 0.05;
    }
    // Ball shape
    ballShape.x = ball.x;
    ballShape.y = ball.y;

    // Ball SAT
    ballSAT.pos.x = ball.x;
    ballSAT.pos.y = ball.y;
}

// Breath animation
function breathAnimation(sprite, top, bot, delta) {
    sprite.y += sprite.vy * delta;
    if (sprite.y >= top) {
        sprite.y = top;
        sprite.vy = -Math.abs(sprite.vy);
    }
    if (sprite.y <= bot) {
        sprite.y = bot;
        sprite.vy = Math.abs(sprite.vy);
    }
}

// Fade animation
function fadeAnimation(sprite, delta) {
    sprite.alpha += fadeSpeed * delta;
    if (sprite.alpha >= 1.4) {
        sprite.alpha = 1;
        fadeSpeed *= -1;
    }
    if (sprite.alpha <= -0.4) {
        sprite.alpha = 0;
        fadeSpeed *= -1;
    }
}

// Blink animation
function blinkAnimation(sprite, delta) {
    sprite.blink += blinkSpeed * delta;
    if (sprite.blink >= 1) {
        sprite.blink = 1;
        blinkSpeed *= -1;
    }
    if (sprite.blink <= -1) {
        sprite.blink = -1;
        blinkSpeed *= -1;
    }
    if (sprite.blink >= 0) {
        sprite.alpha = 1;
    } else {
        sprite.alpha = 0;
    }
}
