let runnerOfLevel = {
    1: ["", "type1", "type1", "type1", "type1", "type1"],
    2: ["type1", "type1", "type2", "type1", "type2", "type1"],
    3: ["type2", "type3", "type2", "type3", "type2", "type3"],
    4: ["type2", "type3", "type2", "type1", "type3", "type2"],
    5: ["type1", "type1", "type3", "type1", "type3", "type1"],
    6: ["type3", "type4", "type3", "type4", "type3", "type4"],
    7: ["type3", "type1", "type3", "type4", "type1", "type3"],
    8: ["type4", "type4", "type4", "type4", "type3", "type4"],
    9: ["type4", "type5", "type5", "type5", "type5", "type5"],
    10: ["type5", "type3", "type3", "type5", "type3", "type3"]
};

let capguyFrames = [ 
    "images/marathon/background_1.png",
    "images/marathon/background_2.png",
    "images/marathon/background_3.png",
];

let options = [
    "images/marathon/Capture_1.PNG",
    "images/marathon/Capture_2.PNG",
    "images/marathon/Capture_3.PNG",
    "images/marathon/Capture_4.PNG",
];

let player = [
    "images/marathon/player_1.png",
    "images/marathon/player_2.png",
];

let playerType2 = [
    "images/marathon/cpu_type1_1.png",
    "images/marathon/cpu_type1_2.png",
];

let playerType3 = [
    "images/marathon/cpu_type2_1.png",
    "images/marathon/cpu_type2_2.png",
];

let cpuType1Url = [
    "images/marathon/cpu_type1_1.png",
    "images/marathon/cpu_type1_2.png"
];

let cpuType2Url = [
    "images/marathon/cpu_type2_1.png",
    "images/marathon/cpu_type2_2.png"
];

let cpuType3Url = [
    "images/marathon/cpu_type3_1.png",
    "images/marathon/cpu_type3_2.png"
];

let cpuType4Url = [
    "images/marathon/cpu_type4_1.png",
    "images/marathon/cpu_type4_2.png"
];

let cpuType5Url = [
    "images/marathon/cpu_type5_1.png",
    "images/marathon/cpu_type5_2.png"
];

// Common
let backgroundUrl = "images/marathon/background.png";
let logoUrl = "images/marathon/logo.png";
let fontFamily_1 = "mplus1pRound";
let fontFamily_2 = "mplus1pRoundLatin";

// Default screen
let startButton = "スタート";

// Main screen
let backgroundTopUrl = "images/marathon/background_top.png";
let btartUrl = "images/marathon/start.png";
let gameOverUrl = "images/marathon/game_over.png";
let playerGameOverUrl = "images/marathon/player_gameOver.png";
let playerGameOverIconUrl = "images/marathon/gameOver_icon.png";
let playerGameOverTextUrl = "images/marathon/gameOver_text.png";
let scoreText = "SCORE";
let winText = "Win!";

// Result screen
let resultBackgroundTopUrl = "images/marathon/background_top.png";
let resultBackgroundBottomUrl = "images/marathon/background_1.png";
let resultTitle = "- 成績発表 -";
let scoreTextJapanese = "スコア";
let restartButton = "もう一度";
let resultTitleImageUrl = "images/marathon/result_title.png";
let resultBoxImageUrl = "images/marathon/result_border.png";

let gameScene, buttonStartText, backgroundAnimation, playerAnimation, scoreValue, start, readyStart = false, CPU = [], playContainer,
countRunner, isGameOver, runnerArray, speed, point, runnerWithRound, level, levelUp = false, levelText, passRunner, isWin, lastRunner,
leftButton, rightButton, customBtn;
