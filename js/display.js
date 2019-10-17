// Add default screen
function addDefaultScreen() {
    dfContainer = new Container();
    app.stage.addChild(dfContainer);

    bgDefault = new Sprite(id["bg_def.png"]);
    bgDefault.position.set(0, 0);
    dfContainer.addChild(bgDefault);

    blackRect = new Graphics();
    blackRect.beginFill(0x000000);
    blackRect.drawRect(0, 380, 480, 60);
    blackRect.endFill();
    blackRect.alpha = 0.7;
    blackRect.buttonMode = true;
    blackRect.interactive = true;
    dfContainer.addChild(blackRect);

    whiteStyle = new TextStyle({
        align: "right",
        fontSize: 60,
        dropShadowAngle: 0.4,
        dropShadowColor: "#408080",
        fill: "white",
        fontFamily: 'japanFont'
    });

    btnDefault = new Text(textJP.btnStart, whiteStyle);
    btnDefault.scale.x = 0.7;
    btnDefault.scale.y = 0.7;
    btnDefault.va = 1;
    btnDefault.position.set(480 / 2 - btnDefault.width / 2, 380 + blackRect.height / 2 - btnDefault.height / 2);
    dfContainer.addChild(btnDefault);
}
  
// Add intro screen
function addIntroScreen1() {
    introContainer1 = new Container();
    introContainer1.visible = false;
    app.stage.addChild(introContainer1);

    blackStyle = new TextStyle({
        align: "center",
        fontSize: 60,
        fill: "black",
        fontFamily: 'japanFont',
        fontWeight: "bolder"
    });

    bgIntro1 = new Sprite(id['bg_intro1.png']);
    introContainer1.addChild(bgIntro1);

    let titleStyle = new TextStyle({
        align: "center",
        fontSize: 55,
        stroke: '#ffffff',
        strokeThickness: 10,
        fill: 0xff6600,
        fontFamily: 'japanFont',
        fontWeight: "bolder"
    });

    titleIntro1 = new Text(textJP.tlIntro, titleStyle);
    titleIntro1.position.set(240 - titleIntro1.width / 2, 10);
    introContainer1.addChild(titleIntro1);

    whiteRect1 = new Graphics();
    whiteRect1.beginFill(0xFFFFFF);
    whiteRect1.drawRect(46, 92, 388, 296);
    whiteRect1.endFill();
    whiteRect1.alpha = 0.7;
    introContainer1.addChild(whiteRect1);

    frameIntro1 = new Sprite(id['body_intro1.png']);
    frameIntro1.y = titleIntro1.height + 5;
    frameIntro1.x = 240 - frameIntro1.width / 2;
    introContainer1.addChild(frameIntro1);

    bodyText = new Text(textJP.bodyIntro, blackStyle);
    bodyText.scale.set(0.53, 0.53);
    bodyText.position.set(frameIntro1.x + 20, frameIntro1.y + 20);
    bodyText.width = frameIntro1.width - 40;
    introContainer1.addChild(bodyText);

    btnIntro1 = new Text(textJP.btnStart, blackStyle);
    btnIntro1.scale.set(0.7, 0.7);
    btnIntro1.buttonMode = true;
    btnIntro1.interactive = true;
    btnIntro1.position.set(480 / 2 - btnIntro1.width / 2, 410);
    introContainer1.addChild(btnIntro1);
}
  
// Add Start Screen
function addStartScreen() {
    startContainer = new Container();
    startContainer.visible = false;
    app.stage.addChild(startContainer);

    bgIntro2 = new Sprite(id["bg_intro2.png"]);
    startContainer.addChild(bgIntro2);

    titleIntro2 = new Sprite(resources["images/title_intro2.png"].texture);
    titleIntro2.scale.set(0.5, 0.5);
    titleIntro2.position.set(60, 480 / 2 - titleIntro1.height / 2);
    titleIntro2.scale.x += 0.2;
    titleIntro2.scale.y += 0.2;
    startContainer.addChild(titleIntro2);

    startStyle = new TextStyle({
        align: "center",
        fontSize: 100,
        dropShadowAngle: 0.4,
        dropShadowColor: "#408080",
        fill: "black",
        fontFamily: 'japanFont',
        fontWeight: "bolder"
    });    

    weightText = new Text(weight, startStyle);
    weightText.scale.set(0.5, 0.5);
    weightText.position.set(100, 380);
    startContainer.addChild(weightText);

    weightChar = new Text(textJP.weight, startStyle);
    weightChar.scale.set(0.5, 0.5);
    weightChar.position.set(210 - weightChar.width/2 + weightText.width, 380);
    startContainer.addChild(weightChar);

    let scoreStyle = new TextStyle({
        align: "center",
        fontSize: 60,
        fill: "black",
        dropShadow: true,
        dropShadowAngle: 0.4,
        dropShadowColor: "#ffffff", 
        dropShadowDistance: 8,
        dropShadowAngle: Math.PI / 5,
        fontFamily: 'japanFont'
    });

    scoreText = new Text('SCORE', scoreStyle);
    scoreText.scale.set(0.55, 0.5);
    scoreText.position.set(10, 440);
    startContainer.addChild(scoreText);
    scoreMain = new Text(score, scoreStyle);
    scoreMain.scale.set(0.55, 0.5);
    scoreMain.position.set(240 - scoreMain.width/2, 440);
    startContainer.addChild(scoreMain);
}
  
// Add main screen
function addMainScreen() {
    mainContainer = new Container();
    mainContainer.buttonMode = true;
    mainContainer.interactive = true;
    mainContainer.visible = false;
    app.stage.addChild(mainContainer);

    bgMain = new Sprite(resources["images/bg_move1.png"].texture);
    mainContainer.addChild(bgMain);
    
    move = new Sprite(resources["images/move1.png"].texture);
    move.scale.x = 486/480;
    move.pivot.x = 3;
    move.vx = 2;
    mainContainer.addChild(move);  

    timeStyle = new TextStyle({
        align: "center",
        fontSize: 48,
        dropShadowAngle: 0.4,
        dropShadowColor: "#408080",
        fill: "yellow",
        fontFamily: 'japanFont',
        fontWeight: "bolder"
    });

    timeText = new Text("TIME", timeStyle);
    timeText.scale.set(0.5, 0.5);
    timeText.position.set(10, 7);
    mainContainer.addChild(timeText);

    timeBar = new Sprite(id["timebar.png"]);
    timeBar.wdefault = timeBar.width;
    timeBar.position.set(100, 10);
    mainContainer.addChild(timeBar);
    
    timeSub = 360 / (10*TIMEMOVE);

    weightBar = new Graphics();
    weightBar.beginFill(0x33ccff);
    weightBar.lineStyle(1, 0x0000ff, 1);
    weightBar.drawRect(424, 40, 20, 400);
    weightBar.endFill();
    mainContainer.addChild(weightBar);

    redBar = new Graphics();
    redBar.beginFill(0xff0000);
    redBar.drawRect(424, 40 + weightBar.height/2 - 10, 20, 20);
    redBar.endFill();
    mainContainer.addChild(redBar);

    run = new Sprite(id["run.png"]);
    run.position.set(424, 420);
    run.scale.x = 0.7;
    run.scale.y = 0.7;
    run.vy = 4;
    mainContainer.addChild(run);
}
  
// Add win screen
function addWinScreen() {
    winContainer = new Container();
    winContainer.visible = false;
    app.stage.addChild(winContainer);

    bgWin = new Sprite(id["bg_intro1.png"]);
    winContainer.addChild(bgWin);

    rest = new Sprite(resources["images/win.png"].texture);
    rest.position.set(120, 50);
    winContainer.addChild(rest);

    halo = new Sprite(resources["images/halo.png"].texture);
    halo.position.set(240, 240);
    halo.pivot.set(280, 280);
    winContainer.addChild(halo);

    styleClear = new TextStyle({
        fontFamily: 'japanFont',
        fontSize: 80,
        fill: "red",        
        dropShadow: true,
        dropShadowColor: "#99ff33",
        dropShadowDistance: 5,
        fontWeight: "bolder",
    });

    clearText = new Text("CLEAR !", styleClear);
    clearText.position.set(250 - clearText.width/2, 300);
    winContainer.addChild(clearText);
}
  
// Add fail screen
function addFailScreen() {
    failContainer = new Container();
    failContainer.visible = false;
    app.stage.addChild(failContainer);

    bgFail = new Sprite(id["fail.png"]);
    failContainer.addChild(bgFail);
}

// Add end screen
function addEndScreen() {
    endContainer = new Container();
    endContainer.visible = false;
    app.stage.addChild(endContainer);

    bgEnd = new Sprite(id["bg68.png"]);
    endContainer.addChild(bgEnd);

    let titleEndStyle = new TextStyle({
        align: "center",
        fontSize: 58,
        stroke: '#ffffff',
        strokeThickness: 10,
        fill: 0x3399ff,
        fontFamily: 'japanFont',
        fontWeight: "bolder"
    });

    titleResult = new Text(textJP.tlEnd, titleEndStyle);
    titleResult.position.set(480/2 - titleResult.width/2, 20);
    endContainer.addChild(titleResult);

    bodyResult = new Sprite(resources["images/bodyResult.png"].texture);
    bodyResult.scale.set(0.7, 0.7);
    bodyResult.position.set(480/2 - bodyResult.width/2, 160);
    endContainer.addChild(bodyResult);
    
    endStyle = new TextStyle({
        align: "center",
        fontSize: 120,
        dropShadowAngle: 0.4,
        dropShadowColor: "#408080",
        fill: "black",
        fontFamily: 'japanFont',
        fontWeight: "bolder"
    });

    textResult = new Text(textJP.bodyEnd, endStyle);
    textResult.scale.set(0.4, 0.4);
    textResult.position.set(bodyResult.x + 30, bodyResult.y + bodyResult.height/2 - textResult.height/2);
    endContainer.addChild(textResult);

    scoreResult = new Text(score, endStyle);
    scoreResult.scale.set(0.4, 0.4);
    scoreResult.position.set(430 - scoreResult.width, bodyResult.y + bodyResult.height / 2 - scoreResult.height / 2);
    endContainer.addChild(scoreResult);

    retry = new Text(textJP.btnEnd, endStyle);
    retry.scale.set(0.42, 0.42);
    retry.buttonMode = true;
    retry.interactive = true;
    retry.position.set(480 / 2 - retry.width / 2, 350);
    endContainer.addChild(retry);
}
