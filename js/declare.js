var Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

var logicalWidth = 480;
var logicalHeight = 480;

var app = new Application ({
    width: logicalWidth,
    height: logicalHeight,
    antialiasing: true,
    transparent: true,
    resolution: 1,
    autoResize: true
});

const TIMEMOVE = 10;
var weight = 100;
var score = 0;

var id, timeSub, dfContainer, bgDefault, blackRect, btnDefault, btnDefault_style, introContainer1, dfPosition,
    btnStyle, titleIntro1, frameIntro1, whiteRect1, btnIntro1, btnIntro_style, blackStyle, scoreText, playInterval,
    endStyle, styleClear, clearText, blinkInterval, startStyle, startContainer, bgIntro2, titleIntro2, weightText, 
    mainContainer, bgMain, timeStyle, timeText, timeBar, bodyText, blink1, weightBar, redBar, run, rest, move, bodyResult,
    ibInterval, timeInterval, runInterval, failContainer, bgFail, halo, retryInterval, retry, scoreResult, textResult,
    titleResult, bgEnd, endContainer, whiteStyle,haloInterval, restInterval, winContainer, bgWin, weightChar, vibInterval;

var dfCount = 5,
    introCount = 45,
    vibCount = 3,
    winCount = 10,
    haloCount = 5,
    endCount = 45;

var textJP = {
    btnStart: "次へ",
    tlIntro: "-あそびかた-",
    bodyIntro: "制限時間内に\nバーベルを持ち上げろ！\n \n右側のバーのカーソルを\nタイミングよく止めると\n力を入れて持ち上げるぞ!",
    weight: " kgに挑戦",
    tlEnd: "ー成績発表ー",
    bodyEnd: "スコア",
    btnEnd: "もう一度"
}

document.body.appendChild(app.view);
