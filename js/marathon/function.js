function resizeHandler() {
    const w = Math.max(window.innerWidth, document.documentElement.clientWidth);
    const h = Math.max(window.innerHeight, document.documentElement.clientHeight);

    scaleFactor = Math.min(
        w / logicalWidth,
        h / logicalHeight
    );

    newWidth = Math.ceil(logicalWidth * scaleFactor);
    newHeight = Math.ceil(logicalHeight * scaleFactor);
    
    // Add custom btn
    addCustomBtn(w, h, newWidth);
    
    app.renderer.resize(newWidth, newHeight);
    app.stage.scale.set(scaleFactor);
};

// color is background of graphics
// x is start point x
// y is start point y
// width is end point x
// height is end point y
// border is border radius
// parent is container cover this graphics
function addGraphic(color, opacity, x, y, width, height, border = 0, parent = gameScene) {
    let element = new Graphics();
    element.beginFill(color, opacity);
    element.drawRoundedRect(x, y, width, height, border);
    element.endFill();
    parent.addChild(element);
    return element;
}

function addGraphicLine(line_width, line_color, line_style, background, start_x, start_y, end_x, end_y, border_radius, main = gameScene) {
    let element = new Graphics();
    element.lineStyle(line_width, line_color, line_style);
    element.beginFill(background);
    element.drawRoundedRect(start_x, start_y, end_x, end_y, border_radius);
    element.endFill();
    main.addChild(element);
    return element;
}

// text is string to show
// options is style of text
// x is point x
// y is point y
// parent is container add text
function addText(text, options, x, y, parent = gameScene) {
    let textStyle = new PIXI.TextStyle(options);
    let element = new Text(text, textStyle);
    setPosition(element, x, y);
    if (options.align === 'right') {
        element.anchor.x = 1;
    }
    parent.addChild(element);
    return element;
}

// Delete all child item of gameScene
function clear() {
    gameScene.removeChildren();
}

function jumpUp(element) {
    let jumpUp = setInterval(function () {
        element.y -= element.y > 75 ? 3 : 0;
        if (element.y <= 75) {
            clearInterval(jumpUp);
            jumpDown(element);
        }
    }, 30);
}

function jumpDown(element) {
    let jumpDown = setInterval(function () {
        element.y += element.y < 93 ? 3 : 0;
        if (element.y >= 93) {
            clearInterval(jumpDown);
        }
    }, 30);
    setTimeout(function () {
        clear();
        setCookieFail(point);
        resultScreen();
    }, 1000);
}


function zoomStart() {
    start.height = 30;
    setTimeout(function () {
        start.height = 40;
        setTimeout(function () {
            let hideStart = setInterval(function () {
                start.skew.x += start.skew.x < 3.2 ? 0.1 : 0;
                start.width += start.width <= 300 ? 5 : 0;
                start.x = 120 - start.width / 2;
                start.height -= start.height >= 10 ? 5 : 0;
                if (start.width >= 300) {
                    start.visible = false;
                    clearInterval(hideStart);
                }
            }, 12)
        }, 1500)
    }, 50);
}

function gameOver() {
    let gameOver = Sprite.fromImage(gameOverUrl);
    gameOver.width = 220;
    gameOver.height = 35.5;
    gameOver.x = 120 - gameOver.width / 2;
    gameOver.y = 0;
    gameOver.zIndex = countRunner;
    playContainer.addChild(gameOver);
    playContainer.updateLayersOrder();
    let showGameOver = setInterval(function () {
        gameOver.y += gameOver.y < 93 ? 3 : 0;
        if (gameOver.y >= 93) {
            clearInterval(showGameOver);
            jumpUp(gameOver);
        }
    }, 15);
}

function cpuType1() {
    let a = randomInt(1, 10);
    let newCpu;
    switch (a) {
        case 1: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType1R1Url);
            break;
        
        case 2: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType1R2Url);
            break;
        
        case 3: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType1R3Url);
            break;
        
        case 4: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType1R4Url);
            break;

        case 5: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType1R5Url);
            break;

        case 6: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType1R6Url);
            break;

        case 7: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType1R7Url);
            break;

        case 8: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType1R8Url);
            break;

        case 9: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType1R9Url);
            break;

        case 10: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType1R10Url);
            break;
        
    }

    createCpu(newCpu);
    newCpu.type = "type1";
    newCpu.point = 10;
    let step = 1;
    let randomLane = "";
    let random = Math.random();
    if (0 <= random && random <= 0.33) {
        randomLane = "left";
    } else if (0.67 <= random && random <= 1) {
        randomLane = "right";
    }
    newCpu.onFrameChange = function () {
        if (!isGameOver) {
            step++;
            newCpu.x = 120 - newCpu.width / 2;
            cpuRunning(newCpu, step, randomLane);
        } else {
            newCpu.stop();
        }
    }
}

function cpuType2() {
    let a = randomInt(1, 10);
    let newCpu;
    switch (a) {
        case 1: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType2R1Url);
            break;
        
        case 2: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType2R2Url);
            break;
        
        case 3: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType2R3Url);
            break;
        
        case 4: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType2R4Url);
            break;
        case 5: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType2R5Url);
            break;

        case 6: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType2R6Url);
            break;

        case 7: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType2R7Url);
            break;

        case 8: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType2R8Url);
            break;

        case 9: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType2R9Url);
            break;

        case 10: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType2R10Url);
            break;
    }

    createCpu(newCpu);
    newCpu.point = 20;
    let step = 1;
    let randomLane = "";
    let random = Math.random();
    if (0 <= random && random <= 0.33) {
        randomLane = "left";
    } else if (0.67 <= random && random <= 1) {
        randomLane = "right";
    }
    newCpu.onFrameChange = function () {
        if (!isGameOver) {
            step++;
            newCpu.x = 120 - newCpu.width / 2;
            if (step === 6) {
                if (randomLane === "left" || randomLane === "right") {
                    randomLane = "";
                } else {
                    random = Math.random();
                    if (0 <= random && random <= 0.5) {
                        randomLane = "left";
                    } else {
                        randomLane = "right";
                    }
                }
            }
            cpuRunning(newCpu, step, randomLane);
        } else {
            newCpu.stop();
        }
    }
}

function cpuType3() {
    let a = randomInt(1, 10);

    let newCpu;
    switch (a) {
        case 1: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType3R1Url);
            break;
        
        case 2: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType3R2Url);
            break;
        
        case 3: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType3R3Url);
            break;
        
        case 4: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType3R4Url);
            break;
        case 5: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType3R5Url);
            break;

        case 6: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType3R6Url);
            break;

        case 7: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType3R7Url);
            break;

        case 8: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType3R8Url);
            break;

        case 9: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType3R9Url);
            break;

        case 10: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType3R10Url);
            break;
    }

    createCpu(newCpu);
    newCpu.point = 30;
    let step = 1;
    let randomLane = "";
    let random = Math.random();
    if (0 <= random && random <= 0.33) {
        randomLane = "left";
    } else if (0.67 <= random && random <= 1) {
        randomLane = "right";
    }
    newCpu.onFrameChange = function () {
        if (!isGameOver) {
            newCpu.x = 120 - newCpu.width / 2;
            step++;
            if (step === 8) {
                if (randomLane === "left" || randomLane === "right") {
                    randomLane = "";
                } else {
                    random = Math.random();
                    if (0 <= random && random <= 0.5) {
                        randomLane = "left";
                    } else {
                        randomLane = "right";
                    }
                }
            }
            cpuRunning(newCpu, step, randomLane);
        } else {
            newCpu.stop();
        }
    }
}

function cpuType4() {
    let a = randomInt(1, 10);

    let newCpu;
    switch (a) {
        case 1: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType4R1Url);
            break;
        
        case 2: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType4R2Url);
            break;
        
        case 3: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType4R3Url);
            break;
        
        case 4: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType4R4Url);
            break;
        case 5: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType4R5Url);
            break;

        case 6: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType4R6Url);
            break;

        case 7: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType4R7Url);
            break;

        case 8: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType4R8Url);
            break;

        case 9: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType4R9Url);
            break;

        case 10: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType4R10Url);
            break;
    }

    createCpu(newCpu);
    newCpu.point = 40;
    let step = 1;
    let randomLane = "";
    let random = Math.random();
    if (0 <= random && random <= 0.33) {
        randomLane = "left";
    } else if (0.67 <= random && random <= 1) {
        randomLane = "right";
    }
    newCpu.onFrameChange = function () {
        if (!isGameOver) {
            newCpu.x = 120 - newCpu.width / 2;
            step++;
            if (step === 7) {
                if (randomLane === "left" || randomLane === "right") {
                    randomLane = "";
                } else {
                    random = Math.random();
                    if (0 <= random && random <= 0.5) {
                        randomLane = "left";
                    } else {
                        randomLane = "right";
                    }
                }
            }
            cpuRunning(newCpu, step, randomLane);
        } else {
            newCpu.stop();
        }
    }
}

function cpuType5() {
    let a = randomInt(1, 10);
    let newCpu
    switch (a) {
        case 1: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType5R1Url);
            break;
        
        case 2: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType5R2Url);
            break;
        
        case 3: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType5R3Url);
            break;
        
        case 4: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType5R4Url);
            break;
        case 5: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType5R5Url);
            break;

        case 6: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType5R6Url);
            break;

        case 7: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType5R7Url);
            break;

        case 8: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType5R8Url);
            break;

        case 9: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType5R9Url);
            break;

        case 10: 
            newCpu = PIXI.extras.AnimatedSprite.fromFrames(cpuType5R10Url);
            break;
    }

    createCpu(newCpu);
    newCpu.point = 50;
    let step = 1;
    let randomLane = "";
    let random = Math.random();
    if (0 <= random && random <= 0.33) {
        randomLane = "left";
    } else if (0.67 <= random && random <= 1) {
        randomLane = "right";
    }
    newCpu.onFrameChange = function () {
        if (!isGameOver) {
            newCpu.x = 120 - newCpu.width / 2;
            step++;
            if (step === 5 || step === 6 || step === 7) {
                if (randomLane === "left" || randomLane === "right") {
                    randomLane = "";
                } else {
                    random = Math.random();
                    if (0 <= random && random <= 0.5) {
                        randomLane = "left";
                    } else {
                        randomLane = "right";
                    }
                }
            }
            cpuRunning(newCpu, step, randomLane);
        } else {
            newCpu.stop();
        }
    }
}

function createCpu(newCpu) {
    runnerArray.push(newCpu);
    newCpu.animationSpeed = speed;
    newCpu.play();
    playContainer.addChild(newCpu);
    newCpu.width = 62 / 13;
    newCpu.height = 122 / 13;
    newCpu.x = 120 - newCpu.width / 2;
    newCpu.y = 130;
    newCpu.zIndex = countRunner;
    countRunner++;
    playContainer.updateLayersOrder();
}

// Function to make cpu move
function cpuRunning(runner, step, lane) {
    if (time === 60) {
        isGameOver = true;
        runner.stop();
        playerAnimation.stop();
        backgroundAnimation.stop();
        playerAnimation.visible = false;

        let PlayerGameOver = Sprite.fromImage(player[0]);
        PlayerGameOver.width = 72;
        PlayerGameOver.height = 110;
        PlayerGameOver.x = playerAnimation.x;
        PlayerGameOver.y = playerAnimation.y + 15;
        playContainer.addChild(PlayerGameOver);

        let PlayerGameOverText = Sprite.fromImage(playerGameOverTextUrl);
        PlayerGameOverText.width = 60;
        PlayerGameOverText.height = 40;
        PlayerGameOverText.x = PlayerGameOver.x + PlayerGameOver.width + 5;
        PlayerGameOverText.y = PlayerGameOver.y - 25;
        playContainer.addChild(PlayerGameOverText);
    
        time = 0;
        clearInterval(timeInterval);
        gameOver();
    }
    switch (step) {
        case 2: {
            runner.width = 62 / 6.5;
            runner.height = 122 / 6.5;
            runner.y = 123;
            if (lane === "left") {
                runner.x -= 2;
            } else if (lane === "right") {
                runner.x += 2;
            }
            break;
        }
        case 3: {
            //runner.width = 62 / 3.25;
            //runner.height = 122 / 3.25;
            runner.width = 62 / 3;
            runner.height = 122 / 3;
            if (lane === "left") {
                runner.x -= 5;
            } else if (lane === "right") {
                runner.x += 5;
            }
            runner.y = 115;
            break;
        }
        case 4: {
            //runner.width = 62 / 2.5;
            //runner.height = 122 / 2.5;
            runner.width = 62 / 2.1;
            runner.height = 122 / 2.1;
            if (lane === "left") {
                runner.x -= 10;
            } else if (lane === "right") {
                runner.x += 10;
            }
            runner.y = 113;
            break;
        }
        case 5: {
            //runner.width = 62 / 2;
            //runner.height = 122 / 2;
            runner.width = 62 / 1.6;
            runner.height = 122 / 1.6;
            if (lane === "left") {
                runner.x -= 17;
            } else if (lane === "right") {
                runner.x += 17;
            }
            runner.y = 113;
            break;
        }
        case 6: {
            //runner.width = 62 / 1.6;
            //runner.height = 122 / 1.6;
            runner.width = 62 / 1.4;
            runner.height = 122 / 1.4;
            if (lane === "left") {
                runner.x -= 26;
            } else if (lane === "right") {
                runner.x += 26;
            }
            runner.y = 117;
            break;
        }
        case 7: {
            //runner.width = 62 / 1.3;
            //runner.height = 122 / 1.3;
            runner.width = 62 / 1.2;
            runner.height = 122 / 1.2;
            if (lane === "left") {
                runner.x -= 39;
            } else if (lane === "right") {
                runner.x += 39;
            }
            runner.y = 124;
            break;
        }
        case 8: {
            runner.width = 62 / 1.1;
            runner.height = 122 / 1.1;
            if (lane === "left") {
                runner.x -= 54;
            } else if (lane === "right") {
                runner.x += 54;
            }
            runner.y = 132;
            break;
        }
        case 9: {
            runner.width = 62;
            runner.height = 122;
            if (lane === "left") {
                runner.x -= 70;
            } else if (lane === "right") {
                runner.x += 70;
            }
            runner.y = 240 - runner.height + 25;
            if (Math.abs(runner.x - playerAnimation.x) <= 20) {
                isGameOver = true;
                runner.stop();
                playerAnimation.stop();
                backgroundAnimation.stop();
                playerAnimation.visible = false;

                let PlayerGameOver = Sprite.fromImage(playerGameOverUrl);
                PlayerGameOver.width = 72;
                PlayerGameOver.height = 110;
                PlayerGameOver.x = playerAnimation.x;
                PlayerGameOver.y = playerAnimation.y + 15;
                playContainer.addChild(PlayerGameOver);

                let PlayerGameOverIcon = Sprite.fromImage(playerGameOverIconUrl);
                PlayerGameOverIcon.x = PlayerGameOver.x + PlayerGameOver.width - 10;
                PlayerGameOverIcon.y = PlayerGameOver.y + 5;
                PlayerGameOverIcon.width = 50;
                PlayerGameOverIcon.height = 49;
                playContainer.addChild(PlayerGameOverIcon);

                let PlayerGameOverText = Sprite.fromImage(playerGameOverTextUrl);
                PlayerGameOverText.width = 60;
                PlayerGameOverText.height = 40;
                PlayerGameOverText.x = PlayerGameOver.x + PlayerGameOver.width + 5;
                PlayerGameOverText.y = PlayerGameOver.y - 25;
                playContainer.addChild(PlayerGameOverText);
            
                time = 0;
                clearInterval(timeInterval);
                gameOver();

            } else {
                point += runner.point;
                passRunner += 1;
            }
            break;
        }
        case 10: {
            if (level === 31 && isWin) {
                lastRunner++;
                
                if (lastRunner === 3) {
                    playerAnimation.stop();
                    backgroundAnimation.stop();
                    leftButton.interactive = false;
                    RightButton.interactive = false;
                    let winText = new Text(winText, {
                        fontFamily: fontFamily_2,
                        fontSize: 32,
                        fill: 0xFFFFFF,
                        stroke: 0x006699,
                        strokeThickness: 4,
                    });
                    winText.x = 240 / 2 - winText.width / 2;
                    playContainer.addChild(winText);
                    let showWin = setInterval(function () {
                        winText.y += winText.y < 93 ? 3 : 0;
                        if (winText.y >= 93) {
                            clearInterval(showWin);
                            jumpUp(winText);
                        }
                    }, 15);
                }
            }
            runner.visible = false;
            runner.stop();
            playContainer.removeChild(runner);
            break;
        }
    }
}

// Add button go to another screen
function addCustomBtn(w, h, newWidth) {
    if (navigator.userAgent.match(/iPad/i) && w > h) {
        if (!customBtn) {
            let canvas = document.querySelector("canvas");
            let imgHtml = `
            <a class='button' href='https://plala.s3-ap-northeast-1.amazonaws.com/web/hikari_game/index.html'><img src='./images/custombtn.png'/></a>
            `;
            canvas.insertAdjacentHTML("afterend", imgHtml);
            customBtn = document.querySelector(".button");
        } else {
            customBtn.style.visibility = "visible";
        }
        customBtn.style.left = `${(w - newWidth) / 2 + newWidth}px`;
        customBtn.style.width = `${(w - newWidth) / 2}px`;
    } else {
        if (customBtn) {
            customBtn.style.visibility = "hidden";
        }
    }
}
