// Create PIXI App
const Application = PIXI.Application,
    Container = PIXI.Container,
    Sprite = PIXI.Sprite,
    loader = PIXI.loader,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text,
    BitmapText = PIXI.extras.BitmapText,
    Texture = PIXI.Texture,
    MovieClip = PIXI.extras.MovieClip;

let app = new Application({
        backgroundColor: 0xffffff,
        width: LOGICAL_WIDTH,
        height: LOGICAL_HEIGHT,
        // antialias: true,
        transparent: true,
        autoResize: true,
        resolution: window.devicePixelRatio || 1
    }),
    backgroundScreen = new Container(),
    gameScreen = new Container(),
    resultScreen = new Container(),
    cardsContainer = new Container();

document.body.appendChild(app.view);
app.stage.addChild(backgroundScreen, gameScreen, resultScreen);

// Load Images
loader
    .add(["../../images/volleyball/sprites.json", "../../images/volleyball/score-text.png"])
    .add([
        "../../images/volleyball/images.jpg",
        "../../images/volleyball/avatar_1.png",
        "../../images/volleyball/avatar_2.png",
        "../../images/volleyball/avatar_3.png",
        "../../images/volleyball/avatar_4.png",
        "../../images/volleyball/avatar_5.png",
        "../../images/volleyball/avatar_6.png",
        "../../images/volleyball/avatar_7.png",
        "../../images/volleyball/avatar_8.png",
        "../../images/volleyball/avatar_9.png",
        "../../images/volleyball/avatar_10.png"])
    .load(setup);

// Game Setup
function setup(loader, res) {
    canvas = document.querySelector("canvas");
    // Get json
    id = res["../../images/volleyball/sprites.json"].textures;

    // Add libraries
    C = SAT.Circle;
    P = SAT.Polygon;
    V = SAT.Vector;
    response = new SAT.Response();
    // Create background
    // Introduce Scene
    renderIntroduceScreen();

    // GameScreen
    renderGameScreen();

    // Result scene
    renderResultScreen();

    // Hide and show screen
    screenDisplay();

    // Event Listener
    listenToEvent();

    // Set resize on device
    resizeHandler();

    // Listen to resize event
    window.addEventListener("resize", resizeHandler);

    // State
    state = gamePause;

    
    
    app.ticker.add(delta => {
        state(delta);
        
    });

   
}

// Game Loop
function gameLoop(delta) {

    // Person animation
    personAnimationLoop(delta);
    // Ball can't go out of the game's screen
    ballWall(delta);

    // Ball Animation
    ballAnimationLoop(delta);

    // Check collision between ball and person
    personBallCollision();
}


// Game Pause
function gamePause(delta) {
    
  
    // Next btn
    fadeAnimation(nextBtn, delta);

    // Start btn
    if (currentScreen === 2) {
        blinkAnimation(startBtn, delta);
    }
}

// Game Over
function gameOver(delta) {
    
    // Restart btn
    blinkAnimation(restartText, delta);
}
