// Event Listeners
function listenToEvent() {
    // Next Btn
    startBar.on("pointerdown", () => {
        currentScreen++;
        backgroundScreen.visible = false;
        gameScreen.visible = true;
        scoreInterval = setInterval(() => {
            if (totalScore >= 10) {
                totalScore++;
                scoreNumText.text = totalScore;
            }
        }, 1000);
        state = gameLoop;
    });

    // Start btn
    // startBtn.on("pointerdown", () => {
        
    // });

    // Reset new game
    restartText.on("pointerdown", resetNewGame);

    // Circle 3
    circleList[2].on("pointerdown", () => {
        if (!person.isJumping) {
            person.isJumping = true;
            circleList[2].texture = blackCircleTexture;
            rightSideAnimation();
            person.isRightJumping = true;
        }
    });
    // Circle 2
    circleList[1].on("pointerdown", () => {
        if (!person.isJumping) {
            person.isJumping = true;
            circleList[1].texture = blackCircleTexture;
            jumpHighLimited = 306;
            frontAnimation();
            person.isFrontJumping = true;
        }
    });
    // Circle 1
    circleList[0].on("pointerdown", () => {
        if (!person.isJumping) {
            person.isJumping = true;
            circleList[0].texture = blackCircleTexture;
            leftSideAnimation();
            person.isLeftJumping = true;
        }
    });

    // All circles
    circleList.forEach(circle => {
        circle.on("pointerdown", () => {
            setTimeout(() => {
                circle.texture = whiteCircleTexture;
            }, 100);
        });
    });
}
