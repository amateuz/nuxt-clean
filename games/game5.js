const createGame = (config = {}) => {
  var that;
  var saveBtn;
  var plusBtn;
  var minusBtn;
  var chosen;
  var depthPlusBtn;
  var depthMinusBtn;
  var closeBtn;
  var scale = 0.2;
  var parts = [];

  var commonMusics = ['button_common', 'pic_take', 'pic_set', 'win_common'];

  var gameImgs = ['bubble', 'frame_1', 'frame_2', 'frame_3', 'frame_4',

    'main_popup', 'pause', 'pause_2', 'play', 'play_2', 'speed', 'speed_2', 'stop', 'stop_2'];


  var commonMusics = ['button_common', 'win_common', 'pic_set', 'pic_take'];
  var musics = {};

  var startPos = {
    'common': { 'scale': 0.2 }, 'images': {
      'bubble': { 'x': 287, 'y': 142, 'depth': 0 },
      'frame_1': { 'x': 367, 'y': 565, 'depth': 0 },
      'frame_2': { 'x': 215, 'y': 429, 'depth': 0 },
      'frame_3': { 'x': 367, 'y': 429, 'depth': 0 },
      'frame_4': { 'x': 215, 'y': 565, 'depth': 0 },
      'main_popup': { 'x': 289, 'y': 447, 'depth': -2 }, 'pause': { 'x': 182, 'y': 295, 'depth': 0 }, 'pause_2': { 'x': 182, 'y': 295, 'depth': -1 }, 'play': { 'x': 252, 'y': 295, 'depth': 0 }, 'play_2': { 'x': 252, 'y': 295, 'depth': -1 }, 'speed': { 'x': 327, 'y': 295, 'depth': 0 }, 'speed_2': { 'x': 327, 'y': 295, 'depth': -1 }, 'stop': { 'x': 397, 'y': 295, 'depth': 0 }, 'stop_2': { 'x': 397, 'y': 295, 'depth': -1 }
    }
  };
  var gameObjects = [];

  var endPosForFrame = { 'frame_1': { 'x': 215, 'y': 429, 'depth': 0 }, 'frame_2': { 'x': 367, 'y': 429, 'depth': 0 }, 'frame_3': { 'x': 215, 'y': 565, 'depth': 0 }, 'frame_4': { 'x': 367, 'y': 565, 'depth': 0 } };
  var startDrag = { 'x': 215, 'y': 429 };
  var framePoses = [{ 'x': 215, 'y': 429, 'depth': 0 }, { 'x': 367, 'y': 429 , 'depth': 0 }, { 'x': 215, 'y': 565, 'depth': 0 }, { 'x': 367, 'y': 565, 'depth': 0 }];
  var chosen;
  var tale;
  function preload() {
    that = this;

    gameImgs.forEach(x => {
      that.load.image(x, 'game5/' + x + ".png");
    });

    that.load.image('tutorial', 'game5/tutorial.png');
    that.load.image('start', 'game5/start.png');
    that.load.image('end', 'game5/end.png');
    that.load.image('restart', 'game5/restart.png');
    that.load.image('exit', 'game5/exit.png');
    that.load.audioSprite('tale', 'game5/tale.json', [
      'game5/tale.mp3'
    ]);

    commonMusics.forEach(x => that.load.audio(x, 'common/' + x + '.mp3'));

    that.load.image('close', 'common/close.png')
  }

  function isWin() {
    var right = 0;
    var frames = [];
    for (let i = 1; i <= 4; ++i) {

      var f = gameImgs.indexOf('frame_' + i.toString());
      frames.push(gameObjects[f]);
    }

    for (let i = 1; i <= frames.length; ++i) {
      if (frames[i - 1].x == endPosForFrame['frame_' + i.toString()].x && frames[i - 1].y == endPosForFrame['frame_' + i.toString()].y) {
        ++right;
      }
    }

    console.log("right " + right.toString());

    if (right === 4) {
      return true;
    }

    return false;
  }

  function create() {
    commonMusics.forEach(x => musics[x] = that.sound.add(x));

    let { width, height } = that.sys.game.canvas;

    this.scale.displaySize.setAspectRatio(width / height);
    this.scale.refresh();

    that.input.on('dragstart', function (pointer, gameObject) {
      musics.pic_take.play();
      startDrag = { 'x': gameObject.x, 'y': gameObject.y };
      console.log("start: " + startDrag.toString());
      gameObject.setDepth(2);
      for (let i = 1; i <= 4; ++i) {

        var f = gameImgs.indexOf('frame_' + i.toString());

      }

    });

    that.input.on('dragend', function (pointer, gameObject) {
      musics.pic_set.play();
      console.log(gameObject);
      var frames = [];
      for (let i = 1; i <= 4; ++i) {

        var f = gameImgs.indexOf('frame_' + i.toString());
        frames.push(gameObjects[f]);
      }

      if (!frames.find(x => x === gameObject)) {
        return;
      }

      var g = startDrag;
      var prev = (startDrag.x - gameObject.x) * (startDrag.x - gameObject.x) + (startDrag.y - gameObject.y) * (startDrag.y - gameObject.y);

      framePoses.forEach(fr => {
        var d = (fr.x - gameObject.x) * (fr.x - gameObject.x) + (fr.y - gameObject.y) * (fr.y - gameObject.y);
        if (prev > d) {
          prev = d;
          g = fr;

        }
      });


      var endFrame = frames.find(fr => fr.x == g.x && fr.y == g.y);

      if (endFrame) {
        endFrame.x = startDrag.x;
        endFrame.y = startDrag.y;
      }

      gameObject.x = g.x;
      gameObject.y = g.y;
      gameObject.setDepth(1);

      if (isWin()) {
        var t = 0;
        frames.forEach(x => {
          x.disableInteractive();
          that.tweens.add({
            targets: x,
            scaleX: x.scaleX * 1.2,
            scaleY: x.scaleY * 1.2,
            ease: 'Sine.easeInOut',
            duration: 300,
            delay: t * 50,
            repeat: 1,
            yoyo: true
          });

          t++;
        });

        that.time.delayedCall(2000, () => {
          endGame();
        });
      }

    });

    closeBtn = that.add.image(530, 70, 'close');
    closeBtn.setDepth(7);
    closeBtn.setInteractive({ cursor: 'pointer' });
    closeBtn.setScale(0.625);
    closeBtn.on('pointerdown', function (pointer, localX, localY, event) {
      musics['button_common'].play();
      PhaserNuxt.eventEmitter.emit('close');

    });
    showTutorial();

    tale = that.sound.addAudioSprite('tale');

    that.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      chosen = gameObject;
      gameObject.x = dragX;
      gameObject.y = dragY;

    });

    

  }

  function update() {

  }


  function clamp(min, x, max) {
    return Math.max(Math.min(x, max), min);
  }

  function resetLevel() {
    gameObjects.forEach(p => p.destroy());
    gameObjects = [];
    startDrag = { 'x': 219, 'y': 427 };
    chosen = null;

  }

  function showTutorial() {
    var tutorial = that.add.image(291, 375, 'tutorial');
    tutorial.setScale(0.625);
    tutorial.setDepth(4);
    var startBtn = that.add.image(291, 480, 'start');
    startBtn.setScale(0.625);
    startBtn.setDepth(5);
    startBtn.setInteractive({ cursor: 'pointer' });
    startBtn.on('pointerdown', function (pointer, localX, localY, event) {
      musics['button_common'].play();
      startLevel();
      tutorial.destroy();
      startBtn.destroy();

    });
  }

  function startLevel() {
    gameImgs.forEach(x => {
      var img = that.add.image(startPos.images[x].x, startPos.images[x].y, x);
      img.setScale(startPos.common.scale);
      img.setDepth(startPos.images[x].depth);



      if (x.startsWith('frame')) {
        img.setInteractive({ cursor: 'pointer' });
        img.setDepth(1);
        that.input.setDraggable(img);

      }

      if (x === 'play' || x === 'speed' || x === 'stop' || x === 'pause') {
        {
          img.setInteractive({ cursor: 'pointer' });
          img.on('pointerdown', function (pointer, localX, localY, event) {
            musics['button_common'].play();
            that.alpha = 0;
            if (x === 'play') {
              this.setTexture(x + '_2');
              if (tale.isPaused) {
                tale.resume();
              } else if (tale.isPlaying) {
                tale.setRate(1);
              } else {
                tale.setRate(1);
                tale.play();
              }
            }
            if (x === 'speed') {
              this.setTexture(x + '_2');
              tale.setRate(1.5);
            }
            if (x === 'stop') {
              this.setTexture(x + '_2');
              tale.stop();
            }
            if (x === 'pause') {
              this.setTexture(x + '_2');
              tale.pause();
            }
          });;

          img.on('pointerup', function (pointer, localX, localY, event) {

            this.setTexture(x);
          });
        }
      }

      gameObjects.push(img);
    });


  }

  function restartLevel() {
    resetLevel();
    startLevel();
  }

  function restartGame() {
    curLevel = 1;
    resetLevel();
    startLevel();
  }

  function endGame() {
    musics.win_common.play();
    tale.stop();
    gameObjects.forEach(x => x.destroy());
    var end = that.add.image(291, 375, 'end');
    end.setScale(0.625);
    end.setDepth(5);

    var exitBtn = that.add.image(291, 480, 'exit');
    exitBtn.setScale(0.625);
    exitBtn.setDepth(5);
    exitBtn.setInteractive();
    exitBtn.on('pointerdown', function (pointer, localX, localY, event) {
      musics['button_common'].play();
      PhaserNuxt.eventEmitter.emit('exit');

    });
  }

  return new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'phaser',
    width: 585,
    height: 800,
    transparent: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: 'phaser',
      mode: Phaser.Scale.FIT,
      width: 585,
      height: 800,
    },
    ...config,
  })
}
export default createGame
