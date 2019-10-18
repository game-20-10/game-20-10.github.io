// Game setup
const LOGICAL_WIDTH = 240,
    LOGICAL_HEIGHT = 240,
    SCORE_PER_HIT = 10;

let hit = false,
    ballGravity = 0.08,
    personGravity = 0.13,
    state,
    fadeSpeed = 0.04,
    customBtn,
    blinkSpeed = 0.05,
    currentScreen = 1,
    totalScore = 0,
    scoreInterval,
    randomVy,
    C,
    P,
    V,
    // paddingBottom = 48,
    minTabletWidth = 768,
    maxTabletWidth = 1400,
    bigMobileWidth = 700;
    // customLink = "https://plala.s3-ap-northeast-1.amazonaws.com/web/hikari_game/index.html";

let arrAvatar = [
    "../../images/volleyball/avatar_1.png",
    "../../images/volleyball/avatar_2.png",
    "../../images/volleyball/avatar_3.png",
    "../../images/volleyball/avatar_4.png",
    "../../images/volleyball/avatar_5.png",
    "../../images/volleyball/avatar_6.png",
    "../../images/volleyball/avatar_7.png",
    "../../images/volleyball/avatar_8.png",
    "../../images/volleyball/avatar_9.png",
    "../../images/volleyball/avatar_10.png"
]

