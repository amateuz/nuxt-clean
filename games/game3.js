const createGame = (config = {}) => {
  var that;
  var piano;
  var closeBtn;
  var bars = [];
  var buttons = [];
  var btns = [];
  var btnsSound = [];
  var startGood = 325;
  var endGood = 486;
  var imgs = ['select1', 'select2', 'select3', 'fail_text', 'win_text'];
  var startPos = {
    'common': { 'scale': 0.625 }, 'images': {
      'piano': { 'x': 285, 'y': 627.5, 'depth': 2, 'rotation': 0, 'flip': false },
      'win_text': { 'x': 291, 'y': 350, 'depth': 5, 'rotation': 0, 'flip': false },
      'fail_text': { 'x': 291, 'y': 350, 'depth': 5, 'rotation': 0, 'flip': false },
      'end': { 'x': 291, 'y': 375, 'depth': -3, 'rotation': 0, 'flip': false },
      'header_word': { 'x': 341, 'y': 279, 'depth': 0, 'rotation': 0, 'flip': false },
      'header_num_1': { 'x': 134, 'y': 279, 'depth': 0, 'rotation': 0, 'flip': false },
      'header_num_2': { 'x': 157, 'y': 279, 'depth': 0, 'rotation': 0, 'flip': false },
      'header_num_3': { 'x': 182, 'y': 279, 'depth': 0, 'rotation': 0, 'flip': false },
      'header_percent': { 'x': 215, 'y': 279, 'depth': 0, 'rotation': 0, 'flip': false },
      'btn1': { 'x': 103, 'y': 645, 'depth': 2, 'rotation': 0, 'flip': false, 'img': 'select1' },
      'btn2': { 'x': 154, 'y': 645, 'depth': 2, 'rotation': 0, 'flip': false, 'img': 'select2' },
      'btn3': { 'x': 203, 'y': 645, 'depth': 2, 'rotation': 0, 'flip': false, 'img': 'select3' },
      'btn4': { 'x': 256, 'y': 645, 'depth': 2, 'rotation': 0, 'flip': false, 'img': 'select1' },
      'btn5': { 'x': 306, 'y': 645, 'depth': 2, 'rotation': 0, 'flip': false, 'img': 'select2' },
      'btn6': { 'x': 356, 'y': 645, 'depth': 2, 'rotation': 0, 'flip': false, 'img': 'select2' },
      'btn7': { 'x': 406, 'y': 645, 'depth': 2, 'rotation': 0, 'flip': false, 'img': 'select3' },
      'btn8': { 'x': 453, 'y': 645, 'depth': 2, 'rotation': 0, 'flip': false, 'img': 'select1' }
    }
  };

  var music = [1, 0, 5, 0, 5, 0, 4, 0, 5, 0, 3, 2, 0, 1, 0, 0, 1, 0, 5, 0, 5, 0, 6, 0, 8, 7, 0,
    0, 0, 0, 0, 0, 7, 0, 2, 0, 2, 0, 6, 0, 6, 0, 5, 4, 0, 3, 0, 0, 1, 0, 5, 0, 5, 0, 4, 0, 5,
    3, 0, 0, 0, 0, 0, 0, 7, 0, 2, 0, 2, 0, 6, 0, 6, 0, 5, 4, 0, 3, 0, 0, 1, 0, 5, 0, 5, 0, 4,
    0, 5, 0, 0, 0, 0, 0, 3];
  var musicIdx = 0;
  var good = 0;
  var wrong = [];
  var nextBarEvent;
  var end = false;
  var that

  var arrange;
  let back;

  var commonMusics = ['button_common', 'win_common', 'pic_set', 'pic_take', 'button_common_target', 'button_add', 'button_add_target'];
  var musics = {};
  function preload() {
    that = this;
    that.load.image('close', 'common/close.png');
    imgs.forEach(x => that.load.image(x, 'game3/' + x + '.png'));
    that.load.image('background', 'game3/piano_background.png');
    that.load.image('bar', 'game3/bar.png');
    that.load.image('piano', 'game3/piano.png');
    that.load.image('tutorial', 'game3/tutorial.png');
    that.load.image('start', 'game3/start.png');
    that.load.image('end', 'game3/end.png');
    that.load.image('restart', 'game3/restart.png');
    that.load.image('exit', 'game3/exit.png');
    that.load.image('1', 'game3/1.png');
    that.load.image('2', 'game3/2.png');
    that.load.image('3', 'game3/3.png');
    that.load.audio('arrange', [
      'game3/yolohka_arrange.mp3'
    ]);

    for (let i = 0; i <= 9; ++i) {
      that.load.image('header_num_' + i.toString(), [
        'game3/header_num_' + i.toString() + '.png'
      ]);
    }

    that.load.image('header_percent', 'game3/header_percent.png');
    that.load.image('header_word', 'game3/header_word.png');

    that.load.image('win_text', 'game3/win_text.png');
    that.load.image('fail_text', 'game3/fail_text.png');



    for (let i = 1; i <= 8; ++i) {
      that.load.audio('note' + i.toString(), [
        'game3/yolohka_piano_' + i.toString() + '.mp3'
      ]);
    }

    for (let i = 1; i <= 3; ++i) {
      that.load.audio('wrong' + i.toString(), 'game3/wrong' + i.toString() + '.mp3');
    }

    commonMusics.forEach(x => that.load.audio(x, 'common/' + x + '.mp3'));
    that.load.image('close', 'common/close.png');
  }

  function create() {
    commonMusics.forEach(x => musics[x] = that.sound.add(x));

    let { width, height } = that.sys.game.canvas;

    this.scale.displaySize.setAspectRatio(width / height);
    this.scale.refresh();

    for (let i = 1; i <= 8; ++i) {
      btnsSound.push(that.sound.add('note' + i.toString()));
    }

    arrange = that.sound.add('arrange');
    for (let i = 1; i <= 3; ++i) {
      wrong.push(that.sound.add('wrong' + i.toString()));
    }

    buttons = [
      that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F),
      that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H),
      that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
      that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
      that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
    ];

    showTutorial();

    closeBtn = that.add.image(530, 70, 'close');
    closeBtn.setDepth(7);
    closeBtn.setInteractive({ cursor: 'pointer' });
    closeBtn.setScale(startPos.common.scale);
    closeBtn.on('pointerdown', function (pointer, localX, localY, event) {
      musics['button_add'].play();
      PhaserNuxt.eventEmitter.emit('close');

    });

  }

  function update() {

    buttons.forEach(x => {
      if (Phaser.Input.Keyboard.JustDown(x)) {
        var btn = btns[buttons.indexOf(x)];

        btn.setTint(0xbbbbbb);
        that.time.delayedCall(300, () => btn.clearTint());
        onBtn(btn);
      }
    });
    var deleted = [];

    bars.forEach(function (item) {
      if (item.y > 500) {
        deleted.push(item);
      }
    });

    bars = bars.filter(function (item) {
      return !deleted.includes(item);
    });

    if (deleted.filter(x => x.state == 'active').length > 0) {
      const i = Math.floor(Math.random() * wrong.length);
 
      wrong[i].play();
    }
    deleted.forEach(x => x.destroy());

    if (bars.length == 0 && musicIdx >= music.length && !end) {
      end = true;
      showEnd();
    }

  }

  function startGame() {
    back = that.add.image(285, 407, null);
    back.setScale(0.625);
    piano = that.add.image(285, 627.5, null);
    piano.setScale(0.625);
    piano.setDepth(2);


    for (let i = 1; i <= 8; ++i) {
      var name = 'btn' + i.toString();
      var info = startPos.images[name];
      var btn = that.add.image(info.x, info.y, info.img);
      btn.setScale(startPos.common.scale);
      btn.setDepth(info.depth);
      btn.setInteractive({ cursor: 'pointer' });
      btn.on('pointerdown', function (pointer, localX, localY, event) {
        this.setTint(0xbbbbbb);
        that.time.delayedCall(300, () => this.clearTint());
        onBtn(this);

      });
      btns.push(btn);
    }

    startLevel();
  }

  function createBar() {
    var speed = 110 * 0.625 * 4;
    if (music[musicIdx] > 0) {
      var bar = that.physics.add.image(104 + 50 * (music[musicIdx] - 1), -50, 'bar');

      bar.depth = 1;
      bar.state = 'active';
      bar.setVelocity(0, speed);

      bar.setScale(1);
      bars.push(bar);
    }
    ++musicIdx;
    if (musicIdx < music.length) {
      nextBarEvent = that.time.delayedCall(1000 / 4, createBar, [], this);
    }
  }

  function getPercent() {
    return Math.floor(good * 100 / music.filter(x => x > 0).length);
  }
  function showResult() {
    var words = [];
    words.push(that.add.image(startPos.images['header_percent'].x, startPos.images['header_percent'].y, 'header_percent'));
    words.push(that.add.image(startPos.images['header_word'].x, startPos.images['header_word'].y, 'header_word'));
    var i = 3;
    var result = Math.floor(good * 100 / music.filter(x => x > 0).length).toString();
    for (let j = result.length; j > 0; --j) {
      words.push(that.add.image(startPos.images['header_num_' + i.toString()].x, startPos.images['header_num_' + i.toString()].y, 'header_num_' + result[j - 1]));
      --i;
    }

    if (getPercent() > 50) {
      words.push(that.add.image(startPos.images['win_text'].x, startPos.images['win_text'].y, 'win_text'));
    } else {
      words.push(that.add.image(startPos.images['fail_text'].x, startPos.images['fail_text'].y, 'fail_text'));
    }

    words.forEach(x => {  x.setScale(startPos.common.scale); x.setDepth(5); });

    return words;
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
      startGame();
      tutorial.destroy();
      startBtn.destroy();

    });


  }

  function showEnd() {
    musics.win_common.play();
    back.destroy();
    piano.destroy();
    btns.forEach(x => x.destroy());
    var end = that.add.image(291, 365, 'end');
    end.setScale(0.625);
    end.setDepth(4);
    var restartBtn = that.add.image(292, 427, 'restart');
    restartBtn.setScale(0.625);
    restartBtn.setDepth(5);
    restartBtn.setInteractive({ cursor: 'pointer' });

    var res = showResult();

    restartBtn.on('pointerdown', function (pointer, localX, localY, event) {
      musics['button_common'].play();
      reset();
      startGame();
      end.destroy();
      restartBtn.destroy();

      res.forEach(x => x.destroy());

      if (exitBtn)
        exitBtn.destroy();
    });


    if (getPercent() > 50) {

      var exitBtn = that.add.image(292, 483, 'exit');
      exitBtn.setScale(0.625);
      exitBtn.setDepth(5);
      exitBtn.setInteractive({ cursor: 'pointer' });
      exitBtn.on('pointerdown', function (pointer, localX, localY, event) {
        musics['button_common'].play();
        PhaserNuxt.eventEmitter.emit('exit');

      });

    }
  }

  function startLevel() {
    back.setTexture('background');
    piano.setTexture('piano');
    var one = that.add.image(291, 200, '3');
    one.setDepth(5);
    arrange.play();
    tween(one, () => {
      one.setTexture('2');
      one.setAlpha(1);
      tween(one, () => {
        one.setTexture('1');
        one.setAlpha(1);

        tween(one, () => {
          one.destroy();

          that.time.delayedCall(2592, createBar);
        });
      });

    });


  }

  function tween(text, onComplete) {
    /*that.tweens.add({
        targets: text,
        alpha: { value: 0.5, duration: 1000, ease: 'Sine.easeInOut' },
        yoyo: false,
        repeat: 1,
        duration: 1000,
        onComplete: onComplete
    }


    );*/
    that.time.delayedCall(1000, onComplete);
  }

  function reset() {
    good = 0;
    musicIdx = 0;
    bars.forEach(x => x.destroy());
    nextBarEvent.remove(false);
    btns = [];
    end = false;
    arrange.stop();
  }

  function onBtn(btn) {
    var oneBars = bars.filter(item => Math.abs(item.x - btn.x) < 10  && item.state == 'active');


    if (oneBars
      .length
      > 0) {

      if (oneBars[0].y >= startGood && oneBars[0].y <= endGood) {
        {
          oneBars[0].setTint(0x00ff00);
          oneBars[0].state = 'inactive';

          var idx = btns.indexOf(btn);
          btnsSound[idx].play();
          ++good;
        }
      } else {
        {
          oneBars[0].setTint(0xff0000);
          oneBars[0].state = 'inactive';

          const i = Math.floor(Math.random() * wrong.length);
          wrong[i].play();
        }
      }
    }
  }

  return new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'phaser',
    width: 585,
    height: 800,
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
    transparent: true,
    audio: {
      disableWebAudio: true
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
