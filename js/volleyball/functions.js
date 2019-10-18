// Ball collides with walls
function ballWall() {
    
    if (ball.x >= LOGICAL_WIDTH - ball.width / 2) {
        ball.x = LOGICAL_WIDTH - ball.width / 2;
        ball.vx = -Math.abs(ball.vx) * 0.9;
    } else if (ball.x <= ball.width / 2) {
        ball.x = ball.width / 2;
        ball.vx = Math.abs(ball.vx) * 0.9;
    }

    if (ball.y <= ball.height / 2) {
        ball.y = ball.height / 2;
        ball.vy = Math.abs(ball.vy) * 0.8;
    }

    if (ball.y >= LOGICAL_HEIGHT + ball.height / 2) {
        endGame();
    }
}
  
// After game over => show result
function endGame() {
    
    currentScreen++;
    gameScreen.visible = false;
    setCookieFail(totalScore);
    state = gameOver;
    totalScoreText.text = totalScore;
    localStorage.setItem("score" , totalScore);
}

// Reset new game
function resetNewGame() {
    
    resultScreen.visible = false;
    gameScreen.visible = true;
    state = gameLoop;
    totalScore = 0;
    scoreNumText.text = 0;
    currentScreen = 3;
    setupBall();
    setupPerson();
    
}

// Person collides with ball
function personBallCollision() {

    collided = SAT.testPolygonCircle(personSAT, ballSAT, response);
    if (collided) {
        if (!hit) {
            // ball.texture
            ball.texture = PIXI.loader.resources[arrAvatar[Math.floor(Math.random()*arrAvatar.length)]].texture;
            // console.log(ball.texture.textureCacheIds );
            
            hit = true;
            randomVy = -Math.abs(randomV(ball.vy, 15, true));
            if (randomVy > -4) {
                randomVy = -4;
            }
            ball.vy = randomVy;
            
            let leftCoordinate = person.x + personPath[0] - 5;
            let rightCoordinate = person.x + personPath[2] + 5;

            // If ball hits person's left-side
            if (ball.x <= leftCoordinate) {
                ball.vx = -randomV(Math.abs(ball.vx), 25);
            } else if (ball.x >= rightCoordinate) {
                // If ball hits person's right side
                ball.vx = randomV(Math.abs(ball.vx), 25);
            } else if (ball.x > leftCoordinate && ball.x < rightCoordinate) {
                // If ball hits person's head
                ball.vx =
                    (Math.abs(ball.vx) - randomInt(2, 4)) * randomNegative();
            }

            // Add score if hit
            totalScore += SCORE_PER_HIT;
            scoreNumText.text = totalScore;
            // Wait 50 milisec for the next hit
            wait(50).then(() => {
                hit = false;
            });
        }
    }
}

// Set up which to be displayed when opening game
function screenDisplay() {
    // Hide gameScreen, resultScreen
    gameScreen.visible = false;
    resultScreen.visible = false;
}

// Position of ball
function setupBall() {
    
    ball.x = -50;
    ball.y = 50;
    ball.vx = 1 + Math.abs(randomV(0, 40));
    ball.vy = -1.5;
}

// Position of person
function setupPerson() {
    
    person.position.set(
        LOGICAL_WIDTH / 2 - person.width / 2,
        LOGICAL_HEIGHT - person.height / 2
    );
    person.vx = 0;
    person.vy = 0;
    person.isJumping = false;
    person.isFrontJumping = false;
    person.isLeftJumping = false;
    person.isRightJumping = false;
}

// Add button go to another screen

// function adjustOnTablet(w, h, newWidth, newHeight) {
//     if (w <= maxTabletWidth) {
//         if (w > h) {
//             addCustomBtn(w, h, newWidth, newHeight);
//         } else {
//             if (customBtn) {
//                 customBtn.style.visibility = "hidden";
//             }
//         }
//     }
// }

// function addCustomBtn(w, h, newWidth, newHeight) {
//     if (!customBtn) {
//         let imgHtml = `
//             <a target="_blank" class='button' href=${customLink}><img src='../../images/volleyball/custombtn.png'/></a>
//             `;
//         canvas.insertAdjacentHTML("afterend", imgHtml);
//         customBtn = document.querySelector(".button");
//         setBtnPosition(w, newWidth, newHeight);
//     } else {
//         customBtn.style.visibility = "visible";
//     }
// }

// function setBtnPosition(w, newWidth, newHeight) {
//     let btnWidth;
//     let sideSpace = (w - newWidth) / 2;

//     if (w < bigMobileWidth) {
//         btnWidth = sideSpace < 100 ? sideSpace + "px" : "100px";
//     } else {
//         btnWidth = sideSpace < 150 ? sideSpace + "px" : "150px";
//     }
//     let marginRight = sideSpace / 2;
//     customBtn.style.right = `${marginRight}px`;
//     customBtn.style.top = `${newHeight / 2}px`;
//     customBtn.style.transform = `translate(50%,-50%)`;
//     customBtn.style.width = btnWidth;
// }
