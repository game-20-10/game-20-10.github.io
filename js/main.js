loader
    .add("images/Weightlift.json")
    .add([
    "images/halo.png",
    "images/bg_move1.png",
    "images/move1.png",
    "images/bodyResult.png",
    "images/title_intro2.png",
    "images/move2.png",
    "images/move3.png",
    "images/move4.png",
    "images/move5.png",
    "images/move6.png",
    "images/move7.png",
    "images/move8.png",
    "images/win.png",
    "images/rest1.png",
    "images/rest2.png",
    "images/rest3.png",
    "images/rest4.png",
    "images/rest5.png",
    "images/rest6.png",
    "images/rest7.png",
    "images/rest8.png",
    "images/rest9.png"
    ])
    .load(setup);

function setup() {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    id = resources["images/Weightlift.json"].textures;

    // Add screens
    addDefaultScreen();
    addIntroScreen1();
    addStartScreen();
    addMainScreen();
    addFailScreen();
    addWinScreen();
    addEndScreen();

    state = playDefault;
    app.ticker.add(delta => gameLoop(delta));

    dfPosition = move.x;

    // Listen pointerdown
    blackRect.on("pointerdown", function() {   
        blackRect.interactive = false;
        btnIntro1.interactive = true;

        dfContainer.visible = false;
        introContainer1.visible = true;
        state = playIntro1;
    });

    btnIntro1.on("pointerdown", function() {
        btnIntro1.interactive = false;
        mainContainer.interactive = true;

        introContainer1.visible = false;
        startContainer.visible = true;
        setTimeout( function() {
          startContainer.visible = false;
          mainContainer.visible = true;
          mainContainer.addChild(scoreText);
          mainContainer.addChild(scoreMain);
          state = playMain;
        }, 1000)
    });

    mainContainer.on("pointerdown", function() {
        if (run.y >= 210 && run.y <= 230) {           
          score += Math.round((timeBar.width) / 36);
          timeBar.width = timeBar.wdefault;
          scoreMain.text = score;
          if (run.vy < 0) {
              run.vy *= -1;
          }

          run.y = 420;
          
          if (bgMain.texture == resources["images/bg_move1.png"].texture) {
              bgMain.texture = id["bg25.png"];
          }

          switch (move.texture) {
              case resources["images/move1.png"].texture:
                  move.texture = resources["images/move2.png"].texture;
                  //vibrate(move);
                  break;
              case resources["images/move2.png"].texture:
                  move.texture = resources["images/move3.png"].texture;                   
                  break;
              case resources["images/move3.png"].texture:
                  move.texture = resources["images/move4.png"].texture;
                  break;
              case resources["images/move4.png"].texture: 
                  move.texture = resources["images/move5.png"].texture;
                  break;
              case resources["images/move5.png"].texture: 
                  move.texture = resources["images/move6.png"].texture;
                  move.y = 480 - move.height;
                  bgMain.texture = id["bg68.png"];
                  break;
              case resources["images/move6.png"].texture:
                  move.texture = resources["images/move7.png"].texture;
                  break;
              case resources["images/move7.png"].texture:
                  move.texture = resources["images/move8.png"].texture;
                  move.y = 480 - move.height;
                  break;
              case resources["images/move8.png"].texture:
                  winHandle();
                  mainContainer.interactive = false;               
                  weight += 20;
          }
        } else {
            if (timeBar.width >= 36) {
                timeBar.width -= 36;
            } else {
                timeBar.width = 0;
            }
        }
    })

    retry.on("pointerdown", function() {
        score = 0;
        weight = 100;
        endContainer.visible = false;
        retry.interactive = false;
        playAgain();
    })
    function setCookie(cname, cvalue, exdays) {
        var now = new Date();
        now.setTime(now.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + now.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    setCookie('name', 'tuyen', 1);
}

function gameLoop(delta){
    state(delta);
}
