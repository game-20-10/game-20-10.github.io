let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}

const logicalWidth = 240;
const logicalHeight = 240;
let typeOfPlayer = 3;
let newWidth = 0;
let newHeight = 0;
let scaleFactor;
time = 0;
let timeInterval;
let app = new PIXI.Application({
    width: logicalWidth,
    height: logicalHeight,
    antialiasing: true,
    transparent: false,
    resolution: 4,
    autoResize: true,
});
document.body.appendChild(app.view);

resizeHandler();
window.addEventListener('resize', resizeHandler);

let Container = PIXI.Container,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Sprite = PIXI.Sprite;

gameScene = new Container();
app.stage.addChild(gameScene);
app.ticker.add(delta => gameLoop(delta));

PIXI.loader
    .add(player)
<<<<<<< HEAD
<<<<<<< HEAD
    .add(playerType2)
    .add(playerType3)
    .add(playerType4)
=======
>>>>>>> feature/chungvh/brid
=======
    .add(playerType2)
    .add(playerType3)
    .add(playerType4)
>>>>>>> develop
    .add(capguyFrames)
    .add(cpuType1Url)
    .add(cpuType2Url)
    .add(cpuType3Url)
    .add(cpuType4Url)
    .add(cpuType5Url)
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> develop
    .add(cpuType1R1Url)
    .add(cpuType1R2Url)
    .add(cpuType1R3Url)
    .add(cpuType1R4Url)
<<<<<<< HEAD
=======
    .add(cpuType1R5Url)
    .add(cpuType1R6Url)
    .add(cpuType1R7Url)
    .add(cpuType1R8Url)
    .add(cpuType1R9Url)
    .add(cpuType1R10Url)
>>>>>>> develop
    .add(cpuType2R1Url)
    .add(cpuType2R2Url)
    .add(cpuType2R3Url)
    .add(cpuType2R4Url)
<<<<<<< HEAD
=======
    .add(cpuType2R5Url)
    .add(cpuType2R6Url)
    .add(cpuType2R7Url)
    .add(cpuType2R8Url)
    .add(cpuType2R9Url)
    .add(cpuType2R10Url)
>>>>>>> develop
    .add(cpuType3R1Url)
    .add(cpuType3R2Url)
    .add(cpuType3R3Url)
    .add(cpuType3R4Url)
<<<<<<< HEAD
=======
    .add(cpuType3R5Url)
    .add(cpuType3R6Url)
    .add(cpuType3R7Url)
    .add(cpuType3R8Url)
    .add(cpuType3R9Url)
    .add(cpuType3R10Url)
>>>>>>> develop
    .add(cpuType4R1Url)
    .add(cpuType4R2Url)
    .add(cpuType4R3Url)
    .add(cpuType4R4Url)
<<<<<<< HEAD
=======
>>>>>>> feature/chungvh/brid
=======
    .add(cpuType4R5Url)
    .add(cpuType4R6Url)
    .add(cpuType4R7Url)
    .add(cpuType4R8Url)
    .add(cpuType4R9Url)
    .add(cpuType4R10Url)
    .add(cpuType5R1Url)
    .add(cpuType5R2Url)
    .add(cpuType5R3Url)
    .add(cpuType5R4Url)
    .add(cpuType5R5Url)
    .add(cpuType5R6Url)
    .add(cpuType5R7Url)
    .add(cpuType5R8Url)
    .add(cpuType5R9Url)
    .add(cpuType5R10Url)
>>>>>>> develop
    .load(defautScreen);

function defautScreen() {
    let background = Sprite.fromImage(backgroundUrl);
    background.width = 240;
    background.height = 240;

    // let logo = Sprite.fromImage(logoUrl);
    // logo.width = 235;
    // logo.height = 118;
    // logo.x = background.width / 2 - logo.width / 2;
    // logo.y = 0;

    gameScene.addChild(background);
    let buttonStart = addGraphic(0x000000, 0.8, 0, 0, 240, 35);
    buttonStart.y = 187;
    buttonStart.buttonMode = true;
    buttonStart.interactive = true;

    buttonStartText = new Text(startButton, {
        fontWeight: 'bold',
        fill: 0xffffff,
        fontSize: 18,
        fontFamily: fontFamily_1
    });
    buttonStartText.x = buttonStart.width / 2 - buttonStartText.width / 2;
    buttonStartText.y = buttonStart.height / 2 - buttonStartText.height / 2;
    buttonStart.addChild(buttonStartText);
    buttonStart.on('pointerdown', function () {
        clear();
<<<<<<< HEAD
        // mainScreen();
        chooseTypeOfSprite();
    });
}
<<<<<<< HEAD
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
=======
>>>>>>> feature/chungvh/brid

function chooseTypeOfSprite () {
    let chooseSpriteScreen = new Container();
    // let rectangle = new Graphics();
    // rectangle.lineStyle(4, 0xFF3300, 1);
    // rectangle.beginFill(0xFFFFFF);
    // rectangle.drawRect(100, 450, 64, 64);
    // rectangle.endFill();
    // rectangle.buttonMode = true;
    // rectangle.interactive = true;
    // rectangle.on('pointerdown', function () {
    //     clear();
    //     typeOfPlayer = 1;
    //     mainScreen();
    // });

    // let rectangle_2 = new Graphics();
    // rectangle_2.lineStyle(4, 0xFF3300, 1);
    // rectangle_2.beginFill(0xFFFFFF);
    // rectangle_2.drawRect(400, 450, 64, 64);
    // rectangle_2.endFill();
    // rectangle_2.buttonMode = true;
    // rectangle_2.interactive = true;
    // rectangle_2.on('pointerdown', function () {
    //     clear();
    //     typeOfPlayer = 2;
    //     mainScreen();
    // });

    // let rectangle_3 = new Graphics();
    // rectangle_3.lineStyle(4, 0xFF3300, 1);
    // rectangle_3.beginFill(0xFFFFFF);
    // rectangle_3.drawRect(700, 450, 64, 64);
    // rectangle_3.endFill();
    // rectangle_3.buttonMode = true;
    // rectangle_3.interactive = true;
    // rectangle_3.on('pointerdown', function () {
    //     clear();
    //     typeOfPlayer = 3;
    //     mainScreen();
    // });

    // let rectangle_4 = new Graphics();
    // rectangle_4.lineStyle(4, 0xFF3300, 1);
    // rectangle_4.beginFill(0xFFFFFF);
    // rectangle_4.drawRect(1000, 450, 64, 64);
    // rectangle_4.endFill();
    // rectangle_4.buttonMode = true;
    // rectangle_4.interactive = true;
    // rectangle_4.on('pointerdown', function () {
    //     clear();
    //     typeOfPlayer = 1;
    //     mainScreen();
    // });
<<<<<<< HEAD
    let chooseTeamTitle = new Text("Chọn Nhân Vật", {
        fontWeight: 'bold',
        fill: 0xffffff,
        fontSize: 18,
        fontFamily: fontFamily_1
    });
    chooseTeamTitle.x = 50
    chooseTeamTitle.y = 20;
    gameScene.addChild(chooseTeamTitle);

    let option_1 = Sprite.fromImage(options[0]);
    option_1.x = 40;
=======

    let option_1 = Sprite.fromImage(options[0]);
    option_1.x = 20;
>>>>>>> feature/chungvh/brid
    option_1.y = 70;
    option_1.scale.x = 0.25;
    option_1.scale.y = 0.25;
    option_1.interactive = true;
    option_1.on('pointerdown', function () {
        clear();
        typeOfPlayer = 1;
        timeInterval = setInterval(() => {
            time ++;
<<<<<<< HEAD
            // console.log(time);
=======
            console.log(time);
>>>>>>> feature/chungvh/brid
        }, 1000);
        mainScreen();
    });
    let option_2 = Sprite.fromImage(options[1]);
<<<<<<< HEAD
    option_2.x = 100;
=======
    option_2.x = 80;
>>>>>>> feature/chungvh/brid
    option_2.y = 70;
    option_2.scale.x = 0.25;
    option_2.scale.y = 0.25;
    option_2.interactive = true;
    option_2.on('pointerdown', function () {
        clear();
        typeOfPlayer = 2;
        mainScreen();
    });
    let option_3 = Sprite.fromImage(options[2]);
<<<<<<< HEAD
    option_3.x = 160;
=======
    option_3.x = 140;
>>>>>>> feature/chungvh/brid
    option_3.y = 70;
    option_3.scale.x = 0.25;
    option_3.scale.y = 0.25;
    option_3.interactive = true;
    option_3.on('pointerdown', function () {
        clear();
        typeOfPlayer = 3;
        mainScreen();
    });

    let option_4 = Sprite.fromImage(options[3]);
<<<<<<< HEAD
    option_4.x = 40;
    option_4.y = 120;
=======
    option_4.x = 200;
    option_4.y = 70;
>>>>>>> feature/chungvh/brid
    option_4.scale.x = 0.25;
    option_4.scale.y = 0.25;
    option_4.interactive = true;
    option_4.on('pointerdown', function () {
        clear();
<<<<<<< HEAD
        typeOfPlayer = 4;
        mainScreen();
    });
    let option_5 = Sprite.fromImage(options[3]);
    option_5.x = 100;
    option_5.y = 120;
    option_5.scale.x = 0.25;
    option_5.scale.y = 0.25;
    option_5.interactive = true;
    option_5.on('pointerdown', function () {
        clear();
        typeOfPlayer = 5;
        mainScreen();
    });
    let option_6 = Sprite.fromImage(options[3]);
    option_6.x = 160;
    option_6.y = 120;
    option_6.scale.x = 0.25;
    option_6.scale.y = 0.25;
    option_6.interactive = true;
    option_6.on('pointerdown', function () {
        clear();
        typeOfPlayer = 6;
        mainScreen();
    });
    let option_7 = Sprite.fromImage(options[3]);
    option_7.x = 40;
    option_7.y = 170;
    option_7.scale.x = 0.25;
    option_7.scale.y = 0.25;
    option_7.interactive = true;
    option_7.on('pointerdown', function () {
        clear();
        typeOfPlayer = 7;
        mainScreen();
    });
    let option_8 = Sprite.fromImage(options[3]);
    option_8.x = 100;
    option_8.y = 170;
    option_8.scale.x = 0.25;
    option_8.scale.y = 0.25;
    option_8.interactive = true;
    option_8.on('pointerdown', function () {
        clear();
        typeOfPlayer = 8;
        mainScreen();
    });
    let option_9 = Sprite.fromImage(options[3]);
    option_9.x = 160;
    option_9.y = 170;
    option_9.scale.x = 0.25;
    option_9.scale.y = 0.25;
    option_9.interactive = true;
    option_9.on('pointerdown', function () {
        clear();
        typeOfPlayer = 9;
=======
        typeOfPlayer = 1;
>>>>>>> feature/chungvh/brid
        mainScreen();
    });

    let background = Sprite.fromImage(backgroundUrl);
    // let background = Sprite.fromImage(backgroundTopUrl);
    background.width = 240;
    background.height = 240;
<<<<<<< HEAD
    background.alpha = 0.3;
=======
    background.alpha = 0.5;
>>>>>>> feature/chungvh/brid
    // background.addChild(rectangle);
    // background.addChild(rectangle_2);
    // background.addChild(rectangle_3);
    // background.addChild(rectangle_4);

    
    // background.alpha = 0.5;

    gameScene.addChild(background);
    gameScene.addChild(option_1);
    gameScene.addChild(option_2);
    gameScene.addChild(option_3);
    gameScene.addChild(option_4);
<<<<<<< HEAD
    gameScene.addChild(option_5);
    gameScene.addChild(option_6);
    gameScene.addChild(option_7);
    gameScene.addChild(option_8);
    gameScene.addChild(option_9);
=======
>>>>>>> feature/chungvh/brid
=======
        mainScreen();
    });
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
>>>>>>> develop
}

function mainScreen() {
    lastRunner = 0;
    isWin = false;
    isGameOver = false;
    speed = 0.05;
    level = 1;
    point = 0;
    runnerArray = [];
    runnerWithRound = [];
    runnerWithRound = [...runnerOfLevel[level]];
    // Background non animation
    let backgroundTop = Sprite.fromImage(backgroundTopUrl);
    backgroundTop.width = 240;
    backgroundTop.height = 240;
    gameScene.addChild(backgroundTop);

    // Background animation
    backgroundAnimation = PIXI.extras.AnimatedSprite.fromFrames(capguyFrames);
    backgroundAnimation.animationSpeed = speed;
    backgroundAnimation.play();
    gameScene.addChild(backgroundAnimation);
    backgroundAnimation.width = 240;
    backgroundAnimation.height = 120;
    backgroundAnimation.y = 91;

    levelText = new Text("Level " + level, {
        fontSize: 25,
        fill: 0xFF0000,
        fontWeight: 'bold',
        fontFamily: fontFamily_2
    });

    levelText.y = 35;
    levelText.x = 240;

    gameScene.addChild(levelText);

    playContainer = new PIXI.DisplayObjectContainer();
    gameScene.addChild(playContainer);
    // Function to sort to show cpu on screen
    playContainer.updateLayersOrder = function () {
        playContainer.children.sort(function (a, b) {
            a.zIndex = a.zIndex || 0;
            b.zIndex = b.zIndex || 0;
            return b.zIndex - a.zIndex
        });
    };
<<<<<<< HEAD
    // change image
    switch (typeOfPlayer) {
        case 1: 
            // Player animation
            playerAnimation = PIXI.extras.AnimatedSprite.fromFrames(player);
            break;
        case 2:
            // playerType2
            playerAnimation = PIXI.extras.AnimatedSprite.fromFrames(playerType2);
            break; 
        case 3:
            // playerType3
            playerAnimation = PIXI.extras.AnimatedSprite.fromFrames(playerType3);
            break; 
<<<<<<< HEAD
        case 4:
            // playerType3
            playerAnimation = PIXI.extras.AnimatedSprite.fromFrames(playerType4);
            break; 
        case 5:
            // playerType3
            playerAnimation = PIXI.extras.AnimatedSprite.fromFrames(playerType3);
            break; 
        case 6:
            // playerType3
            playerAnimation = PIXI.extras.AnimatedSprite.fromFrames(playerType3);
            break; 
        case 7:
            // playerType3
            playerAnimation = PIXI.extras.AnimatedSprite.fromFrames(playerType3);
            break; 
        case 8:
            // playerType3
            playerAnimation = PIXI.extras.AnimatedSprite.fromFrames(playerType3);
            break; 
        case 9:
            // playerType3
            playerAnimation = PIXI.extras.AnimatedSprite.fromFrames(playerType3);
            break; 
=======
>>>>>>> feature/chungvh/brid
    }
    
=======

    playerAnimation = PIXI.extras.AnimatedSprite.fromFrames(player);
>>>>>>> develop
    playerAnimation.animationSpeed = speed;
    playerAnimation.width = 62;
    playerAnimation.height = 122;
    playerAnimation.x = 120 - playerAnimation.width / 2;
    playerAnimation.y = 240 - playerAnimation.height + 25;
    countRunner = 1;
    playerAnimation.zIndex = countRunner;
    countRunner++;
    playerAnimation.play();
    playContainer.addChild(playerAnimation);

    leftButton = addGraphic(0, 0, 0, 0, 115, 240);
    leftButton.y = 240 - leftButton.height;
    leftButton.buttonMode = true;
    leftButton.interactive = true;

    rightButton = addGraphic(0, 0, 0, 0, 115, 240);
    rightButton.x = 240 - rightButton.width;
    rightButton.y = 240 - leftButton.height;
    rightButton.buttonMode = true;
    rightButton.interactive = true;

    gameScene.addChild(leftButton, rightButton);
    let leftPosition = (120 - playerAnimation.width / 2) - 70;
    let rightPosition = (120 - playerAnimation.width / 2) + 70;
    leftButton.on('pointerdown', function () {
        if (playerAnimation.x > leftPosition) {
            playerAnimation.x -= 70;
        }
    });

    rightButton.on('pointerdown', function () {
        if (playerAnimation.x < rightPosition) {
            playerAnimation.x += 70;
        }
    });
    let step = 0;
    let totalRunnerLevel = 1;
    let first = true;
    passRunner = 1;
    playerAnimation.onFrameChange = function () {
        if (!isGameOver) {
            if (first) {
                cpuType1();
                totalRunnerLevel++;
                first = false;

            // If player run 5 step when call a new cpu
            } else if (step === 5) {
                if (level <= 10) {
                    if (runnerWithRound[totalRunnerLevel] === "type1") {
                        cpuType1();
                    } else if (runnerWithRound[totalRunnerLevel] === "type2") {
                        cpuType2();
                    } else if (runnerWithRound[totalRunnerLevel] === "type3") {
                        cpuType3();
                    } else if (runnerWithRound[totalRunnerLevel] === "type4") {
                        cpuType4();
                    } else if (runnerWithRound[totalRunnerLevel] === "type5") {
                        cpuType5();
                    }

                // If level > 30, when cpu will be random
                } else if (level <= 30) {
                    let randomCpu = Math.random();
                    if (0 <= randomCpu && randomCpu < 0.2) {
                        cpuType1();
                    } else if (0.2 <= randomCpu && randomCpu < 0.4) {
                        cpuType2();
                    } else if (0.4 <= randomCpu && randomCpu < 0.6) {
                        cpuType3();
                    } else if (0.6 <= randomCpu && randomCpu < 0.8) {
                        cpuType4();
                    } else if (0.8 <= randomCpu && randomCpu <= 1) {
                        cpuType5();
                    }
                }
                totalRunnerLevel++;
                if (totalRunnerLevel === 6) {
                    level++;
                    totalRunnerLevel = 0;
                    runnerWithRound = [];
                    if (level <= 10) {
                        runnerWithRound = [...runnerOfLevel[level]];
                    }
                    if (level === 31) {
                        isWin = true;
                    }
                }
                step = 0;
            }

            // If level up when push speed and update all current cpu, background, player on screen
            if (passRunner === 6) {
                passRunner = 0;
                levelUp = true;
                speed += 0.0015;
                backgroundAnimation.animationSpeed = speed;
                playerAnimation.animationSpeed = speed;
                runnerArray[runnerArray.length - 1].animationSpeed = speed;
                runnerArray[runnerArray.length - 2].animationSpeed = speed;
                runnerArray[runnerArray.length - 3].animationSpeed = speed;
            }
            step++;
        }
    }


    let score = new Text(scoreText, {
        fontWeight: 'bold',
        fill: 0xffffff,
        fontSize: 18,
        stroke: "#a2271a",
        strokeThickness: 2
    });
    score.x = 120 - score.width / 2;
    score.y = -2;

    scoreValue = new Text(0, {
        fontWeight: 'bold',
        fill: "#a2271a",
        fontSize: 14,
        stroke: 0xffffff,
        strokeThickness: 2,
        align: 'center'
    });

    start = Sprite.fromImage(btartUrl);
    start.width = 240;
    start.height = 40;
    start.skew.x = -1.9;
    start.anchor.y = 0.5;
    start.x = 120 - start.width / 2;
    start.y = 90;
    gameScene.addChild(score, scoreValue);
    setTimeout(function () {
        gameScene.addChild(start);
        readyStart = true;
    }, 300);
}

function resultScreen() {
<<<<<<< HEAD
    setCookieFail(point);
=======
>>>>>>> feature/chungvh/brid
    let backgroundTop = Sprite.fromImage(resultBackgroundTopUrl);
    backgroundTop.width = 240;
    backgroundTop.height = 240;

    let backgroundBottom = Sprite.fromImage(resultBackgroundBottomUrl);
    backgroundBottom.width = 240;
    backgroundBottom.height = 120;
    backgroundBottom.y = 91;

    let subBackground = addGraphic(0xFFFFFF, 0.5, 0, 0, 240, 240);
    gameScene.addChild(backgroundTop, backgroundBottom, subBackground);
    
    let title = Sprite.fromImage(resultTitleImageUrl);
    title.width = 180;
    title.height = 30;
    title.x = subBackground.width / 2 - title.width / 2;
    title.y = 20;
    // subBackground.addChild(title);

    let scoreContainer = Sprite.fromImage(resultBoxImageUrl);
    scoreContainer.width = 230;
    scoreContainer.height = 70;
    scoreContainer.x = subBackground.width / 2 - scoreContainer.width / 2;
    scoreContainer.y = 80;
    subBackground.addChild(scoreContainer);

    let score = new Text(scoreTextJapanese, {
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: fontFamily_1
    });
    score.y = scoreContainer.y + (scoreContainer.height / 2 - score.height / 2);
    score.x = 20;

    let scoreResult = new Text(point, {
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: fontFamily_1
    });

    scoreResult.x = 240 - scoreResult.width - 20;
    scoreResult.y = scoreContainer.y + (scoreContainer.height / 2 - scoreResult.height / 2);
    subBackground.addChild(score, scoreResult);

    let button = addGraphic(0, 0, 0, 0, 240, 25);
    button.x = 120 - button.width / 2;
    button.y = 240 - button.height - 5;
    gameScene.addChild(button);

    button.interactive = true;
    button.buttonMode = true;
    // Go to Main Screen when touch
    button.on('pointerdown', function () {
        clear();
        mainScreen();
    });

    let buttonText = new Text(restartButton, {
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: fontFamily_1
    });
    buttonText.x = button.width / 2 - buttonText.width / 2;
    buttonText.y = button.height / 2 - buttonText.height / 2;
    button.addChild(buttonText);

    setInterval(function () {
        buttonText.visible = buttonText.visible ? false : true;
    }, 700);
}

function gameLoop(delta) {
    if (buttonStartText) {
        buttonStartText.alpha -= buttonStartText.alpha >= 0 ? 0.01 : -1;
    }

    if (scoreValue) {
        scoreValue.text = point;
        scoreValue.x = 240 - scoreValue.width - 3;
    }

    if (readyStart && start && start.width > 150) {
        start.width -= 10;
        start.x = 120 - start.width / 2;
    }

    if (readyStart && start && start.skew.x < 0) {
        start.skew.x += 0.1;
    } else if (readyStart && start) {
        start.skew.x = 0;
        readyStart = false;
        zoomStart();
    }

    if (isGameOver && runnerArray) {
        runnerArray[runnerArray.length - 1].stop();
    }

    if (levelUp && level <= 30) {
        levelText.text = "Level " + level;
        if (levelText.x >= (0 - levelText.width)) {
            levelText.x -= 5.5;
        } else {
            levelText.x = 240;
            levelUp = false;
        }
    }
}
