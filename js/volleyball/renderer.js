// Render Introduce Screen
function renderIntroduceScreen() {
    
    // Render intro background
    introBackground = newSprite(
        id["intro-background.png"],
        backgroundScreen,
        1,
        LOGICAL_WIDTH,
        LOGICAL_HEIGHT,
        0,
        0,
        0,
        0
    );

    // Banner
    banner = newSprite(id["intro-3.png"], backgroundScreen, 0.5, undefined, undefined, 0.5, 0.5, 120, 65);

    // Add start button
    startBar = new Graphics();
    startBar.beginFill(0x000000, 0.8);
    startBar.drawRect(0, 0, 240, 35);
    startBar.y = 185;
    startBar.endFill();
    backgroundScreen.addChild(startBar);
    setInteractive(startBar, true);

    
    // Next btn
    nextBtn = new Text("Quẩy lên nào...",{
        fill: 0xffffff,
        fontSize: 80,
        fontWeight: "bold"
    })
    nextBtn.scale.set(0.25);
    nextBtn.x = backgroundScreen.width / 2 - nextBtn.width / 2;
    nextBtn.y = 5;
    nextBtn.y = backgroundScreen.height / 2 + 70;
    backgroundScreen.addChild(nextBtn);


    // Tutorial Background
    tutorialBackground = newSprite(id["game-background.png"], backgroundScreen, 0, 240, 240, 0, 0, 0, 0, false);

    // Cover Board
    coverBoard = new Graphics();
    coverBoard.beginFill(0xffffff, 0.8);
    coverBoard.drawRect(0, 0, 200, 155);
    coverBoard.x = 20;
    coverBoard.y = 44;
    backgroundScreen.addChild(coverBoard);
    coverBoard.visible = false;

    // Big board
    bigBoard = newSprite(id["big-board.png"], backgroundScreen, 0, 208, 166, 0.5, 0.5, 120, 120, false);

    // Tutorial text
    tutorialText = newSprite(
        id["tutorial-text.png"],
        backgroundScreen,
        0.16,
        undefined,
        undefined,
        0.5,
        0.5,
        120,
        bigBoard.y,
        false
    );

    // Title
    title = newSprite(
        id["title-text.png"],
        backgroundScreen,
        0.25,
        undefined,
        undefined,
        0.5,
        0.5,
        120,
        (bigBoard.y - bigBoard.height / 2) / 2,
        false
    );

    // Start btn
    startBtn = newSprite(
        id["start-btn-2.png"],
        backgroundScreen,
        0.25,
        undefined,
        undefined,
        0.5,
        0.5,
        120,
        224,
        false
    );
    setInteractive(startBtn, true);
    startBtn.blink = 1;
}

// Render Game Screen
function renderGameScreen() {
    
    // Game Background
    gameBackground = newSprite(id["game-background.png"], gameScreen, 1, LOGICAL_WIDTH, LOGICAL_HEIGHT, 0, 0, 0, 0);


    // time = new Text("Time :" , {
    //     fill: 0xffffff,
    //     fontSize: 55,
    //     fontWeight: "bold"
    // })
    // time.scale.set(0.25);
    // time.x = (gameScreen.width - 70);
    // time.y = 5;

    // textTime = new Text(runTime , {
    //     fill: 0xffffff,
    //     fontSize: 55,
    //     fontWeight: "bold"
    // })
    // textTime.scale.set(0.25);
    // textTime.x = (gameScreen.width - 25);
    // textTime.y = 5;


    // Score
    scoreText = new Text("score: ", {
        fill: 0xffffff,
        fontSize: 55,
        fontWeight: "bold"
    });
    scoreText.scale.set(0.25);
    scoreText.x = 5;
    scoreText.y = 5;
    gameScreen.addChild(scoreText);

    scoreNumText = new Text("0", {
        fill: 0xffffff,
        fontSize: 55,
        fontWeight: "bold"
    });
    scoreNumText.scale.set(0.25);
    scoreNumText.x = scoreText.x + scoreText.width + 5;
    scoreNumText.y = scoreText.y;
    gameScreen.addChild(scoreNumText);
    // Circles
    blackCircleTexture = Texture.fromImage("circle-black.png");
    whiteCircleTexture = Texture.fromImage("circle-white.png");
    for (let i = 0; i < 3; i++) {
        let circle = new Sprite(whiteCircleTexture);
        circle.scale.set(0.2);
        circle.anchor.set(0.5);
        circle.buttonMode = true;
        circle.interactive = true;
        circle.position.set(40 + 80 * i, 170 - (i % 2) * 20);
        circleList.push(circle);
        let circleNum = new Text(`${i + 1}`, numStyle);
        circleNum.scale.set(0.25);
        circleNum.anchor.set(0.5);
        circleNum.position.set(circle.x, circle.y);
        circleNumList.push(circleNum);
        gameScreen.addChild(circle, circleNum);
    }

    // Person
    frontAnimateTextures = getTextures(2, "front");
    rightAnimateTextures = getTextures(2, "right");
    leftAnimateTextures = getTextures(2, "left");

    person = new MovieClip(frontAnimateTextures);
    person.scale.set(0.5);
    person.anchor.set(0);
    setupPerson();

    gameScreen.addChild(person);

    personPath = [16, 8, 50, 8, 60, 39, 50, 63, 18, 63, 5, 38];
    person.left = person.x + personPath[0];
    person.right = person.x + personPath[3];
    personShape = new Graphics();
    personShape.beginFill(0x000000);
    personShape.drawPolygon(personPath);
    personShape.endFill();
    personShape.alpha = 0;
    gameScreen.addChild(personShape);

    for (let i = 0; i < personPath.length / 2; i++) {
        let vector = new V(personPath[i * 2], personPath[i * 2 + 1]);
        personPathSAT.push(vector);
    }
    personSAT = new P(new V(), personPathSAT);
    // Ball
 
    ball = new PIXI.Sprite(PIXI.loader.resources[arrAvatar[Math.floor(Math.random()*arrAvatar.length)]].texture);   
    ball.width = 43;
    ball.height = 43;
    ball.anchor.set(0.5);
    gameScreen.addChild(ball);
    ball.animationSpeed = 0.2;
    // ball.gotoAndPlay(0);
    ball.radius = 22;
    setupBall();

    ballShape = new Graphics();
    ballShape.beginFill(0x000000);
    ballShape.drawCircle(0, 0, 22);
    ballShape.x = ball.x;
    ballShape.y = ball.y;
    ballShape.endFill();
    ballShape.alpha = 0;
    gameScreen.addChild(ballShape);

    ballSAT = new SAT.Circle(new SAT.Vector(), 22);
}

// Render result screen
function renderResultScreen() {
    
    // Result Background
    resultBackground = newSprite(id["game-background.png"], resultScreen, 0, 240, 240, 0, 0, 0, 0);

    // White layout
    whiteLayout = new Graphics();
    whiteLayout.beginFill(0xffffff);
    whiteLayout.drawRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
    whiteLayout.alpha = 0.3;
    whiteLayout.endFill();
    resultScreen.addChild(whiteLayout);

    // Result text
    resultText = newSprite(id["endtext2.png"], resultScreen, 0.25, undefined, undefined, 0.5, 0.5, 120, 35);

    // Box content result
    resultBox = newSprite(id["box.png"], resultScreen, 0.24, undefined, undefined, 0.5, 0.5, 120, 113);

    // Total Score Text
    scoreText = newSprite(
        new Texture.fromImage("../../images/volleyball/score-text.png"),
        resultScreen,
        0.25,
        undefined,
        undefined,
        0,
        0.5,
        resultBox.x - resultBox.width / 2 + 15,
        resultBox.y
    );

    // Total score
    totalScoreText = new Text("5000", { fontStyle: "bold", fontSize: 106 });
    totalScoreText.scale.set(0.25);
    totalScoreText.anchor.set(1, 0.5);
    totalScoreText.x = resultBox.x + resultBox.width / 2 - 15;
    totalScoreText.y = scoreText.y;
    resultScreen.addChild(totalScoreText);

    // Restart Text
    restartText = newSprite(id["reset-text.png"], resultScreen, 0.25, undefined, undefined, 0.5, 0.5, 120, 210);
    restartText.blink = 1;
    setInteractive(restartText, true);
}
