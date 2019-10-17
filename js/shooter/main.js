// Variables
let GAME_TIME = 60;
let scoreText_2 = '00000';
let boomNum = 3;
let boomFlag = [false, false, false];
let background, background_2, beginBtn, gameScene, time, scoreText, scoreNumber, scoreTitle, customBtn;
let gameHappen, gameTimeDown, boom, isClick, ufo, item, gameEnd, posi, hit, miss, c, timeText;
let player, logo, startGraphic, timeNumber, startText, endText, playGameloop;
let ufo_blue_left_1, ufo_blue_left_2, ufo_blue_right_1, ufo_blue_right_2;
let ufo_yellow_left_1, ufo_yellow_left_2, ufo_yellow_right_1, ufo_yellow_right_2;
let ufo_red_left_1, ufo_red_left_2, ufo_red_right_1, ufo_red_right_2;
let clock_left_1, clock_left_2, clock_right_1, clock_right_2;
let boom_left_1, boom_left_2, boom_right_1, boom_right_2;
let boss_left_1, boss_left_2, boss_right_1, boss_right_2;
let rect_1, rect_2, rect_3, rect_4, rect_5, rect_6, rect_7, rect_8, rect_9;
let miss_1, miss_2, miss_3, miss_4, miss_5, miss_6, miss_7, miss_8, miss_9;
let hit_1, hit_2, hit_3, hit_4, hit_5, hit_6, hit_7, hit_8, hit_9;
let alpha = 0, ufoCount_1 = 0, ufoCount_2 = 0, ufoCount_3 = 0, ufoCount_4 = 0, timeInterval = 0, score = 0;
let ufoBlueLeft = [], ufoBlueRight = [], ufoYellowLeft = [], ufoYellowRight = [];
let ufoRedLeft = [], ufoRedRight = [], clockLeft = [], clockRight = []; 
let boomLeft = [], boomRight = [], bossLeft = [], bossRight = [];
let misss = [], hits = [], rect = [];
let count_1 = 0, count_2 = 0, count_3 = 0, count_4 = 0, count_5 = 0, count_6 = 0;
let introBg, introGraphic, introBtn, introTile;
let circle1, circle2, circle3, circle4, circle5, circle6, circle7, circle8, circle9;
let ufoCount = {
    ufoBlueLeft: 0,
    ufoBlueRight: 0,
    ufoYellowLeft: 0,
    ufoYellowRight: 0,
    ufoRedLeft: 0, 
    ufoRedRight: 0
};

// Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;
    TextMetrics = PIXI.TextMetrics; 

const logicalWidth = 480;
const logicalHeight = 480;

// Responsive 
function resizeHandler() {
    const w = Math.max(window.innerWidth, document.documentElement.clientWidth);
    const h = Math.max(window.innerHeight, document.documentElement.clientHeight);
    const scaleFactor = Math.min(
        w / logicalWidth,
        h / logicalHeight
    );
    const newWidth = Math.ceil(logicalWidth * scaleFactor);
    const newHeight = Math.ceil(logicalHeight * scaleFactor);

    // Add custom btn
    addCustomBtn(w, h, newWidth);

    app.renderer.resize(newWidth, newHeight);
    app.stage.scale.set(scaleFactor);
};

function addCustomBtn(w, h, newWidth) {
    if (navigator.userAgent.match(/iPad/i) && w > h) {
        if (!customBtn) {
            let canvas = document.querySelector("canvas");
            let imgHtml = `
            <a class='button' href='https://plala.s3-ap-northeast-1.amazonaws.com/web/hikari_game/index.html'><img src='./images/shooter/custombtn.png'/></a>
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

// Create pixi application
let app = new Application({
    width: logicalWidth,
    height: logicalHeight,
    antialiasing: false, 
    transparent: true, 
    resolution: 3,
    autoResize: true
});
document.body.appendChild(app.view);

loader
    .add("images/shooter/ufo_blue.png")
    .add("images/shooter/ufo_yellow.png")
    .add("images/shooter/ufo_red.png")
    .add("images/shooter/clock.png")
    .add("images/shooter/boom.png")
    .add("images/shooter/boss.png")
    .add("images/shooter/hit.png")
    .add("images/shooter/left_1.png")
    .add("images/shooter/left_2.png")
    .add("images/shooter/left_3.png")
    .add("images/shooter/left_4.png")
    .add("images/shooter/left_5.png")
    .add("images/shooter/right_1.png")
    .add("images/shooter/right_2.png")
    .add("images/shooter/right_3.png")
    .add("images/shooter/right_4.png")
    .add("images/shooter/right_5.png")
    .load(setup);

// Style for the text
let startButtonStyle = new PIXI.TextStyle({
    fontFamily: "japanFont",
    fontSize: 45,
    fill: "white",
    strokeThickness: 0,
});

let introButtonStyle = new PIXI.TextStyle({
    fontFamily: "japanFont",
    fontSize: 35,
    fill: "white",
    strokeThickness: 0,
});

let endTextStyle = new PIXI.TextStyle({
    fontFamily: "japanFont",
    fontSize: 45,
    fill: "black",
    strokeThickness: 0,
});

let endStyle = new PIXI.TextStyle({
    fontFamily: "japanFont",
    fontSize: 76,
    fill: "#454f5e",
    stroke: 'black',
    strokeThickness: 7,
    fontWeight: 900,
    letterSpacing: 10
});

let startStyle = new PIXI.TextStyle({
    fontFamily: "japanFont",
    fontSize: 36,
    fill: "#fc1a0a",
    stroke: '#a80a1d',
    strokeThickness: 7,
    fontWeight: 900,
    letterSpacing: 10
});

let resultStyle = new PIXI.TextStyle({
    fontFamily: "japanFont",
    fontSize: 35,
    fill: "black",
    strokeThickness: 0,
});

let resultTitleStyle = new PIXI.TextStyle({
    fontFamily: "japanFont",
    fontSize: 54,
    fill: "#3399FF",
    stroke: '#ffffff',
    strokeThickness: 7,
    fontWeight: 900,
    letterSpacing: 10
});

// Set position element
function setPosition(elm, x, y) {
    elm.x = x;
    elm.y = y;
};

// Function add new text
function addText(text, options, x, y, parent = gameScene) {
    let textStyle = new PIXI.TextStyle(options);
    let element = new Text(text, textStyle);
    setPosition(element, x, y);
    if (options.align === 'right') {
        element.anchor.x = 1;
    };
    parent.addChild(element);
    return element;
};

// Add image start screen
function addStartImage(url, x = 0, y = 0, opacity = 1, parent = gameStart) {
    let element = Sprite.fromImage(url);
    setPosition(element, x, y);
    if (opacity !== 1) {
      element.alpha = opacity;
    };
    parent.addChild(element);
    return element;
};

// Add image main screen
function addImage(url, x = 0, y = 0, opacity = 1, parent = gameScene) {
    let element = Sprite.fromImage(url);
    setPosition(element, x, y);
    if (opacity !== 1) {
        element.alpha = opacity;
    };
    parent.addChild(element);
    return element;
};

// Add graphic main screen
function addGraphic(color, opacity, x, y, width, height, parent = gameScene) {
    let element = new Graphics();
    element.beginFill(color, opacity);
    element.drawRect(x, y, width, height);
    element.endFill();
    parent.addChild(element);
    return element;
};

// Check collision between 2 elements 
function hitRect(r1, r2) {
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
    hit = false;
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;
    if (Math.abs(vx) < combinedHalfWidths) {
            if (Math.abs(vy) < combinedHalfHeights) {
                hit = true;
            } else {
                hit = false;
            };
    } else {
        hit = false;
    };
    return hit;
};

// Waiting for playing game
function waitingGame() {
    startText = new Text("Happy 20-10 <3", startStyle);
    startText.x = 400;
    startText.y = 210;
    gameScene.addChild(startText) ;
    let moveStartText = setInterval( function () {
        if (startText.x > 25) {
            startText.x -= 1.5;
        };
    }, 1);
    rect.forEach(function(rectNum, index) {
        rectNum.visible = false;
    });  
    setTimeout(function() {
        startText.visible = false;
        clearInterval(moveStartText);
        time.visible = true;
        timeText.visible = true;
        timeNumber.visible = true;
        scoreTitle.visible = true;
        scoreNumber.visible = true;
        rect.forEach(function(rectNum, index) {
            rectNum.visible = true;
        });
    }, 1800)
};

// Waiting the result
function waitingEndGame() {
    timeNumber.visible = false;
    ufoBlueLeft.forEach(function(item, index) {
        item.visible = false;
    });
    ufoBlueRight.forEach(function(item, index) {
        item.visible = false;
    });
    ufoYellowLeft.forEach(function(item, index) {
        item.visible = false;
    });
    ufoYellowRight.forEach(function(item, index) {
        item.visible = false;
    });
    ufoRedLeft.forEach(function(item, index) {
        item.visible = false;
    });
    ufoRedRight.forEach(function(item, index) {
        item.visible = false;
    });
    clockLeft.forEach(function(item, index) {
        item.visible = false;
    });
    clockRight.forEach(function(item, index) {
        item.visible = false;
    });
    boomLeft.forEach(function(item, index) {
        item.visible = false;
    });
    boomRight.forEach(function(item, index) {
        item.visible = false;
    });
    bossLeft.forEach(function(item, index) {
        item.visible = false;
    });
    bossRight.forEach(function(item, index) {
        item.visible = false;
    });
    rect.forEach(function(item, index) {
        item.buttonMode = false;
        item.interactive = false;
    });

    endText = new Text('Hết giờ òy...', startStyle);
    endText.x = 400;
    endText.y = 220;
    endText.buttonMode = true;
    endText.interactive = true;
    gameScene.addChild(endText);
    let moveEndText = setInterval( function () {
        if (endText.x > 68) {
            endText.x -= 1.5;
        };
    }, 1);
    endText.on('pointertap', function() {
        clearInterval(moveEndText);
        gameScene.visible = false;
        endText.visible = false;
        addResultScreen();
    });       
};

// Add main element
function addElement() {
    gameScene = new Container();
    app.stage.addChild(gameScene);
    gameScene.visible = false; 
    background_2 = addImage('images/shooter/start_screen.png');
    time = addImage('images/shooter/time_no_text.png');

    timeText = addText('TIME', {
        fontFamily: "japanFont",
        fontSize: 30,
        fontWeight: 900,
        fill: '#fadb52',
        stroke: '#000000',
        strokeThickness: 7,
        letterSpacing: -1
    }, 9, 28);

    timeNumber = addText(GAME_TIME, {
        fontSize: 50,
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 0,
    }, 110, 22);   
    scoreTitle = addText('SCORE', {
        fontFamily: "japanFont",
        fontSize: 40,
        fontWeight: 900,
        fill: '#fadb52',
        stroke: '#000000',
        strokeThickness: 10,
        letterSpacing: 3
    }, 310, 3);
    scoreTitle.height = 55;
    scoreNumber = addText(scoreText_2, {
        fontFamily: "japanFont",
        fontWeight: 900,
        fontSize: 40,
        fill: '#fadb52',
        stroke: '#000000',
        strokeThickness: 10,
        letterSpacing: 7
    }, 306, 42);
    scoreNumber.height = 55;
    time.visible = false;
    timeText.visible = false;
    timeNumber.visible = false;
    scoreTitle.visible = false;
    scoreNumber.visible = false;
};

// Add miss hit get to click
function addMissHitGet() {
    miss_1 = addImage('images/shooter/miss.png');
    miss_1.interactive = true;
    miss_1.buttonMode = true;
    miss_1.x = 50;
    miss_1.y = 75;
    miss_1.visible = false;
    misss.push(miss_1);
    miss_2 = addImage('images/shooter/miss.png');
    miss_2.interactive = true;
    miss_2.buttonMode = true;
    miss_2.x = 205;
    miss_2.y = 75;
    miss_2.visible = false;
    misss.push(miss_2);
    miss_3 = addImage('images/shooter/miss.png');
    miss_3.interactive = true;
    miss_3.buttonMode = true;
    miss_3.x = 365;
    miss_3.y = 75;
    miss_3.visible = false;
    misss.push(miss_3);
    miss_4 = addImage('images/shooter/miss.png');
    miss_4.interactive = true;
    miss_4.buttonMode = true;
    miss_4.x = 50;
    miss_4.y = 240;
    miss_4.visible = false;
    misss.push(miss_4);
    miss_5 = addImage('images/shooter/miss.png');
    miss_5.interactive = true;
    miss_5.buttonMode = true;
    miss_5.x = 205;
    miss_5.y = 240;
    miss_5.visible = false;
    misss.push(miss_5);
    miss_6 = addImage('images/shooter/miss.png');
    miss_6.interactive = true;
    miss_6.buttonMode = true;
    miss_6.x = 365;
    miss_6.y = 240;
    miss_6.visible = false;
    misss.push(miss_6);
    miss_7 = addImage('images/shooter/miss.png');
    miss_7.interactive = true;
    miss_7.buttonMode = true;
    miss_7.x = 50;
    miss_7.y = 402;
    miss_7.visible = false;
    misss.push(miss_7);
    miss_8 = addImage('images/shooter/miss.png');
    miss_8.interactive = true;
    miss_8.buttonMode = true;
    miss_8.x = 205;
    miss_8.y = 402;
    miss_8.visible = false;
    misss.push(miss_8);
    miss_9 = addImage('images/shooter/miss.png');
    miss_9.interactive = true;
    miss_9.buttonMode = true;
    miss_9.x = 365;
    miss_9.y = 402;
    miss_9.visible = false;
    misss.push(miss_9);

    hit_1 = addImage('images/shooter/hit.png');
    hit_1.interactive = true;
    hit_1.buttonMode = true;
    hit_1.x = 50;
    hit_1.y = 75;
    hit_1.visible = false;
    hits.push(hit_1);
    hit_2 = addImage('images/shooter/hit.png');
    hit_2.interactive = true;
    hit_2.buttonMode = true;
    hit_2.x = 205;
    hit_2.y = 75;
    hit_2.visible = false;
    hits.push(hit_2);
    hit_3 = addImage('images/shooter/hit.png');
    hit_3.interactive = true;
    hit_3.buttonMode = true;
    hit_3.x = 365;
    hit_3.y = 75;
    hit_3.visible = false;
    hits.push(hit_3);
    hit_4 = addImage('images/shooter/hit.png');
    hit_4.interactive = true;
    hit_4.buttonMode = true;
    hit_4.x = 50;
    hit_4.y = 240;
    hit_4.visible = false;
    hits.push(hit_4);
    hit_5 = addImage('images/shooter/hit.png');
    hit_5.interactive = true;
    hit_5.buttonMode = true;
    hit_5.x = 205;
    hit_5.y = 240;
    hit_5.visible = false;
    hits.push(hit_5);
    hit_6 = addImage('images/shooter/hit.png');
    hit_6.interactive = true;
    hit_6.buttonMode = true;
    hit_6.x = 365;
    hit_6.y = 240;
    hit_6.visible = false;
    hits.push(hit_6);
    hit_7 = addImage('images/shooter/hit.png');
    hit_7.interactive = true;
    hit_7.buttonMode = true;
    hit_7.x = 50;
    hit_7.y = 402;
    hit_7.visible = false;
    hits.push(hit_7);
    hit_8 = addImage('images/shooter/hit.png');
    hit_8.interactive = true;
    hit_8.buttonMode = true;
    hit_8.x = 205;
    hit_8.y = 402;
    hit_8.visible = false;
    hits.push(hit_8);
    hit_9 = addImage('images/shooter/hit.png');
    hit_9.interactive = true;
    hit_9.buttonMode = true;
    hit_9.x = 365;
    hit_9.y = 402;
    hit_9.visible = false;
    hits.push(hit_9);
};

// Add 9 square to click
function addSquare() {
    rect_1 = new PIXI.Graphics();
    rect_1.beginFill(0xCCFF99);
    rect_1.drawRect(0, 0, 110, 110);
    rect_1.endFill();
    rect_1.x = 55;
    rect_1.y = 55;
    rect_1.alpha = 0;
    rect_1.interactive = true;
    rect_1.buttonMode = true;
    rect.push(rect_1);
    gameScene.addChild(rect_1);

    rect_2 = new PIXI.Graphics();
    rect_2.beginFill(0xCCFF99);
    rect_2.drawRect(0, 0, 110, 110);
    rect_2.endFill();
    rect_2.x = 190;
    rect_2.y = 55;
    rect_2.alpha = 0;
    rect_2.interactive = true;
    rect_2.buttonMode = true;
    rect.push(rect_2);
    gameScene.addChild(rect_2);

    rect_3 = new PIXI.Graphics();
    rect_3.beginFill(0xCCFF99);
    rect_3.drawRect(0, 0, 110, 110);
    rect_3.endFill();
    rect_3.x = 325;
    rect_3.y = 55;
    rect_3.alpha = 0;
    rect_3.interactive = true;
    rect_3.buttonMode = true;
    rect.push(rect_3);
    gameScene.addChild(rect_3);

    rect_4 = new PIXI.Graphics();
    rect_4.beginFill(0xCCFF99);
    rect_4.drawRect(0, 0, 110, 110);
    rect_4.endFill();
    rect_4.x = 55;
    rect_4.y = 185;
    rect_4.alpha = 0;
    rect_4.interactive = true;
    rect_4.buttonMode = true;
    rect.push(rect_4);
    gameScene.addChild(rect_4);
    
    rect_5 = new PIXI.Graphics();
    rect_5.beginFill(0xCCFF99);
    rect_5.drawRect(0, 0, 110, 110);
    rect_5.endFill();
    rect_5.x = 190;
    rect_5.y = 185;
    rect_5.alpha = 0;
    rect_5.interactive = true;
    rect_5.buttonMode = true;
    rect.push(rect_5);
    gameScene.addChild(rect_5);

    rect_6 = new PIXI.Graphics();
    rect_6.beginFill(0xCCFF99);
    rect_6.drawRect(0, 0, 110, 110);
    rect_6.endFill();
    rect_6.x = 325;
    rect_6.y = 185;
    rect_6.alpha = 0;
    rect_6.interactive = true;
    rect_6.buttonMode = true;
    rect.push(rect_6)
    gameScene.addChild(rect_6);

    rect_7 = new PIXI.Graphics();
    rect_7.beginFill(0xCCFF99);
    rect_7.drawRect(0, 0, 110, 110);
    rect_7.endFill();
    rect_7.x = 55;
    rect_7.y = 320;
    rect_7.alpha = 0;
    rect_7.interactive = true;
    rect_7.buttonMode = true;
    rect.push(rect_7);
    gameScene.addChild(rect_7);

    rect_8 = new PIXI.Graphics();
    rect_8.beginFill(0xCCFF99);
    rect_8.drawRect(0, 0, 110, 110);
    rect_8.endFill();
    rect_8.x = 190;
    rect_8.y = 320;
    rect_8.alpha = 0;
    rect_8.interactive = true;
    rect_8.buttonMode = true;
    rect.push(rect_8);
    gameScene.addChild(rect_8);

    rect_9 = new PIXI.Graphics();
    rect_9.beginFill(0xCCFF99);
    rect_9.drawRect(0, 0, 110, 110);
    rect_9.endFill();
    rect_9.x = 325;
    rect_9.y = 320;
    rect_9.alpha = 0;
    rect_9.interactive = true;
    rect_9.buttonMode = true;
    rect.push(rect_9);
    gameScene.addChild(rect_9);
};

// Create ufo, boom, clock, boss
function addUfo() {
    // Create UFO blue
    ufo_blue_left_1 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/left_1.png"].texture);
    ufo_blue_left_1.x = -220;
    ufo_blue_left_1.y = 50;
    ufo_blue_left_1.isplay = false;
    ufoBlueLeft.push(ufo_blue_left_1);
    gameScene.addChild(ufo_blue_left_1);

    ufo_blue_left_2 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/left_1.png"].texture);
    ufo_blue_left_2.x = -220;
    ufo_blue_left_2.y = 230;
    ufo_blue_left_2.isplay = false;
    ufoBlueLeft.push(ufo_blue_left_2);
    gameScene.addChild(ufo_blue_left_2);

    ufo_blue_right_1 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/right_1.png"].texture); 
    ufo_blue_right_1.x = 650;
    ufo_blue_right_1.y = 150;
    ufo_blue_right_1.isplay = false;
    ufo_blue_right_1.quarter = 1;
    ufoBlueRight.push(ufo_blue_right_1);
    gameScene.addChild(ufo_blue_right_1);

    ufo_blue_right_2 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/right_1.png"].texture); 
    ufo_blue_right_2.x = 650;
    ufo_blue_right_2.y = 330;
    ufo_blue_right_2.isplay = false;
    ufo_blue_right_2.quarter = 1;
    ufoBlueRight.push(ufo_blue_right_2);
    gameScene.addChild(ufo_blue_right_2);

    // Create UFO Yellow
    ufo_yellow_left_1 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/left_2.png"].texture); 
    ufo_yellow_left_1.x = -270;
    ufo_yellow_left_1.y = 50;
    ufo_yellow_left_1.isplay = false;
    ufo_yellow_left_1.quarter = 1;
    ufoYellowLeft.push(ufo_yellow_left_1);
    gameScene.addChild(ufo_yellow_left_1);

    ufo_yellow_left_2 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/left_2.png"].texture); 
    ufo_yellow_left_2.x = -270;
    ufo_yellow_left_2.y = 230;
    ufo_yellow_left_2.isplay = false;
    ufo_yellow_left_2.quarter = 1;
    ufoYellowLeft.push(ufo_yellow_left_2);
    gameScene.addChild(ufo_yellow_left_2);

    ufo_yellow_right_1 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/right_2.png"].texture); 
    ufo_yellow_right_1.x = 650;
    ufo_yellow_right_1.y = 150;
    ufo_yellow_right_1.isplay = false;
    ufo_yellow_right_1.quarter = 1;
    ufoYellowRight.push(ufo_yellow_right_1);
    gameScene.addChild(ufo_yellow_right_1);

    ufo_yellow_right_2 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/right_3.png"].texture); 
    ufo_yellow_right_2.x = 650;
    ufo_yellow_right_2.y = 330;
    ufo_yellow_right_2.isplay = false;
    ufo_yellow_right_2.quarter = 1;
    ufoYellowRight.push(ufo_yellow_right_2);
    gameScene.addChild(ufo_yellow_right_2);

    // Create UFO Red
    ufo_red_left_1 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/left_5.png"].texture); 
    ufo_red_left_1.x = -270;
    ufo_red_left_1.y = 50;
    ufo_red_left_1.isplay = false;
    ufo_red_left_1.quarter = 1;
    ufoRedLeft.push(ufo_red_left_1);
    gameScene.addChild(ufo_red_left_1);

    ufo_red_left_2 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/left_5.png"].texture); 
    ufo_red_left_2.x = -270;
    ufo_red_left_2.y = 230;
    ufo_red_left_2.isplay = false;
    ufo_red_left_2.quarter = 1;
    ufoRedLeft.push(ufo_red_left_2);
    gameScene.addChild(ufo_red_left_2);

    ufo_red_right_1 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/right_3.png"].texture); 
    ufo_red_right_1.x = 650;
    ufo_red_right_1.y = 200;
    ufo_red_right_1.isplay = false;
    ufo_red_right_1.quarter = 1;
    ufoRedRight.push(ufo_red_right_1);
    gameScene.addChild(ufo_red_right_1);

    ufo_red_right_2 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/right_4.png"].texture); 
    ufo_red_right_2.x = 650;
    ufo_red_right_2.y = 380;
    ufo_red_right_2.isplay = false;
    ufo_red_right_2.quarter = 1;
    ufoRedRight.push(ufo_red_right_2);
    gameScene.addChild(ufo_red_right_2);

    // Create Clock 
    clock_left_1 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/left_4.png"].texture); 
    clock_left_1.x = -270;
    clock_left_1.y = 50;
    clock_left_1.isplay = false;
    clock_left_1.quarter = 1;
    clockLeft.push(clock_left_1);
    gameScene.addChild(clock_left_1);

    clock_left_2 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/left_4.png"].texture); 
    clock_left_2.x = -270;
    clock_left_2.y = 360;
    clock_left_2.isplay = false;
    clock_left_2.quarter = 1;
    clockLeft.push(clock_left_2);
    gameScene.addChild(clock_left_2);

    clock_right_1 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/right_4.png"].texture); 
    clock_right_1.x = 650;
    clock_right_1.y = 70;
    clock_right_1.isplay = false;
    clock_right_1.quarter = 1;
    clockRight.push(clock_right_1);
    gameScene.addChild(clock_right_1);

    clock_right_2 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/right_4.png"].texture); 
    clock_right_2.x = 650;
    clock_right_2.y = 350;
    clock_right_2.isplay = false;
    clock_right_2.quarter = 1;
    clockRight.push(clock_right_2);
    gameScene.addChild(clock_right_2);

    // Create Bom
    boom_left_1 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/left_3.png"].texture); 
    boom_left_1.x = -270;
    boom_left_1.y = 50;
    boom_left_1.isplay = false;
    boom_left_1.quarter = 1;
    boomLeft.push(boom_left_1);
    gameScene.addChild(boom_left_1);

    boom_left_2 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/left_3.png"].texture); 
    boom_left_2.x = -270;
    boom_left_2.y = 230;
    boom_left_2.isplay = false;
    boom_left_2.quarter = 1;
    boomLeft.push(boom_left_2);
    gameScene.addChild(boom_left_2);

    boom_right_1 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/right_5.png"].texture); 
    boom_right_1.x = 650;
    boom_right_1.y = 50;
    boom_right_1.isplay = false;
    boom_right_1.quarter = 1;
    boomRight.push(boom_right_1);
    gameScene.addChild(boom_right_1);

    boom_right_2 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/right_5.png"].texture); 
    boom_right_2.x = 650;
    boom_right_2.y = 370;
    boom_right_2.isplay = false;
    boom_right_2.quarter = 1;
    boomRight.push(boom_right_2);
    gameScene.addChild(boom_right_2);

    // Create Boss
    boss_left_1 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/left_5.png"].texture); 
    boss_left_1.x = -270;
    boss_left_1.y = 50;
    boss_left_1.isplay = false;
    boss_left_1.quarter = 1;
    bossLeft.push(boss_left_1);
    gameScene.addChild(boss_left_1);

    boss_left_2 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/left_5.png"].texture); 
    boss_left_2.x = -270;
    boss_left_2.y = 230;
    boss_left_2.isplay = false;
    boss_left_2.quarter = 1;
    bossLeft.push(boss_left_2);
    gameScene.addChild(boss_left_2);

    boss_right_1 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/right_5.png"].texture); 
    boss_right_1.x = 650;
    boss_right_1.y = 25;
    boss_right_1.isplay = false;
    boss_right_1.quarter = 1;
    bossRight.push(boss_right_1);
    gameScene.addChild(boss_right_1);

    boss_right_2 = new PIXI.Sprite(PIXI.loader.resources["images/shooter/right_3.png"].texture); 
    boss_right_2.x = 650;
    boss_right_2.y = 340;
    boss_right_2.isplay = false;
    boss_right_2.quarter = 1;
    bossRight.push(boss_right_2);
    gameScene.addChild(boss_right_2);
};
    
// Add all element on the main screen
function addSceneScreen() {
    addElement();
    addMissHitGet();
    addSquare();
    addUfo();
};

// Set up the game
function setup() {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    gameScene = new Container();
    app.stage.addChild(gameScene);
    background = addImage('images/shooter/start_screen.png');
    // player = addImage('images/shooter/player.png', 57, 142);
    // logo = addImage('images/shooter/logo.png', 38, 27);
    gameScene.visible = true;
    startGraphic = addGraphic(0x000000, 0.7, 0, 415, 480, 60);
    startGraphic.buttonMode = true;
    startGraphic.interactive = true;
    beginBtn = new Text('Lẹt pô...!', startButtonStyle)
    beginBtn.x = 143;
    beginBtn.y = 413;
    beginBtn.buttonMode = true;
    beginBtn.interactive = true;
    startGraphic.addChild(beginBtn);
    var startAlpha = 1;
    var startInterval = setInterval(function () {
        if (beginBtn.alpha > 1) {
            startAlpha = -1;
        } else if (beginBtn.alpha < 0) {
            startAlpha = 1;
        }
        beginBtn.alpha += (0.1) * startAlpha;
    }, 55)
    startGraphic.on('pointerdown', function () {
        clearInterval(startInterval);
        // player.visible = false;
        // logo.visible = false;
        startGraphic.visible = false;
        beginBtn.visible = false;
        waitingGame();
        play();
    });
    addSceneScreen();
    shootingUfo();
};

// Set up time to play game
function play() {
    gameScene.visible = true;   
    gameTimeDown = setInterval(function() {
        if (GAME_TIME > 0) {
            GAME_TIME --;
            timeNumber.text = GAME_TIME;
        }; 
        if(GAME_TIME == 0) {
            clearInterval(gameTimeDown);
            waitingEndGame();
        };
    }, 1200);
    app.ticker.add(delta => gameLoop());
};

// Main function: shooting ufo
function shootingUfo() {
    rect.forEach(function(rectNum, index) {
        rectNum.on('pointertap', function() {
            fl = 0;
            // Ufo blue left
            ufoBlueLeft.forEach(function(item, i) {
                if (hitRect(item, rectNum)) {
                    fl = 1;              
                    switch (i) {
                        case 0: 
                            item.visible = true;
                            count_1 += 1;
                            let shrapnel_blue_left_1_1 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_blue_left_2_1 = addImage('images/shooter/shrapnel_2.png');
                            shrapnel_blue_left_1_1.x = item.x + 34;
                            shrapnel_blue_left_1_1.y = item.y + 35;
                            shrapnel_blue_left_2_1.x = item.x + 25;
                            shrapnel_blue_left_2_1.y = item.y + 34;

                            shrapnel_blue_left_1_1.width = 40;
                            shrapnel_blue_left_1_1.height = 35;
                            shrapnel_blue_left_1_1.alpha = 1;
                            let moveBoom_1_1 = setInterval(function() {
                                if ( shrapnel_blue_left_1_1.width < 140 &&  shrapnel_blue_left_1_1.height < 140) {
                                    shrapnel_blue_left_1_1.anchor.set(0.2);
                                    shrapnel_blue_left_1_1.width += 2;
                                    shrapnel_blue_left_1_1.height += 2;  
                                    shrapnel_blue_left_1_1.alpha -= 0.06;
                                }   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(moveBoom_1_1)
                            }, 150);

                            shrapnel_blue_left_2_1.width = 60;
                            shrapnel_blue_left_2_1.height = 55;
                            shrapnel_blue_left_2_1.alpha = 1;
                            let moveBoom_2_1 = setInterval(function() {
                                if ( shrapnel_blue_left_2_1.width < 150 &&  shrapnel_blue_left_2_1.height < 150) {
                                    shrapnel_blue_left_2_1.anchor.set(0.2);
                                    shrapnel_blue_left_2_1.width += 2;
                                    shrapnel_blue_left_2_1.height += 2;  
                                    shrapnel_blue_left_2_1.alpha -= 0.12  
                                };  
                            }, 40);
                            setTimeout(function(){
                                clearInterval(moveBoom_2_1);
                            }, 150);

                            let bomAnimation_1 = setInterval(function() {
                                shrapnel_blue_left_1_1.visible = false;
                                shrapnel_blue_left_2_1.visible = false;
        
                            }, 150);
                            setTimeout(function() {
                                clearInterval(bomAnimation_1);
                            }, 150);

                            score += 10;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = 800;
                            }, 10);  
                            break;
                        case 1: 
                            item.visible = true;
                            count_1 += 1;
                            let shrapnel_blue_left_1_2 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_blue_left_2_2 = addImage('images/shooter/shrapnel_2.png');
                        
                            shrapnel_blue_left_1_2.x = item.x + 34;
                            shrapnel_blue_left_1_2.y = item.y + 35;
                            shrapnel_blue_left_2_2.x = item.x + 25;
                            shrapnel_blue_left_2_2.y = item.y + 34;

                    

                            shrapnel_blue_left_1_2.width = 40;
                            shrapnel_blue_left_1_2.height = 35;
                            shrapnel_blue_left_1_2.alpha = 1;
                            let moveBoom_1_2 = setInterval(function() {
                                if ( shrapnel_blue_left_1_2.width < 140 &&  shrapnel_blue_left_1_2.height < 140) {
                                    shrapnel_blue_left_1_2.anchor.set(0.2);
                                    shrapnel_blue_left_1_2.width += 2;
                                    shrapnel_blue_left_1_2.height += 2;  
                                    shrapnel_blue_left_1_2.alpha -= 0.06;
                                }   
                            }, 40)
                            setTimeout(function(){
                                clearInterval(moveBoom_1_2);
                            }, 150);

                            shrapnel_blue_left_2_2.width = 60;
                            shrapnel_blue_left_2_2.height = 55;
                            shrapnel_blue_left_2_2.alpha = 1;
                            let moveBoom_2_2 = setInterval(function() {
                                if ( shrapnel_blue_left_2_2.width < 150 &&  shrapnel_blue_left_2_2.height < 150) {
                                shrapnel_blue_left_2_2.anchor.set(0.2);
                                shrapnel_blue_left_2_2.width += 2;
                                shrapnel_blue_left_2_2.height += 2;  
                                shrapnel_blue_left_2_2.alpha -= 0.12  
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(moveBoom_2_2);
                            }, 150);

                            let bomAnimation_2 = setInterval(function() {
                                shrapnel_blue_left_1_2.visible = false;
                                shrapnel_blue_left_2_2.visible = false;
                             
                            }, 150);
                            setTimeout(function() {
                                clearInterval(bomAnimation_2);
                            }, 150);

                            score += 10
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = 800;
                            }, 10); 
                            break;
                    };  
                };   
            });
            // Ufo blue right
            ufoBlueRight.forEach(function(item, i) {
                if (hitRect(item, rectNum)) {
                    fl = 1;              
                    switch (i) {
                        case 0: 
                            item.visible = true;
                            count_2 += 1
                            let shrapnel_blue_right_1_1 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_blue_right_2_1 = addImage('images/shooter/shrapnel_2.png');
                            shrapnel_blue_right_1_1.x = item.x + 34;
                            shrapnel_blue_right_1_1.y = item.y + 35;
                            shrapnel_blue_right_2_1.x = item.x + 25;
                            shrapnel_blue_right_2_1.y = item.y + 34;

                           
                            shrapnel_blue_right_1_1.width = 40;
                            shrapnel_blue_right_1_1.height = 35;
                            shrapnel_blue_right_1_1.alpha = 1;
                            let moveBoom_1_3 = setInterval(function() {
                                if ( shrapnel_blue_right_1_1.width < 140 &&  shrapnel_blue_right_1_1.height < 140) {
                                    shrapnel_blue_right_1_1.anchor.set(0.2);
                                    shrapnel_blue_right_1_1.width += 2;
                                    shrapnel_blue_right_1_1.height += 2;  
                                    shrapnel_blue_right_1_1.alpha -= 0.06;
                                }; 
                            }, 40);
                            setTimeout(function(){
                                clearInterval(moveBoom_1_3);
                            }, 150);
                                
                            shrapnel_blue_right_2_1.width = 60;
                            shrapnel_blue_right_2_1.height = 55;
                            shrapnel_blue_right_2_1.alpha = 1;
                            let moveBoom_2_3 = setInterval(function() {
                                if ( shrapnel_blue_right_2_1.width < 150 &&  shrapnel_blue_right_2_1.height < 150) {
                                shrapnel_blue_right_2_1.anchor.set(0.2);
                                shrapnel_blue_right_2_1.width += 2;
                                shrapnel_blue_right_2_1.height += 2;  
                                shrapnel_blue_right_2_1.alpha -= 0.12  
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(moveBoom_2_3);
                            }, 150);

                            let bomAnimation_3 = setInterval(function() {
                                shrapnel_blue_right_1_1.visible = false;
                                shrapnel_blue_right_2_1.visible = false;
                            
                            }, 150);
                            setTimeout(function() {
                                clearInterval(bomAnimation_3);
                            }, 150);

                            score += 10;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = -220;
                            }, 10);  
                            break;
                        case 1: 
                            item.visible = true;
                            count_2 += 1
                            let shrapnel_blue_right_1_4 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_blue_right_2_4 = addImage('images/shooter/shrapnel_2.png');
                   
                            shrapnel_blue_right_1_4.x = item.x + 34;
                            shrapnel_blue_right_1_4.y = item.y + 35;
                            shrapnel_blue_right_2_4.x = item.x + 25;
                            shrapnel_blue_right_2_4.y = item.y + 34;

                            shrapnel_blue_right_1_4.width = 40;
                            shrapnel_blue_right_1_4.height = 35;
                            shrapnel_blue_right_1_4.alpha = 1;
                            let moveBoom_1_4 = setInterval(function() {
                                if ( shrapnel_blue_right_1_4.width < 140 &&  shrapnel_blue_right_1_4.height < 140) {
                                    shrapnel_blue_right_1_4.anchor.set(0.2);
                                    shrapnel_blue_right_1_4.width += 2;
                                    shrapnel_blue_right_1_4.height += 2;  
                                    shrapnel_blue_right_1_4.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(moveBoom_1_4);
                                }, 150);

                            shrapnel_blue_right_2_4.width = 60;
                            shrapnel_blue_right_2_4.height = 55;
                            shrapnel_blue_right_2_4.alpha = 1;
                            let moveBoom_2_4 = setInterval(function() {
                                if ( shrapnel_blue_right_2_4.width < 150 &&  shrapnel_blue_right_2_4.height < 150) {
                                    shrapnel_blue_right_2_4.anchor.set(0.2);
                                    shrapnel_blue_right_2_4.width += 2;
                                    shrapnel_blue_right_2_4.height += 2;  
                                    shrapnel_blue_right_2_4.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(moveBoom_2_4);
                            }, 150);

                            let bomAnimation_4 = setInterval(function() {
                                shrapnel_blue_right_1_4.visible = false;
                                shrapnel_blue_right_2_4.visible = false;
                            }, 150);
                            setTimeout(function() {
                                clearInterval(bomAnimation_4);
                            }, 150);

                            score += 10;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = -220;
                            }, 10);  
                            break;
                    };  
                };   
            });

            // Ufo yellow left
            ufoYellowLeft.forEach(function(item, i) {
                if (hitRect(item, rectNum)) {
                    fl = 1;              
                    switch (i) {
                        case 0: 
                            item.visible = true;
                            count_3 += 1
                            let shrapnel_yellow_left_1_1 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_yellow_left_2_1 = addImage('images/shooter/shrapnel_2.png');
                           
                            shrapnel_yellow_left_1_1.x = item.x + 34;
                            shrapnel_yellow_left_1_1.y = item.y + 35;
                            shrapnel_yellow_left_2_1.x = item.x + 25;
                            shrapnel_yellow_left_2_1.y = item.y + 34;

                           
                            shrapnel_yellow_left_1_1.width = 40;
                            shrapnel_yellow_left_1_1.height = 35;
                            shrapnel_yellow_left_1_1.alpha = 1;
                            let move_yellow_left_1_1 = setInterval(function() {
                                if ( shrapnel_yellow_left_1_1.width < 140 &&  shrapnel_yellow_left_1_1.height < 140) {
                                    shrapnel_yellow_left_1_1.anchor.set(0.2);
                                    shrapnel_yellow_left_1_1.width += 2;
                                    shrapnel_yellow_left_1_1.height += 2;  
                                    shrapnel_yellow_left_1_1.alpha -= 0.06;
                                };  
                            }, 40);
                            setTimeout(function(){
                                clearInterval(move_yellow_left_1_1);
                            }, 150);

                            shrapnel_yellow_left_2_1.width = 60;
                            shrapnel_yellow_left_2_1.height = 55;
                            shrapnel_yellow_left_2_1.alpha = 1;
                            let move_yellow_left_1_2 = setInterval(function() {
                                if ( shrapnel_yellow_left_2_1.width < 150 &&  shrapnel_yellow_left_2_1.height < 150) {
                                shrapnel_yellow_left_2_1.anchor.set(0.2);
                                shrapnel_yellow_left_2_1.width += 2;
                                shrapnel_yellow_left_2_1.height += 2;  
                                shrapnel_yellow_left_2_1.alpha -= 0.12  
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(move_yellow_left_1_2)
                            }, 150);

                            let move_yellow_left_1_3 = setInterval(function() {
                                shrapnel_yellow_left_1_1.visible = false;
                                shrapnel_yellow_left_2_1.visible = false;
                              
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_yellow_left_1_3);
                            }, 150);

                            score += 20;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = 800;
                            }, 10)  
                            break;
                        case 1: 
                            item.visible = true;
                            count_3 += 1
                            let shrapnel_yellow_left_1_2 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_yellow_left_2_2 = addImage('images/shooter/shrapnel_2.png');
                         
                            shrapnel_yellow_left_1_2.x = item.x + 34;
                            shrapnel_yellow_left_1_2.y = item.y + 35;
                            shrapnel_yellow_left_2_2.x = item.x + 25;
                            shrapnel_yellow_left_2_2.y = item.y + 34;


                            shrapnel_yellow_left_1_2.width = 40;
                            shrapnel_yellow_left_1_2.height = 35;
                            shrapnel_yellow_left_1_2.alpha = 1;
                            let move_yellow_left_2_1 = setInterval(function() {
                                if ( shrapnel_yellow_left_1_2.width < 140 &&  shrapnel_yellow_left_1_2.height < 140) {
                                    shrapnel_yellow_left_1_2.anchor.set(0.2);
                                    shrapnel_yellow_left_1_2.width += 2;
                                    shrapnel_yellow_left_1_2.height += 2;  
                                    shrapnel_yellow_left_1_2.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(move_yellow_left_2_1);
                            }, 150);
                            shrapnel_yellow_left_2_2.width = 60;
                            shrapnel_yellow_left_2_2.height = 55;
                            shrapnel_yellow_left_2_2.alpha = 1;
                            let move_yellow_left_2_2 = setInterval(function() {
                                if ( shrapnel_yellow_left_2_2.width < 150 &&  shrapnel_yellow_left_2_2.height < 150) {
                                    shrapnel_yellow_left_2_2.anchor.set(0.2);
                                    shrapnel_yellow_left_2_2.width += 2;
                                    shrapnel_yellow_left_2_2.height += 2;  
                                    shrapnel_yellow_left_2_2.alpha -= 0.12; 
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(move_yellow_left_2_2);
                            }, 150);

                            let move_yellow_left_2_3 = setInterval(function() {
                                shrapnel_yellow_left_1_2.visible = false;
                                shrapnel_yellow_left_2_2.visible = false;
      
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_yellow_left_2_3);
                            }, 150);

                            score += 20;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = 800;
                            }, 10);  
                            break;
                    }  
                }   
            })

            // Ufo yellow right
            ufoYellowRight.forEach(function(item, i) {
                if (hitRect(item, rectNum)) {
                    fl = 1;              
                    switch (i) {
                        case 0: 
                            item.visible = true;
                            count_4 += 1
                            let shrapnel_yellow_right_1_1 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_yellow_right_2_1 = addImage('images/shooter/shrapnel_2.png');
                          
                            shrapnel_yellow_right_1_1.x = item.x + 34;
                            shrapnel_yellow_right_1_1.y = item.y + 35;
                            shrapnel_yellow_right_2_1.x = item.x + 25;
                            shrapnel_yellow_right_2_1.y = item.y + 34;

                          

                            shrapnel_yellow_right_1_1.width = 40;
                            shrapnel_yellow_right_1_1.height = 35;
                            shrapnel_yellow_right_1_1.alpha = 1;
                            let move_yellow_right_1_1 = setInterval(function() {
                                if ( shrapnel_yellow_right_1_1.width < 140 &&  shrapnel_yellow_right_1_1.height < 140) {
                                    shrapnel_yellow_right_1_1.anchor.set(0.2);
                                    shrapnel_yellow_right_1_1.width += 2;
                                    shrapnel_yellow_right_1_1.height += 2;  
                                    shrapnel_yellow_right_1_1.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(move_yellow_right_1_1);
                            }, 150);
                            shrapnel_yellow_right_2_1.width = 60;
                            shrapnel_yellow_right_2_1.height = 55;
                            shrapnel_yellow_right_2_1.alpha = 1;
                            let move_yellow_right_1_2 = setInterval(function() {
                                if ( shrapnel_yellow_right_2_1.width < 150 &&  shrapnel_yellow_right_2_1.height < 150) {
                                shrapnel_yellow_right_2_1.anchor.set(0.2);
                                shrapnel_yellow_right_2_1.width += 2;
                                shrapnel_yellow_right_2_1.height += 2;  
                                shrapnel_yellow_right_2_1.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(move_yellow_right_1_2);
                            }, 150);

                            let move_yellow_right_1_3 = setInterval(function() {
                                shrapnel_yellow_right_1_1.visible = false;
                                shrapnel_yellow_right_2_1.visible = false;
                            
                            }, 150)
                            setTimeout(function() {
                                clearInterval(move_yellow_right_1_3);
                            }, 150);

                            score += 20;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = -200;
                            }, 10);  
                            break;

                        case 1: 
                            item.visible = true;
                            count_4 += 1
                            let shrapnel_yellow_right_1_2 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_yellow_right_2_2 = addImage('images/shooter/shrapnel_2.png');
   
                            shrapnel_yellow_right_1_2.x = item.x + 34;
                            shrapnel_yellow_right_1_2.y = item.y + 35;
                            shrapnel_yellow_right_2_2.x = item.x + 25;
                            shrapnel_yellow_right_2_2.y = item.y + 34;

                            shrapnel_yellow_right_1_2.width = 40;
                            shrapnel_yellow_right_1_2.height = 35;
                            shrapnel_yellow_right_1_2.alpha = 1;
                            let move_yellow_right_2_1 = setInterval(function() {
                                if ( shrapnel_yellow_right_1_2.width < 140 &&  shrapnel_yellow_right_1_2.height < 140) {
                                    shrapnel_yellow_right_1_2.anchor.set(0.2);
                                    shrapnel_yellow_right_1_2.width += 2;
                                    shrapnel_yellow_right_1_2.height += 2;  
                                    shrapnel_yellow_right_1_2.alpha -= 0.06;
                                };   
                                }, 40);
                            setTimeout(function() {
                                clearInterval(move_yellow_right_2_1);
                            }, 150);
                            shrapnel_yellow_right_2_2.width = 60;
                            shrapnel_yellow_right_2_2.height = 55;
                            shrapnel_yellow_right_2_2.alpha = 1;
                            let move_yellow_right_2_2 = setInterval(function() {
                                if ( shrapnel_yellow_right_2_2.width < 150 &&  shrapnel_yellow_right_2_2.height < 150) {
                                    shrapnel_yellow_right_2_2.anchor.set(0.2);
                                    shrapnel_yellow_right_2_2.width += 2;
                                    shrapnel_yellow_right_2_2.height += 2;  
                                    shrapnel_yellow_right_2_2.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(move_yellow_right_2_2);
                            }, 150);

                            let move_yellow_right_2_3 = setInterval(function() {
                                shrapnel_yellow_right_1_2.visible = false;
                                shrapnel_yellow_right_2_2.visible = false;
    
                            }, 150)
                            setTimeout(function() {
                                clearInterval(move_yellow_right_2_3);
                            }, 150);

                            score += 20;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = -200;
                            }, 10); 
                            break;
                    };  
                };   
            });

            // Ufo red left
            ufoRedLeft.forEach(function(item, i) {
                if (hitRect(item, rectNum)) {
                    fl = 1;              
                    switch (i) {
                        case 0: 
                            item.visible = true;
                            count_5 += 1
                            let shrapnel_red_left_1_1 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_red_left_2_1 = addImage('images/shooter/shrapnel_2.png');
                
                            shrapnel_red_left_1_1.x = item.x + 34;
                            shrapnel_red_left_1_1.y = item.y + 35;
                            shrapnel_red_left_2_1.x = item.x + 25;
                            shrapnel_red_left_2_1.y = item.y + 34;

                      

                            shrapnel_red_left_1_1.width = 40;
                            shrapnel_red_left_1_1.height = 35;
                            shrapnel_red_left_1_1.alpha = 1;
                            let move_red_left_1_1 = setInterval(function() {
                                if ( shrapnel_red_left_1_1.width < 140 &&  shrapnel_red_left_1_1.height < 140) {
                                    shrapnel_red_left_1_1.anchor.set(0.2);
                                    shrapnel_red_left_1_1.width += 2;
                                    shrapnel_red_left_1_1.height += 2;  
                                    shrapnel_red_left_1_1.alpha -= 0.06;
                                }   
                            }, 40)
                            setTimeout(function() {
                                clearInterval(move_red_left_1_1);
                            }, 150);
                            shrapnel_red_left_2_1.width = 60;
                            shrapnel_red_left_2_1.height = 55;
                            shrapnel_red_left_2_1.alpha = 1;
                            let move_red_left_1_2 = setInterval(function() {
                                if ( shrapnel_red_left_2_1.width < 150 &&  shrapnel_red_left_2_1.height < 150) {
                                    shrapnel_red_left_2_1.anchor.set(0.2);
                                    shrapnel_red_left_2_1.width += 2;
                                    shrapnel_red_left_2_1.height += 2;  
                                    shrapnel_red_left_2_1.alpha -= 0.12;  
                                };  
                            }, 40);
                            setTimeout(function(){
                                clearInterval(move_red_left_1_2);
                            }, 150);

                            let move_red_left_1_3 = setInterval(function() {
                                shrapnel_red_left_1_1.visible = false;
                                shrapnel_red_left_2_1.visible = false;
                     
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_red_left_1_3);
                            }, 150);

                            score += 30;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = 800;
                            }, 10); 
                            break;
                        case 1: 
                            item.visible = true;
                            count_5 += 1
                            let shrapnel_red_left_1_2 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_red_left_2_2 = addImage('images/shooter/shrapnel_2.png');
                       
                            shrapnel_red_left_1_2.x = item.x + 34;
                            shrapnel_red_left_1_2.y = item.y + 35;
                            shrapnel_red_left_2_2.x = item.x + 25;
                            shrapnel_red_left_2_2.y = item.y + 34;

                      
                            shrapnel_red_left_1_2.width = 40;
                            shrapnel_red_left_1_2.height = 35;
                            shrapnel_red_left_1_2.alpha = 1;
                            let move_red_left_2_1 = setInterval(function() {
                                if ( shrapnel_red_left_1_2.width < 140 &&  shrapnel_red_left_1_2.height < 140) {
                                    shrapnel_red_left_1_2.anchor.set(0.2);
                                    shrapnel_red_left_1_2.width += 2;
                                    shrapnel_red_left_1_2.height += 2;  
                                    shrapnel_red_left_1_2.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_red_left_2_1);
                                }, 150);
                            shrapnel_red_left_2_2.width = 60;
                            shrapnel_red_left_2_2.height = 55;
                            shrapnel_red_left_2_2.alpha = 1;
                            let move_red_left_2_2 = setInterval(function() {
                                if ( shrapnel_red_left_2_2.width < 150 &&  shrapnel_red_left_2_2.height < 150) {
                                    shrapnel_red_left_2_2.anchor.set(0.2);
                                    shrapnel_red_left_2_2.width += 2;
                                    shrapnel_red_left_2_2.height += 2;  
                                    shrapnel_red_left_2_2.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_red_left_2_2);
                            }, 150);

                            let move_red_left_2_3 = setInterval(function() {
                                shrapnel_red_left_1_2.visible = false;
                                shrapnel_red_left_2_2.visible = false;
                   
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_red_left_2_3);
                            }, 150);

                            score += 30;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = 800;
                            }, 10); 
                            break;
                    };  
                };  
            });

            // Ufo red right
            ufoRedRight.forEach(function(item, i) {
                if (hitRect(item, rectNum)) {
                    fl = 1;              
                    switch (i) {
                        case 0: 
                            item.visible = true;
                            count_6 += 1;
                            let shrapnel_red_right_1_1 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_red_right_2_1 = addImage('images/shooter/shrapnel_2.png');
                       
                            shrapnel_red_right_1_1.x = item.x + 34;
                            shrapnel_red_right_1_1.y = item.y + 35;
                            shrapnel_red_right_2_1.x = item.x + 25;
                            shrapnel_red_right_2_1.y = item.y + 34;

                        

                            shrapnel_red_right_1_1.width = 40;
                            shrapnel_red_right_1_1.height = 35;
                            shrapnel_red_right_1_1.alpha = 1;
                            let move_red_right_1_1 = setInterval(function() {
                                if ( shrapnel_red_right_1_1.width < 140 &&  shrapnel_red_right_1_1.height < 140) {
                                    shrapnel_red_right_1_1.anchor.set(0.2);
                                    shrapnel_red_right_1_1.width += 2;
                                    shrapnel_red_right_1_1.height += 2;  
                                    shrapnel_red_right_1_1.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_red_right_1_1);
                            }, 150);
                            shrapnel_red_right_2_1.width = 60;
                            shrapnel_red_right_2_1.height = 55;
                            shrapnel_red_right_2_1.alpha = 1;
                            let move_red_right_1_2 = setInterval(function() {
                                if ( shrapnel_red_right_2_1.width < 150 &&  shrapnel_red_right_2_1.height < 150) {
                                shrapnel_red_right_2_1.anchor.set(0.2);
                                shrapnel_red_right_2_1.width += 2;
                                shrapnel_red_right_2_1.height += 2;  
                                shrapnel_red_right_2_1.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_red_right_1_2);
                            }, 150);

                            let move_red_right_1_3 = setInterval(function() {
                                shrapnel_red_right_1_1.visible = false;
                                shrapnel_red_right_2_1.visible = false;
                        
                            }, 150)
                            setTimeout(function() {
                                clearInterval(move_red_right_1_3);
                            }, 150);

                            score += 30;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = -200;
                            }, 10);  
                            break;
                        case 1: 
                            item.visible = true;
                            count_6 += 1;
                            let shrapnel_red_right_1_2 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_red_right_2_2 = addImage('images/shooter/shrapnel_2.png');
                       
                            shrapnel_red_right_1_2.x = item.x + 34;
                            shrapnel_red_right_1_2.y = item.y + 35;
                            shrapnel_red_right_2_2.x = item.x + 25;
                            shrapnel_red_right_2_2.y = item.y + 34;

                          
                            shrapnel_red_right_1_2.width = 40;
                            shrapnel_red_right_1_2.height = 35;
                            shrapnel_red_right_1_2.alpha = 1;
                            let move_red_right_2_1 = setInterval(function() {
                                if ( shrapnel_red_right_1_2.width < 140 &&  shrapnel_red_right_1_2.height < 140) {
                                shrapnel_red_right_1_2.anchor.set(0.2);
                                shrapnel_red_right_1_2.width += 2;
                                shrapnel_red_right_1_2.height += 2;  
                                shrapnel_red_right_1_2.alpha -= 0.06;
                                }   
                            }, 40)
                            setTimeout(function() {
                                clearInterval(move_red_right_2_1);
                            }, 150);
                            shrapnel_red_right_2_2.width = 60;
                            shrapnel_red_right_2_2.height = 55;
                            shrapnel_red_right_2_2.alpha = 1;
                            let move_red_right_2_2 = setInterval(function() {
                                if ( shrapnel_red_right_2_2.width < 150 &&  shrapnel_red_right_2_2.height < 150) {
                                shrapnel_red_right_2_2.anchor.set(0.2);
                                shrapnel_red_right_2_2.width += 2;
                                shrapnel_red_right_2_2.height += 2;  
                                shrapnel_red_right_2_2.alpha -= 0.12; 
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_red_right_2_2);
                            }, 150);

                            let move_red_right_2_3 = setInterval(function() {
                                shrapnel_red_right_1_2.visible = false;
                                shrapnel_red_right_2_2.visible = false;
                           
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_red_right_2_3);
                            }, 150);

                            score += 30;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = -200;
                            }, 10);  
                            break;
                    };  
                };   
            });

            // Clock left
            clockLeft.forEach(function(item, i){
                if (hitRect(item, rectNum)) {
                    fl = 1;              
                    switch (i) {
                        case 0: 
                            item.visible = true;
                            let shrapnel_clock_left_1_1 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_clock_left_2_1 = addImage('images/shooter/shrapnel_2.png');
               
                            shrapnel_clock_left_1_1.x = item.x + 34;
                            shrapnel_clock_left_1_1.y = item.y + 35;
                            shrapnel_clock_left_2_1.x = item.x + 25;
                            shrapnel_clock_left_2_1.y = item.y + 34;

                         
                            shrapnel_clock_left_1_1.width = 40;
                            shrapnel_clock_left_1_1.height = 35;
                            shrapnel_clock_left_1_1.alpha = 1;
                            let move_clock_left_1_1 = setInterval(function() {
                                if ( shrapnel_clock_left_1_1.width < 140 &&  shrapnel_clock_left_1_1.height < 140) {
                                    shrapnel_clock_left_1_1.anchor.set(0.2);
                                    shrapnel_clock_left_1_1.width += 2;
                                    shrapnel_clock_left_1_1.height += 2;  
                                    shrapnel_clock_left_1_1.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_clock_left_1_1);
                            }, 150);
                            shrapnel_clock_left_2_1.width = 60;
                            shrapnel_clock_left_2_1.height = 55;
                            shrapnel_clock_left_2_1.alpha = 1;
                            let move_clock_left_1_2 = setInterval(function() {
                                if ( shrapnel_clock_left_2_1.width < 150 &&  shrapnel_clock_left_2_1.height < 150) {
                                    shrapnel_clock_left_2_1.anchor.set(0.2);
                                    shrapnel_clock_left_2_1.width += 2;
                                    shrapnel_clock_left_2_1.height += 2;  
                                    shrapnel_clock_left_2_1.alpha -= 0.12; 
                                }; 
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_clock_left_1_2);
                            }, 150);

                            let move_clock_left_1_3 = setInterval(function() {
                                shrapnel_clock_left_1_1.visible = false;
                                shrapnel_clock_left_2_1.visible = false;
                          
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_clock_left_1_3);
                            }, 150);

                            score += 50;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = 800;
                            }, 10);  
                            break;

                        case 1: 
                            item.visible = true;
                            let shrapnel_clock_left_1_2 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_clock_left_2_2 = addImage('images/shooter/shrapnel_2.png');
                  
                            shrapnel_clock_left_1_2.x = item.x + 34;
                            shrapnel_clock_left_1_2.y = item.y + 35;
                            shrapnel_clock_left_2_2.x = item.x + 25;
                            shrapnel_clock_left_2_2.y = item.y + 34;

                        

                            shrapnel_clock_left_1_2.width = 40;
                            shrapnel_clock_left_1_2.height = 35;
                            shrapnel_clock_left_1_2.alpha = 1;
                            let move_clock_left_2_1 = setInterval(function() {
                                if ( shrapnel_clock_left_1_2.width < 140 &&  shrapnel_clock_left_1_2.height < 140) {
                                    shrapnel_clock_left_1_2.anchor.set(0.2);
                                    shrapnel_clock_left_1_2.width += 2;
                                    shrapnel_clock_left_1_2.height += 2;  
                                    shrapnel_clock_left_1_2.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_clock_left_2_1);
                            }, 150);
                            shrapnel_clock_left_2_2.width = 60;
                            shrapnel_clock_left_2_2.height = 55;
                            shrapnel_clock_left_2_2.alpha = 1;
                            let move_clock_left_2_2 = setInterval(function() {
                                if ( shrapnel_clock_left_2_2.width < 150 &&  shrapnel_clock_left_2_2.height < 150) {
                                    shrapnel_clock_left_2_2.anchor.set(0.2);
                                    shrapnel_clock_left_2_2.width += 2;
                                    shrapnel_clock_left_2_2.height += 2;  
                                    shrapnel_clock_left_2_2.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(move_clock_left_2_2);
                            }, 150);

                            let move_clock_left_2_3 = setInterval(function() {
                                shrapnel_clock_left_1_2.visible = false;
                                shrapnel_clock_left_2_2.visible = false;
                             
                            }, 150)
                            setTimeout(function() {
                                clearInterval(move_clock_left_2_3);
                            }, 150);

                            score += 50;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = 800;
                            }, 10); 
                            break;
                    };  
                };   
            });

            // Clock right
            clockRight.forEach(function(item, i){
                if (hitRect(item, rectNum)) {
                    fl = 1;              
                    switch (i) {
                        case 0: 
                            item.visible = true;
                            let shrapnel_clock_right_1_1 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_clock_right_2_1 = addImage('images/shooter/shrapnel_2.png');
                       
                            shrapnel_clock_right_1_1.x = item.x + 34;
                            shrapnel_clock_right_1_1.y = item.y + 35;
                            shrapnel_clock_right_2_1.x = item.x + 25;
                            shrapnel_clock_right_2_1.y = item.y + 34;


                            shrapnel_clock_right_1_1.width = 40;
                            shrapnel_clock_right_1_1.height = 35;
                            shrapnel_clock_right_1_1.alpha = 1;
                            let move_clock_right_1_1 = setInterval(function() {
                                if ( shrapnel_clock_right_1_1.width < 140 &&  shrapnel_clock_right_1_1.height < 140) {
                                    shrapnel_clock_right_1_1.anchor.set(0.2);
                                    shrapnel_clock_right_1_1.width += 2;
                                    shrapnel_clock_right_1_1.height += 2;  
                                    shrapnel_clock_right_1_1.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_clock_right_1_1);
                            }, 150);
                            shrapnel_clock_right_2_1.width = 60;
                            shrapnel_clock_right_2_1.height = 55;
                            shrapnel_clock_right_2_1.alpha = 1;
                            let move_clock_right_1_2 = setInterval(function() {
                                if ( shrapnel_clock_right_2_1.width < 150 &&  shrapnel_clock_right_2_1.height < 150) {
                                shrapnel_clock_right_2_1.anchor.set(0.2);
                                shrapnel_clock_right_2_1.width += 2;
                                shrapnel_clock_right_2_1.height += 2;  
                                shrapnel_clock_right_2_1.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_clock_right_1_2);
                            }, 150);

                            let move_clock_right_1_3 = setInterval(function() {
                                shrapnel_clock_right_1_1.visible = false;
                                shrapnel_clock_right_2_1.visible = false;
                              
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_clock_right_1_3);
                            }, 150);

                            score += 50;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = -200;
                            }, 10); 
                            break;
                        case 1: 
                            item.visible = true;
                            let shrapnel_clock_right_1_2 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_clock_right_2_2 = addImage('images/shooter/shrapnel_2.png');
                   
                            shrapnel_clock_right_1_2.x = item.x + 34;
                            shrapnel_clock_right_1_2.y = item.y + 35;
                            shrapnel_clock_right_2_2.x = item.x + 25;
                            shrapnel_clock_right_2_2.y = item.y + 34;

               

                            shrapnel_clock_right_1_2.width = 40;
                            shrapnel_clock_right_1_2.height = 35;
                            shrapnel_clock_right_1_2.alpha = 1;
                            let move_clock_right_2_1 = setInterval(function() {
                                if ( shrapnel_clock_right_1_2.width < 140 &&  shrapnel_clock_right_1_2.height < 140) {
                                    shrapnel_clock_right_1_2.anchor.set(0.2);
                                    shrapnel_clock_right_1_2.width += 2;
                                    shrapnel_clock_right_1_2.height += 2;  
                                    shrapnel_clock_right_1_2.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_clock_right_2_1);
                            }, 150);
                            shrapnel_clock_right_2_2.width = 60;
                            shrapnel_clock_right_2_2.height = 55;
                            shrapnel_clock_right_2_2.alpha = 1;
                            let move_clock_right_2_2 = setInterval(function() {
                                if ( shrapnel_clock_right_2_2.width < 150 &&  shrapnel_clock_right_2_2.height < 150) {
                                shrapnel_clock_right_2_2.anchor.set(0.2);
                                shrapnel_clock_right_2_2.width += 2;
                                shrapnel_clock_right_2_2.height += 2;  
                                shrapnel_clock_right_2_2.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_clock_right_2_2);
                            }, 150);

                            let move_clock_right_2_3 = setInterval(function() {
                                shrapnel_clock_right_1_2.visible = false;
                                shrapnel_clock_right_2_2.visible = false;
                          
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_clock_right_2_3);
                            }, 150);

                            score += 50;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = -200;
                            }, 10);  
                            break;
                    };  
                };   
            });

            // Bom left
            boomLeft.forEach(function(item, i){
                if (hitRect(item, rectNum)) {
                    fl = 1;              
                    switch (i) {
                        case 0: 
                            item.visible = true;
                            let shrapnel_boom_left_1_1 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_boom_left_2_1 = addImage('images/shooter/shrapnel_2.png');
               
                            shrapnel_boom_left_1_1.x = item.x + 34;
                            shrapnel_boom_left_1_1.y = item.y + 35;
                            shrapnel_boom_left_2_1.x = item.x + 25;
                            shrapnel_boom_left_2_1.y = item.y + 34;

                         
                            shrapnel_boom_left_1_1.width = 40;
                            shrapnel_boom_left_1_1.height = 35;
                            shrapnel_boom_left_1_1.alpha = 1;
                            let move_boom_left_1_1 = setInterval(function() {
                                if ( shrapnel_boom_left_1_1.width < 140 &&  shrapnel_boom_left_1_1.height < 140) {
                                    shrapnel_boom_left_1_1.anchor.set(0.2);
                                    shrapnel_boom_left_1_1.width += 2;
                                    shrapnel_boom_left_1_1.height += 2;  
                                    shrapnel_boom_left_1_1.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boom_left_1_1);
                            }, 150);
                            shrapnel_boom_left_2_1.width = 60;
                            shrapnel_boom_left_2_1.height = 55;
                            shrapnel_boom_left_2_1.alpha = 1;
                            let move_boom_left_1_2 = setInterval(function() {
                                if ( shrapnel_boom_left_2_1.width < 150 &&  shrapnel_boom_left_2_1.height < 150) {
                                    shrapnel_boom_left_2_1.anchor.set(0.2);
                                    shrapnel_boom_left_2_1.width += 2;
                                    shrapnel_boom_left_2_1.height += 2;  
                                    shrapnel_boom_left_2_1.alpha -= 0.12; 
                                }; 
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boom_left_1_2);
                            }, 150);

                            let move_boom_left_1_3 = setInterval(function() {
                                shrapnel_boom_left_1_1.visible = false;
                                shrapnel_boom_left_2_1.visible = false;
                          
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_boom_left_1_3);
                            }, 150);

                            score += 50;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = 800;
                            }, 10);  
                            break;

                        case 1: 
                            item.visible = true;
                            let shrapnel_boom_left_1_2 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_boom_left_2_2 = addImage('images/shooter/shrapnel_2.png');
                  
                            shrapnel_boom_left_1_2.x = item.x + 34;
                            shrapnel_boom_left_1_2.y = item.y + 35;
                            shrapnel_boom_left_2_2.x = item.x + 25;
                            shrapnel_boom_left_2_2.y = item.y + 34;

                        

                            shrapnel_boom_left_1_2.width = 40;
                            shrapnel_boom_left_1_2.height = 35;
                            shrapnel_boom_left_1_2.alpha = 1;
                            let move_boom_left_2_1 = setInterval(function() {
                                if ( shrapnel_boom_left_1_2.width < 140 &&  shrapnel_boom_left_1_2.height < 140) {
                                    shrapnel_boom_left_1_2.anchor.set(0.2);
                                    shrapnel_boom_left_1_2.width += 2;
                                    shrapnel_boom_left_1_2.height += 2;  
                                    shrapnel_boom_left_1_2.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boom_left_2_1);
                            }, 150);
                            shrapnel_boom_left_2_2.width = 60;
                            shrapnel_boom_left_2_2.height = 55;
                            shrapnel_boom_left_2_2.alpha = 1;
                            let move_boom_left_2_2 = setInterval(function() {
                                if ( shrapnel_boom_left_2_2.width < 150 &&  shrapnel_boom_left_2_2.height < 150) {
                                    shrapnel_boom_left_2_2.anchor.set(0.2);
                                    shrapnel_boom_left_2_2.width += 2;
                                    shrapnel_boom_left_2_2.height += 2;  
                                    shrapnel_boom_left_2_2.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(move_boom_left_2_2);
                            }, 150);

                            let move_boom_left_2_3 = setInterval(function() {
                                shrapnel_boom_left_1_2.visible = false;
                                shrapnel_boom_left_2_2.visible = false;
                             
                            }, 150)
                            setTimeout(function() {
                                clearInterval(move_boom_left_2_3);
                            }, 150);

                            score += 50;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = 800;
                            }, 10); 
                            break;
                    };  
                };   
            });

            // Bom right
            boomRight.forEach(function(item, i){
                if (hitRect(item, rectNum)) {
                    fl = 1;              
                    switch (i) {
                        case 0: 
                            item.visible = true;
                            let shrapnel_boom_right_1_1 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_boom_right_2_1 = addImage('images/shooter/shrapnel_2.png');
                       
                            shrapnel_boom_right_1_1.x = item.x + 34;
                            shrapnel_boom_right_1_1.y = item.y + 35;
                            shrapnel_boom_right_2_1.x = item.x + 25;
                            shrapnel_boom_right_2_1.y = item.y + 34;


                            shrapnel_boom_right_1_1.width = 40;
                            shrapnel_boom_right_1_1.height = 35;
                            shrapnel_boom_right_1_1.alpha = 1;
                            let move_boom_right_1_1 = setInterval(function() {
                                if ( shrapnel_boom_right_1_1.width < 140 &&  shrapnel_boom_right_1_1.height < 140) {
                                    shrapnel_boom_right_1_1.anchor.set(0.2);
                                    shrapnel_boom_right_1_1.width += 2;
                                    shrapnel_boom_right_1_1.height += 2;  
                                    shrapnel_boom_right_1_1.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boom_right_1_1);
                            }, 150);
                            shrapnel_boom_right_2_1.width = 60;
                            shrapnel_boom_right_2_1.height = 55;
                            shrapnel_boom_right_2_1.alpha = 1;
                            let move_boom_right_1_2 = setInterval(function() {
                                if ( shrapnel_boom_right_2_1.width < 150 &&  shrapnel_boom_right_2_1.height < 150) {
                                shrapnel_boom_right_2_1.anchor.set(0.2);
                                shrapnel_boom_right_2_1.width += 2;
                                shrapnel_boom_right_2_1.height += 2;  
                                shrapnel_boom_right_2_1.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boom_right_1_2);
                            }, 150);

                            let move_boom_right_1_3 = setInterval(function() {
                                shrapnel_boom_right_1_1.visible = false;
                                shrapnel_boom_right_2_1.visible = false;
                              
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_boom_right_1_3);
                            }, 150);

                            score += 50;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = -200;
                            }, 10); 
                            break;
                        case 1: 
                            item.visible = true;
                            let shrapnel_boom_right_1_2 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_boom_right_2_2 = addImage('images/shooter/shrapnel_2.png');
                   
                            shrapnel_boom_right_1_2.x = item.x + 34;
                            shrapnel_boom_right_1_2.y = item.y + 35;
                            shrapnel_boom_right_2_2.x = item.x + 25;
                            shrapnel_boom_right_2_2.y = item.y + 34;

                            shrapnel_boom_right_1_2.width = 40;
                            shrapnel_boom_right_1_2.height = 35;
                            shrapnel_boom_right_1_2.alpha = 1;
                            let move_boom_right_2_1 = setInterval(function() {
                                if ( shrapnel_boom_right_1_2.width < 140 &&  shrapnel_boom_right_1_2.height < 140) {
                                    shrapnel_boom_right_1_2.anchor.set(0.2);
                                    shrapnel_boom_right_1_2.width += 2;
                                    shrapnel_boom_right_1_2.height += 2;  
                                    shrapnel_boom_right_1_2.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boom_right_2_1);
                            }, 150);
                            shrapnel_boom_right_2_2.width = 60;
                            shrapnel_boom_right_2_2.height = 55;
                            shrapnel_boom_right_2_2.alpha = 1;
                            let move_boom_right_2_2 = setInterval(function() {
                                if ( shrapnel_boom_right_2_2.width < 150 &&  shrapnel_boom_right_2_2.height < 150) {
                                shrapnel_boom_right_2_2.anchor.set(0.2);
                                shrapnel_boom_right_2_2.width += 2;
                                shrapnel_boom_right_2_2.height += 2;  
                                shrapnel_boom_right_2_2.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boom_right_2_2);
                            }, 150);

                            let move_boom_right_2_3 = setInterval(function() {
                                shrapnel_boom_right_1_2.visible = false;
                                shrapnel_boom_right_2_2.visible = false;
                          
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_boom_right_2_3);
                            }, 150);

                            score += 50;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = -200;
                            }, 10);  
                            break;
                    };  
                };   
            });

            // Boss left
            bossLeft.forEach(function(item, i){
                if (hitRect(item, rectNum)) {
                    fl = 1;              
                    switch (i) {
                        case 0: 
                            item.visible = true;
                            let shrapnel_boss_left_1_1 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_boss_left_2_1 = addImage('images/shooter/shrapnel_2.png');
                      
                            shrapnel_boss_left_1_1.x = item.x + 34;
                            shrapnel_boss_left_1_1.y = item.y + 35;
                            shrapnel_boss_left_2_1.x = item.x + 25;
                            shrapnel_boss_left_2_1.y = item.y + 34;

                            shrapnel_boss_left_1_1.width = 40;
                            shrapnel_boss_left_1_1.height = 35;
                            shrapnel_boss_left_1_1.alpha = 1;
                            let move_boss_left_1_1 = setInterval(function() {
                                if ( shrapnel_boss_left_1_1.width < 140 &&  shrapnel_boss_left_1_1.height < 140) {
                                    shrapnel_boss_left_1_1.anchor.set(0.2);
                                    shrapnel_boss_left_1_1.width += 2;
                                    shrapnel_boss_left_1_1.height += 2;  
                                    shrapnel_boss_left_1_1.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boss_left_1_1);
                            }, 150);
                            shrapnel_boss_left_2_1.width = 60;
                            shrapnel_boss_left_2_1.height = 55;
                            shrapnel_boss_left_2_1.alpha = 1;
                            let move_boss_left_1_2 = setInterval(function() {
                                if ( shrapnel_boss_left_2_1.width < 150 &&  shrapnel_boss_left_2_1.height < 150) {
                                    shrapnel_boss_left_2_1.anchor.set(0.2);
                                    shrapnel_boss_left_2_1.width += 2;
                                    shrapnel_boss_left_2_1.height += 2;  
                                    shrapnel_boss_left_2_1.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boss_left_1_2);
                            }, 150);

                            let move_boss_left_1_3 = setInterval(function() {
                                shrapnel_boss_left_1_1.visible = false;
                                shrapnel_boss_left_2_1.visible = false;
                            
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_boss_left_1_3);
                            }, 150);

                            score += 100;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = 800;
                            }, 10);  
                            break;
                        case 1: 
                            item.visible = true;
                            let shrapnel_boss_left_1_2 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_boss_left_2_2 = addImage('images/shooter/shrapnel_2.png');
                           
                            shrapnel_boss_left_1_2.x = item.x + 34;
                            shrapnel_boss_left_1_2.y = item.y + 35;
                            shrapnel_boss_left_2_2.x = item.x + 25;
                            shrapnel_boss_left_2_2.y = item.y + 34;

                           
                            shrapnel_boss_left_1_2.width = 40;
                            shrapnel_boss_left_1_2.height = 35;
                            shrapnel_boss_left_1_2.alpha = 1;
                            let move_boss_left_2_1 = setInterval(function() {
                                if ( shrapnel_boss_left_1_2.width < 140 &&  shrapnel_boss_left_1_2.height < 140) {
                                    shrapnel_boss_left_1_2.anchor.set(0.2);
                                    shrapnel_boss_left_1_2.width += 2;
                                    shrapnel_boss_left_1_2.height += 2;  
                                    shrapnel_boss_left_1_2.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boss_left_2_1);
                            }, 150);
                            shrapnel_boss_left_2_2.width = 60;
                            shrapnel_boss_left_2_2.height = 55;
                            shrapnel_boss_left_2_2.alpha = 1;
                            let move_boss_left_2_2 = setInterval(function() {
                                if ( shrapnel_boss_left_2_2.width < 150 &&  shrapnel_boss_left_2_2.height < 150) {
                                    shrapnel_boss_left_2_2.anchor.set(0.2);
                                    shrapnel_boss_left_2_2.width += 2;
                                    shrapnel_boss_left_2_2.height += 2;  
                                    shrapnel_boss_left_2_2.alpha -= 0.12;  
                                };   
                            }, 40);
                            setTimeout(function(){
                                clearInterval(move_boss_left_2_2);
                            }, 150);

                            let move_boss_left_2_3 = setInterval(function() {
                                shrapnel_boss_left_1_2.visible = false;
                                shrapnel_boss_left_2_2.visible = false;
                            
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_boss_left_2_3);
                            }, 150)

                            score += 100;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = 800;
                            }, 10);  
                            break;
                    };  
                };   
            });

            // Boss right
            bossRight.forEach(function(item, i){
                if (hitRect(item, rectNum)) {
                    fl = 1;              
                    switch (i) {
                        case 0: 
                            item.visible = true;
                            let shrapnel_boss_right_1_1 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_boss_right_2_1 = addImage('images/shooter/shrapnel_2.png');
                       
                            shrapnel_boss_right_1_1.x = item.x + 34;
                            shrapnel_boss_right_1_1.y = item.y + 35;
                            shrapnel_boss_right_2_1.x = item.x + 25;
                            shrapnel_boss_right_2_1.y = item.y + 34;


                            shrapnel_boss_right_1_1.width = 40;
                            shrapnel_boss_right_1_1.height = 35;
                            shrapnel_boss_right_1_1.alpha = 1;
                            let move_boss_right_1_1 = setInterval(function() {
                                if ( shrapnel_boss_right_1_1.width < 140 &&  shrapnel_boss_right_1_1.height < 140) {
                                shrapnel_boss_right_1_1.anchor.set(0.2);
                                shrapnel_boss_right_1_1.width += 2;
                                shrapnel_boss_right_1_1.height += 2;  
                                shrapnel_boss_right_1_1.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boss_right_1_1);
                            }, 150);
                            shrapnel_boss_right_2_1.width = 60;
                            shrapnel_boss_right_2_1.height = 55;
                            shrapnel_boss_right_2_1.alpha = 1;
                            let move_boss_right_1_2 = setInterval(function() {
                                if ( shrapnel_boss_right_2_1.width < 150 &&  shrapnel_boss_right_2_1.height < 150) {
                                    shrapnel_boss_right_2_1.anchor.set(0.2);
                                    shrapnel_boss_right_2_1.width += 2;
                                    shrapnel_boss_right_2_1.height += 2;  
                                    shrapnel_boss_right_2_1.alpha -= 0.12; 
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boss_right_1_2);
                            }, 150);

                            let move_boss_right_1_3 = setInterval(function() {
                                shrapnel_boss_right_1_1.visible = false;
                                shrapnel_boss_right_2_1.visible = false;
                               
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_boss_right_1_3);
                            }, 150);

                            score += 100;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = -200;
                            }, 10);  
                            break;

                        case 1: 
                            item.visible = true;
                            let shrapnel_boss_right_1_2 = addImage('images/shooter/shrapnel_1.png');
                            let shrapnel_boss_right_2_2 = addImage('images/shooter/shrapnel_2.png');
                        
                            shrapnel_boss_right_1_2.x = item.x + 34;
                            shrapnel_boss_right_1_2.y = item.y + 35;
                            shrapnel_boss_right_2_2.x = item.x + 25;
                            shrapnel_boss_right_2_2.y = item.y + 34;

                           
                            shrapnel_boss_right_1_2.width = 40;
                            shrapnel_boss_right_1_2.height = 35;
                            shrapnel_boss_right_1_2.alpha = 1;
                            let move_boss_right_2_1 = setInterval(function() {
                                if ( shrapnel_boss_right_1_2.width < 140 &&  shrapnel_boss_right_1_2.height < 140) {
                                shrapnel_boss_right_1_2.anchor.set(0.2);
                                shrapnel_boss_right_1_2.width += 2;
                                shrapnel_boss_right_1_2.height += 2;  
                                shrapnel_boss_right_1_2.alpha -= 0.06;
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boss_right_2_1);
                            }, 150);
                            shrapnel_boss_right_2_2.width = 60;
                            shrapnel_boss_right_2_2.height = 55;
                            shrapnel_boss_right_2_2.alpha = 1;
                            let move_boss_right_2_2 = setInterval(function() {
                                if ( shrapnel_boss_right_2_2.width < 150 &&  shrapnel_boss_right_2_2.height < 150) {
                                shrapnel_boss_right_2_2.anchor.set(0.2);
                                shrapnel_boss_right_2_2.width += 2;
                                shrapnel_boss_right_2_2.height += 2;  
                                shrapnel_boss_right_2_2.alpha -= 0.12; 
                                };   
                            }, 40);
                            setTimeout(function() {
                                clearInterval(move_boss_right_2_2);
                            }, 150);

                            let move_boss_right_2_3 = setInterval(function() {
                                shrapnel_boss_right_1_2.visible = false;
                                shrapnel_boss_right_2_2.visible = false;
                              
                            }, 150);
                            setTimeout(function() {
                                clearInterval(move_boss_right_2_3);
                            }, 150);

                            score += 100;
                            if (score < 100) {
                                scoreText_2 = '000' + score;
                                scoreNumber.text = scoreText_2;  
                            } else if (score < 1000) {
                                scoreText_2 = '00' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 10000) {
                                scoreText_2 = '0' + score;
                                scoreNumber.text = scoreText_2;
                            } else if (score < 100000) {
                                scoreText_2 = score;
                                scoreNumber.text = scoreText_2;
                            };
                            setTimeout(function() {
                                item.x = -200;
                            }, 10);  
                            break;
                    }; 
                };   
            });

            // Display hit
            if (fl === 1) {
                hits[index].visible = true;
                hits[index].width = 120;
                hits[index].height = 55;
                hits[index].alpha = 1;
                var interval_1 = setInterval(function() {
                    if ( hits[index].width < 220 &&  hits[index].height < 220) {
                        hits[index].anchor.set(0.2);
                        hits[index].width += 4;
                        hits[index].height += 4;  
                        hits[index].alpha -= 0.06;  
                    };   
                }, 40);
                setTimeout(function() {
                    hits[index].visible = false;
                    clearInterval(interval_1);
                }, 250);    
            } else {
                misss[index].visible = true;
                misss[index].width = 120;
                misss[index].height = 55;
                misss[index].alpha = 1;
                var interval_2 = setInterval(function() {
                    if ( misss[index].width < 220 &&  misss[index].height < 220) {
                        misss[index].anchor.set(0.2);
                        misss[index].width += 4;
                        misss[index].height += 4;  
                        misss[index].alpha -= 0.06;  
                    };  
                }, 40);
                setTimeout(function() {
                    misss[index].visible = false;
                    clearInterval(interval_2);
                }, 250);
            };   
        });
    });
};

// Display ufo with different speed
function displayUfo(itemUfo) {
    for (let i = 0; i < itemUfo.length; i++) {
        if (itemUfo[i].isplay) {
            switch (itemUfo) {
                case ufoBlueLeft: {
                    if (itemUfo[i].x < 620) {
                        if (GAME_TIME >= 60) {
                            itemUfo[i].x += 6;
                        } else if (GAME_TIME > 30) {
                            itemUfo[i].x += 7;
                        } else {
                            itemUfo[i].x += 8;
                        };
                        let denta = itemUfo[i].tmp ? itemUfo[i].tmp : 0.004;
                        itemUfo[i].y = denta*itemUfo[i].x*itemUfo[i].x - 1.1*itemUfo[i].x + 150;
                    } else {
                        itemUfo[i].x = -100;
                        itemUfo[i].isplay = false;
                        do {
                            itemUfo[i].tmp =  Math.random(0.005, 0.006) / 100; 
                        } while (itemUfo[i].tmp < 0.00181 || itemUfo[i].tmp > 0.00601)
                    };
                };
                    break;

                case ufoBlueRight: {
                    if (itemUfo[i].x > -100) {
                        if (GAME_TIME >= 60) {
                            itemUfo[i].x -= 6;
                        } else if (GAME_TIME > 30) {
                            itemUfo[i].x -= 7;
                        } else {
                            itemUfo[i].x -= 8;
                        };
                        let denta = itemUfo[i].tmp ? itemUfo[i].tmp : 0.002;
                        itemUfo[i].y = denta*itemUfo[i].x*itemUfo[i].x - 1.2*itemUfo[i].x + 250;
                    } else {
                        itemUfo[i].x = 600;
                        itemUfo[i].isplay = false;
                        do {
                            itemUfo[i].tmp =  Math.random(0.005, 0.006) / 100;
                        } while (itemUfo[i].tmp < 0.00191 || itemUfo[i].tmp > 0.00331)   
                    };
                };
                    break;

                case ufoYellowLeft: {
                    if (itemUfo[i].x < 620) {
                        if (GAME_TIME >= 60) {
                            itemUfo[i].x += 6;
                        } else if (GAME_TIME > 30) {
                            itemUfo[i].x += 7;
                        } else {
                            itemUfo[i].x += 8;
                        }
                        let denta = itemUfo[i].tmp ? itemUfo[i].tmp : 0.004;
                        itemUfo[i].y = denta*itemUfo[i].x*itemUfo[i].x - 1.1*itemUfo[i].x + 150;
                    } else {
                        itemUfo[i].x = -100;
                        itemUfo[i].isplay = false;
                        do {
                            itemUfo[i].tmp =  Math.random(0.005, 0.006) / 100; 
                        } while (itemUfo[i].tmp < 0.00181 || itemUfo[i].tmp > 0.00601)
                    };
                };
                    break;

                case ufoYellowRight: {
                    if (itemUfo[i].x > -100) {
                        if (GAME_TIME >= 60) {
                            itemUfo[i].x -= 6;
                        } else if (GAME_TIME > 30) {
                            itemUfo[i].x -= 7;
                        } else {
                            itemUfo[i].x -= 8;
                        };
                        let denta = itemUfo[i].tmp ? itemUfo[i].tmp : 0.002;
                        itemUfo[i].y = denta*itemUfo[i].x*itemUfo[i].x - 1.2*itemUfo[i].x + 250;
                    } else {
                        itemUfo[i].x = 600
                        itemUfo[i].isplay = false
                        do {
                            itemUfo[i].tmp =  Math.random(0.005, 0.006) / 100;
                        } while (itemUfo[i].tmp < 0.00191 || itemUfo[i].tmp > 0.00331)   
                    };
                };
                    break;

                case ufoRedLeft: {
                    if (itemUfo[i].x < 500) {
                        if (GAME_TIME >= 60) {
                            itemUfo[i].x += 6;
                        } else if (GAME_TIME > 30) {
                            itemUfo[i].x += 7;
                        } else {
                            itemUfo[i].x += 8;
                        };
                    } else {
                        itemUfo[i].x = -100;
                        itemUfo[i].isplay = false;
                    };
                };
                    break;

                case ufoRedRight: {
                    if (itemUfo[i].x > -100) {
                        if (GAME_TIME >= 60) {
                            itemUfo[i].x -= 6;
                        } else if (GAME_TIME > 30) {
                            itemUfo[i].x -= 7;
                        } else {
                            itemUfo[i].x -= 8;
                        };
                    } else {
                        itemUfo[i].x = 600;
                        itemUfo[i].isplay = false;
                    };
                };
                    break;

                case clockLeft: {
                    if (itemUfo[i].x < 520) {
                        itemUfo[i].x += 10;
                    }  else {
                        itemUfo[i].x = -100;
                        itemUfo[i].isplay = false;
                    };
                };
                    break;

                case clockRight: {
                    if (itemUfo[i].x > -120) {
                        itemUfo[i].x -= 10;
                    } else {
                        itemUfo[i].x = 600;
                        itemUfo[i].isplay = false;
                    };
                };
                    break;

                case boomLeft: {
                    if (itemUfo[i].x < 520) {
                        itemUfo[i].x += 10;
                    }  else {
                        itemUfo[i].x = -100;
                        itemUfo[i].isplay = false;
                    };
                };
                    break;
                case boomRight: {
                    if (itemUfo[i].x > -120) {
                        itemUfo[i].x -= 10;
                    } else {
                        itemUfo[i].x = 600;
                        itemUfo[i].isplay = false;
                    };
                };
                    break;

                case bossLeft: {
                    if (itemUfo[i].x < 500) {
                        itemUfo[i].x += 12;
                    }  else {
                        itemUfo[i].x = -120;
                        itemUfo[i].isplay = false;
                    };
                };
                    break;

                case bossRight: {
                    if (itemUfo[i].x > -150) {
                        itemUfo[i].x -= 12;
                    } else {
                        itemUfo[i].x = 620;
                        itemUfo[i].isplay = false;
                    };
                };
                break;
            };
        };
    };
};

// Level 1: one ufo appear
function handleLevel1() {
    let MAXTIME_1 = 90;
    let flag_1 = Math.floor(Math.random() * 7);
    if (timeInterval > MAXTIME_1 && GAME_TIME > 60 ) {
        if (flag_1 === 0) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoBlueLeft[posi].isplay = true; 
                timeInterval = 0;     
                ufoCount_1 += 1    
            };
        } else if (flag_1 === 1) {
            do {
                posi = Math.floor(Math.random() * 2)
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoBlueRight[posi].isplay = true; 
                timeInterval = 0; 
                ufoCount_1 += 1           
            };
        } else if (flag_1 === 2) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoYellowLeft[posi].isplay = true; 
                timeInterval = 0; 
                ufoCount_1 += 1             
            };
        } else if (flag_1 === 3) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoYellowRight[posi].isplay = true; 
                timeInterval = 0;
                ufoCount_1 += 1              
            };
        } else if (flag_1 === 4) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoRedLeft[posi].isplay = true; 
                timeInterval = 0;
                ufoCount_1 += 1          
            };
        } else if (flag_1 === 5) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoRedRight[posi].isplay = true;   
                timeInterval = 0; 
                ufoCount_1 += 1          
            };        
        };
    };
    if (ufoCount_1 > 20 && timeInterval > MAXTIME_1) {
        do {
            posi = Math.floor(Math.random() * 2);
        } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
        if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
            clockRight[posi].isplay = true;   
            timeInterval = 0; 
            ufoCount_1  = 0;      
        };    
    };
};

// Level 2: two ufo appear
function handleLevel2() {
    let MAXTIME_2 = 90;
    let flag_2 = Math.floor(Math.random() * 14);
    if (timeInterval > MAXTIME_2 && GAME_TIME < 60 ) {
        if (flag_2 === 0) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoBlueLeft[posi].isplay = true;
                ufoBlueRight[posi].isplay = true;
                timeInterval = 0;
                ufoCount_2 += 1;
                ufoCount_3 += 1;
                ufoCount_4 += 1;
            };
        } else if (flag_2 === 1) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoBlueLeft[posi].isplay = true; 
                ufoYellowRight[posi].isplay = true;
                timeInterval = 0; 
                ufoCount_2 += 1;  
                ufoCount_3 += 1;  
                ufoCount_4 += 1;     
            };
        } else if (flag_2 === 2) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoBlueLeft[posi].isplay = true; 
                ufoYellowLeft[posi].isplay = true;
                timeInterval = 0;  
                ufoCount_2 += 1;  
                ufoCount_3 += 1;  
                ufoCount_4 += 1;     
            };
        } else if (flag_2 === 3) {
            do {
            qposi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoYellowLeft[posi].isplay = true; 
                ufoBlueRight[posi].isplay = true;
                timeInterval = 0;   
                ufoCount_2 += 1;  
                ufoCount_3 += 1; 
                ufoCount_4 += 1;      
            };
        } else if (flag_2 === 5) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoYellowRight[posi].isplay = true;
                ufoYellowLeft[posi].isplay = true;
                timeInterval = 0;  
                ufoCount_2 += 1;  
                ufoCount_3 += 1; 
                ufoCount_4 += 1;        
            };
        } else if (flag_2 === 6) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoRedLeft[posi].isplay = true; 
                ufoBlueLeft[posi].isplay = true;
                timeInterval = 0;   
                ufoCount_2 += 1;  
                ufoCount_3 += 1; 
                ufoCount_4 += 1;     
            };
        } else if (flag_2 === 7) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoBlueLeft[posi].isplay = true; 
                ufoBlueRight[posi].isplay = true;
                timeInterval = 0; 
                ufoCount_2 += 1;  
                ufoCount_3 += 1;  
                ufoCount_4 += 1;             
            };   
        } else if (flag_2 === 8) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoBlueRight[posi].isplay = true; 
                ufoYellowRight[posi].isplay = true;
                timeInterval = 0;   
                ufoCount_2 += 1;  
                ufoCount_3 += 1;  
                ufoCount_4 += 1;           
            };   
        } else if (flag_2 === 9) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoBlueRight[posi].isplay = true; 
                ufoYellowLeft[posi].isplay = true;
                timeInterval = 0;  
                ufoCount_2 += 1; 
                ufoCount_3 += 1;  
                ufoCount_4 += 1;             
            };  
        }  else if (flag_2 === 10) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoRedRight[posi].isplay = true; 
                ufoBlueLeft[posi].isplay = true;
                timeInterval = 0;    
                ufoCount_2 += 1;   
                ufoCount_3 += 1;    
                ufoCount_4 += 1;
            };
        } else if (flag_2 === 11) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoRedRight[posi].isplay = true; 
                ufoBlueRight[posi].isplay = true;
                timeInterval = 0;   
                ufoCount_2 += 1;  
                ufoCount_3 += 1;      
                ufoCount_4 += 1;       
            };   
        } else if (flag_2 === 12) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoBlueRight[posi].isplay = true; 
                ufoYellowLeft[posi].isplay = true;
                timeInterval = 0;   
                ufoCount_2 += 1;  
                ufoCount_3 += 1; 
                ufoCount_4 += 1;            
            };   
        } else if (flag_2 === 13) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                ufoBlueRight[posi].isplay = true; 
                ufoRedLeft[posi].isplay = true;
                timeInterval = 0; 
                ufoCount_2 += 1; 
                ufoCount_3 += 1;  
                ufoCount_4 += 1;              
            };   
        }; 
        // Clock appear
        if (ufoCount_2 > 4 && timeInterval > 1) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                clockLeft[posi].isplay = true; 
                ufoYellowRight[posi].isplay = true;
                timeInterval = 0; 
                ufoCount_2 = 0;    
            };    
        };
        // Boom appear
        if (ufoCount_4 > 3 && timeInterval > 1) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                boomRight[posi].isplay = true; 
                ufoBlueRight[posi].isplay = true;
                timeInterval = 0; 
                ufoCount_4 = 0;    
            };    
        };
        // Boss appear
        if (ufoCount_3 > 5 && timeInterval > 1) {
            do {
                posi = Math.floor(Math.random() * 2);
            } while (ufoBlueLeft[posi].isplay == true && ufoBlueRight[posi].isplay == true && ufoYellowLeft[posi].isplay == true && ufoYellowRight[posi].isplay == true && ufoRedLeft[posi].isplay == true && ufoRedRight[posi].isplay == true && clockLeft[posi].isplay == true && clockRight[posi].isplay && boomLeft[posi].isplay == true && boomRight[posi].isplay == true && bossLeft[posi].isplay == true && bossRight[posi].isplay == true)
            if (!ufoBlueLeft[posi].isplay == true && !ufoBlueRight[posi].isplay == true && !ufoYellowLeft[posi].isplay == true && !ufoYellowRight[posi].isplay == true && !ufoRedLeft[posi].isplay == true && !ufoRedRight[posi].isplay == true && !clockLeft[posi].isplay == true && !clockRight[posi].isplay && !boomLeft[posi].isplay == true && !boomRight[posi].isplay == true && !bossLeft[posi].isplay == true && !bossRight[posi].isplay == true) {
                bossRight[posi].isplay = true; 
                ufoBlueLeft[posi].isplay = true;  
                timeInterval = 0; 
                ufoCount_3 = 0;      
            };    
        };    
    };
};

// Handle random ufo from the screen
function gameLoop() { 
    if (GAME_TIME > 0) {
        timeInterval += 1;
        handleLevel1();
        handleLevel2();
        displayUfo(ufoBlueLeft);
        displayUfo(ufoBlueRight);
        displayUfo(ufoYellowLeft);
        displayUfo(ufoYellowRight);
        displayUfo(ufoRedLeft)
        displayUfo(ufoRedRight)
        displayUfo(clockLeft);
        displayUfo(clockRight);
        displayUfo(boomLeft);
        displayUfo(boomRight);
        displayUfo(bossLeft);
        displayUfo(bossRight);
    };
};

// Add result on the screen
function addResultScreen() {
    gameEnd = new Container();
    app.stage.addChild(gameEnd);
    backgroundResult = addImage('images/shooter/start_screen.png');
    gameEnd.addChild(backgroundResult);
    let resultTitle = new Text('-成績発表-', resultTitleStyle);
    resultTitle.x = 79;
    resultTitle.y = 40;
    gameEnd.addChild(resultTitle);
    resultTable = addImage('images/shooter/resultTable.png', 46, 175);
    resultTable.scale.x = 0.6;
    resultTable.scale.y = 0.6;
    gameEnd.addChild(resultTable);
    resultText = new Text('スコア', resultStyle)
    resultText.x = 85
    resultText.y = 218
    gameEnd.addChild(resultText)
    resultScore = addText(score, resultStyle);
    resultScore.x = 300;
    resultScore.y = 218;
    gameEnd.addChild(resultScore);
    let endBtn = new Text('もう一度', endTextStyle);
    endBtn.x = 157;
    endBtn.y = 377;
    endBtn.buttonMode = true;
    endBtn.interactive = true;
    gameEnd.addChild(endBtn);
    endBtn.alpha = 0;
    var valpha = 1;
    var endInterval = setInterval(function () {
        if (endBtn.alpha > 1) {
            valpha = -1;
        } else if (endBtn.alpha < 0) {
            valpha = 1;
        }
        endBtn.alpha += (0.1) * valpha;
    }, 55)
    endBtn.on('pointerdown', function() {
        clearInterval(endInterval)
        gameEnd.visible = false;
        gameScene.visible = true;
        gameScene.removeChildren();
        gameScene.addChild(startText);
        startText.visible = true;
        startText.x = 400;
        startText.y = 200;
        let moveStartText = setInterval( function () {
            if (startText.x > 15) {
                startText.x -= 1.5;
            };
        }, 1);
        setTimeout(function() {
            startText.visible = false;
            clearInterval(moveStartText);
            ufoBlueLeft.forEach(function(item, index) {
                item.visible = true;
                item.x = -100;
            });
            ufoBlueRight.forEach(function(item, index) {
                item.visible = true;
            });
            ufoYellowLeft.forEach(function(item, index) {
                item.visible = true;
                item.x = -100;
            });
            ufoYellowRight.forEach(function(item, index) {
                item.visible = true;
            });
            ufoRedLeft.forEach(function(item, index) {
                item.visible = true;
                item.x = -100;
            });
            ufoRedRight.forEach(function(item, index) {
                item.visible = true;
            });
            clockLeft.forEach(function(item, index) {
                item.visible = true;
            });
            clockRight.forEach(function(item, index) {
                item.visible = true;
            });
            boomLeft.forEach(function(item, index) {
                item.visible = true;
            });
            boomRight.forEach(function(item, index) {
                item.visible = true;
            });
            bossLeft.forEach(function(item, index) {
                item.visible = true;
            });
            bossRight.forEach(function(item, index) {
                item.visible = true;
            });
            rect.forEach(function(item, index) {
                item.buttonMode = true;
                item.interactive = true;
            });
            gameTimeDown = setInterval(function() {
                if (GAME_TIME > 0) {
                    GAME_TIME --;
                    timeNumber.text = GAME_TIME;
                }; 
                if(GAME_TIME == 0) {
                    clearInterval(gameTimeDown);
                    waitingEndGame();
                };
            }, 1200);
            playAgain();          
        }, 1800);
    });
};

// Play again
function playAgain() {
    GAME_TIME = 60;
    score = 0;
    scoreText_2 = '00000'
    gameScene.addChild(time);
    gameScene.addChild(timeText);
    gameScene.addChild(timeNumber);
    timeNumber.visible = true
    timeNumber.text = GAME_TIME;
    gameScene.addChild(scoreTitle);
    gameScene.addChild(scoreNumber);
    scoreNumber.text = scoreText_2;
    gameScene.addChild(rect_1);
    gameScene.addChild(rect_2);
    gameScene.addChild(rect_3);
    gameScene.addChild(rect_4);
    gameScene.addChild(rect_5);
    gameScene.addChild(rect_6);
    gameScene.addChild(rect_7);
    gameScene.addChild(rect_8);
    gameScene.addChild(rect_9);
    gameScene.addChild(miss_1);
    gameScene.addChild(miss_2);
    gameScene.addChild(miss_3);
    gameScene.addChild(miss_4);
    gameScene.addChild(miss_5);
    gameScene.addChild(miss_6);
    gameScene.addChild(miss_7);
    gameScene.addChild(miss_8);
    gameScene.addChild(miss_9);
    gameScene.addChild(hit_1);
    gameScene.addChild(hit_2);
    gameScene.addChild(hit_3);
    gameScene.addChild(hit_4);
    gameScene.addChild(hit_5);
    gameScene.addChild(hit_6);
    gameScene.addChild(hit_7);
    gameScene.addChild(hit_8);
    gameScene.addChild(hit_9);
    gameScene.addChild(ufo_blue_left_1);
    gameScene.addChild(ufo_blue_left_2);
    gameScene.addChild(ufo_blue_right_1);
    gameScene.addChild(ufo_blue_right_2);
    gameScene.addChild(ufo_yellow_left_1);
    gameScene.addChild(ufo_yellow_left_2);
    gameScene.addChild(ufo_yellow_right_1);
    gameScene.addChild(ufo_yellow_right_2);
    gameScene.addChild(ufo_red_left_1);
    gameScene.addChild(ufo_red_left_2);
    gameScene.addChild(ufo_red_right_1);
    gameScene.addChild(ufo_red_right_2);
    gameScene.addChild(clock_left_1);
    gameScene.addChild(clock_left_2);
    gameScene.addChild(clock_right_1);
    gameScene.addChild(clock_right_2);
    gameScene.addChild(boom_left_1);
    gameScene.addChild(boom_left_2);
    gameScene.addChild(boom_right_1);
    gameScene.addChild(boom_right_2);
    gameScene.addChild(boss_left_1);
    gameScene.addChild(boss_left_2);
    gameScene.addChild(boss_right_1);
    gameScene.addChild(boss_right_2);
};
