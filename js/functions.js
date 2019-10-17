// Play default screen
function playDefault() {
    dfCount --;
    if (dfCount == 0) {
        btnDefault.alpha += 0.1*btnDefault.va;
        if (btnDefault.alpha <= 0) {
            btnDefault.va = 1;
        } else if (btnDefault.alpha >= 1) {
            btnDefault.va = -1;
        }
        dfCount = 5;
    }
}

// Play intro screen
function playIntro1() {
    introCount --;
    if (introCount == 0) {
        if (btnIntro1.alpha == 1) {
        btnIntro1.alpha = 0;
        } else {
            btnIntro1.alpha = 1;
        }
        introCount = 45;
    }
}

// Play main screen
function playMain() {
    timeBar.width -= 0.6;
    if (timeBar.width <= 3.4) {
        timeBar.width = 0;
        fail();
    }

    run.y -= run.vy;
    if (run.y <= 20) {
        run.vy *= -1;
    } else if (run.y >= 420) {
        run.vy *= -1;
    }

    // Vibrate  
    switch(move.texture) {
        case resources["images/move2.png"].texture:
        case resources["images/move3.png"].texture:
        case resources["images/move4.png"].texture:
        case resources["images/move5.png"].texture:
        case resources["images/move6.png"].texture:
        case resources["images/move7.png"].texture:
        case resources["images/move8.png"].texture:
        vibCount --;
        if (vibCount == 0) {
            move.x += move.vx;
            if (move.x >= dfPosition + 1 ) {
                move.vx *= -1;
            }
            if (move.x <= dfPosition - 1) {
                move.vx *= -1;
            }
            vibCount = 3;
        }
    }
}

// Play win screen
function playWin() {
    winCount --;
    if (winCount == 0) {
        switch(rest.texture) {
        case resources["images/win.png"].texture:
            rest.texture = resources["images/rest1.png"].texture;
            rest.y += 50;
            winCount = 10;
            break;
        case resources["images/rest1.png"].texture:
            rest.texture = resources["images/rest2.png"].texture;
            rest.y += 30;
            rest.x -= 10;
            winCount = 10;
            break;
        case resources["images/rest2.png"].texture:
            rest.texture = resources["images/rest3.png"].texture;
            winCount = 10;
            break;
        case resources["images/rest3.png"].texture:
            rest.texture = resources["images/rest4.png"].texture;
            winCount = 10;
            break;
        case resources["images/rest4.png"].texture:
            rest.texture = resources["images/rest5.png"].texture;
            winCount = 10;
            break;
        case resources["images/rest5.png"].texture:                                
            rest.texture = resources["images/rest6.png"].texture;
            winCount = 10;
            break;                                
        case resources["images/rest6.png"].texture:
            rest.texture = resources["images/rest7.png"].texture;
            winCount = 10;
            break;
        case resources["images/rest7.png"].texture:
            rest.texture = resources["images/rest8.png"].texture;
            winCount = 10;
            break;
        case resources["images/rest8.png"].texture:
            rest.texture = resources["images/rest9.png"].texture;
            winCount = 10;
        }
    }  
}  

// Play halo
function playHalo() {
    haloCount --;
    if (haloCount == 0) {
        halo.rotation += 0.5;
        haloCount = 5;
    }
}

// Play when end
function playEnd() {
    endCount --;
    if (endCount == 0) {
        if (retry.alpha == 1) {
        retry.alpha = 0;
        } else {
            retry.alpha = 1;
        }
        endCount = 45;
    }
}

// Play when fail
function fail() {
    mainContainer.visible = false;
    failContainer.visible = true;

    mainContainer.interactive = false;

    failContainer.addChild(scoreText);
    failContainer.addChild(scoreMain);
    
    // Set cookie when fail
    setCookie('result', score, 1);
    setCookie('turnPlay', Number(getCookie('turnPlay')) + 1, 1);
    location.replace('../result_score.html');

    scoreMain.text = score;    
    scoreResult.text = score;
    scoreResult.x = 430 - scoreResult.width;

    endCount = 45;
    state = playEnd;

    setTimeout( function() {
        failContainer.visible = false; 
        endContainer.visible = true;
        retry.interactive = true;
    }, 1500)
}
  
// Handle when win
function winHandle() {
    mainContainer.visible = false;
    winContainer.visible = true;

    winContainer.addChild(scoreText);
    winContainer.addChild(scoreMain);

    scoreMain.text = score;

    haloCount = 5;
    state = playHalo;
    halo.visible = true;
    clearText.visible = true;

    setTimeout( function() {
        clearText.visible = false;
        halo.visible = false;

        winCount = 10;
        state = playWin;
        setTimeout(function() {
            rest.y -= 80;
            rest.x += 10;
            playAgain();
        }, 2500)
    }, 2200)
}
  
// Handling play again
function playAgain() {
    if (winContainer.visible) {
        winContainer.visible = false;
    }

    weightText.text = weight;
    scoreMain.text = score;

    startContainer.addChild(scoreText);
    startContainer.addChild(scoreMain);

    startContainer.visible = true;

    setTimeout( function() {
        startContainer.visible = false;

        // Reset default value
        bgMain.texture = resources["images/bg_move1.png"].texture;
        move.texture = resources["images/move1.png"].texture;
        rest.texture = resources["images/win.png"].texture;
        timeBar.width = timeBar.wdefault;
        run.y = 420;
        run.vy = 4;
        move.x = 0;
        move.y = 0;

        mainContainer.addChild(scoreText);
        mainContainer.addChild(scoreMain);

        mainContainer.visible = true;
        mainContainer.interactive = true;
        
        vibCount = 3;
        state = playMain;

    }, 2000)
}
