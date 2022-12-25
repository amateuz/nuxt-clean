const createGame = (config = {}) => {
  var gameImgs = ['room', 'avatar', 'items_popup', 'check', 'cloth_1_1', 'cloth_1_2', 'cloth_1_3', 'cloth_2_1', 'cloth_2_2', 'cloth_2_3', 'cloth_3_1', 'cloth_3_2', 'cloth_3_3', 'bubble'];

  var that;
  var startPos = {
    'common': {
      'scale': 0.625, 'items': { 'y': 695, 'd': 75 }
    }, 'images': {
      'room': { 'x': 291, 'y': 401, 'depth': -3 },
      'avatar': { 'x': 285, 'y': 433, 'depth': 2 },
      'item_1': { 'x': 203, 'y': 783, 'depth': 4 },
      'item_2': { 'x': 288, 'y': 783, 'depth': 4 },
      'item_3': { 'x': 374, 'y': 783, 'depth': 4 },
      'check_1': { 'x': 222, 'y': 757, 'depth': 5 },
      'check_2': { 'x': 308, 'y': 757, 'depth': 5 },
      'check_3': { 'x': 394, 'y': 757, 'depth': 5 },
      'bubble': { 'x': 358, 'y': 628, 'depth': 4, 'rotation': 0, 'flip': false },
      'items_popup': { 'x': 289, 'y': 799, 'depth': 3 }
    }
  }; var gameObjects = [];

  var itemsConfig = {
    'head': [{ 'main': 'clothes_3' }, { 'main': 'clothes_4' }, { 'main': 'clothes_2' }],
    'top': [{ 'main': 'clothes_6' }, { 'main': 'clothes_5', 'back': 'clothes_1' }, { 'main': 'clothes_7' }],
    'bottom': [{ 'main': 'clothes_9' }, { 'main': 'clothes_8', }, { 'main': 'clothes_10' }]
  };
  var winItems = {
    'head': 1,
    'top': 1,
    'bottom': 0
  }

  var startItems = {
    'head': 2,
    'top': 0,
    'bottom': 2
  }
  var cloths;
  var items = [];
  var checks = []
  var openItems = [];
  var chosen;
  var chosenCloths;
  var top;
  var head;
  var bottom;
  var bubble;


  var commonMusics = ['button_common', 'win_common', 'pic_set', 'pic_take', 'wearing'];
  var musics = {};

  function preload() {
    that = this;

    gameImgs.forEach(x => {
      this.load.image(x, 'game6/' + x + ".png");
    });

    for (let i = 1; i <= 10; ++i) {
      this.load.image('clothes_' + i.toString(), 'game6/clothes(' + i.toString() + ").png");
    }

    that.load.image('tutorial', 'game6/tutorial.png');
    that.load.image('start', 'game6/start.png');
    that.load.image('end', 'game6/end.png');
    that.load.image('exit', 'game6/exit.png');

    commonMusics.forEach(x => that.load.audio(x, 'common/' + x + '.mp3'));

  }

  function create() {
    let { width, height } = that.sys.game.canvas;

    this.scale.displaySize.setAspectRatio(width / height);
    this.scale.refresh();

    commonMusics.forEach(x => musics[x] = that.sound.add(x));
    showTutorial();

  }

  function isWin() {
    checks[0].setAlpha(chosenCloths.head == winItems.head ? 1 : 0);
    checks[1].setAlpha(chosenCloths.bottom == winItems.bottom ? 1 : 0);
    checks[2].setAlpha(chosenCloths.top == winItems.top ? 1 : 0);
    return chosenCloths.head == winItems.head && chosenCloths.top == winItems.top && chosenCloths.bottom == winItems.bottom;

  }

  function update() {



  }

  function startGame() {
    gameObjects = []
    gameObjects.push(that.add.image(startPos.images['room'].x, startPos.images['room'].y, 'room'));
    gameObjects.push(that.add.image(startPos.images['avatar'].x, startPos.images['avatar'].y, 'avatar'));
    gameObjects.push(that.add.image(startPos.images['items_popup'].x, startPos.images['items_popup'].y, 'items_popup'));
    gameObjects.forEach(x => { x.setScale(startPos.common.scale); });

    checks.push(that.add.image(startPos.images['check_1'].x, startPos.images['check_1'].y, 'check'));
    checks.push(that.add.image(startPos.images['check_2'].x, startPos.images['check_2'].y, 'check'));
    checks.push(that.add.image(startPos.images['check_3'].x, startPos.images['check_3'].y, 'check'));

    checks.forEach(x => { x.setScale(startPos.common.scale); x.setDepth(startPos.images['check_1'].depth) });


    items.push(that.add.image(startPos.images['item_1'].x, startPos.images['item_1'].y, 'cloth_1_' + (startItems.head + 1).toString()));
    items.push(that.add.image(startPos.images['item_2'].x, startPos.images['item_2'].y, 'cloth_2_' + (startItems.bottom + 1).toString()));
    items.push(that.add.image(startPos.images['item_3'].x, startPos.images['item_3'].y, 'cloth_3_' + (startItems.top + 1).toString()));



    items.forEach(x => {
      x.setScale(startPos.common.scale);
      x.setInteractive();
      x.on('pointerdown', function (pointer, localX, localY, event) {
        musics['button_common'].play();
        chosen = this;
        items.forEach(i => {
          i.clearTint();
        });
        this.setTint(0x00ff11);

        openItems.forEach(i => {
          i.destroy();
        });
        if (bubble)
          bubble.destroy();

        var chosenClothType;

        switch (items.indexOf(x)) {
          case 0:
            chosenClothType = 'head';
            break;
          case 2:
            chosenClothType = 'top';
            break;
          case 1:
            chosenClothType = 'bottom';
            break;
        }

        openItems = []
        bubble = that.add.image(this.x, startPos.images['bubble'].y, 'bubble');
        bubble.setScale(startPos.common.scale);
        bubble.setDepth(startPos.images['bubble'].depth);

        for (let j = 1; j <= 3; ++j) {
          var c = 0;
          switch (chosenClothType) {
            case 'head':
              c = 1;
              break;
            case 'bottom':
              c = 2;
              break;
            case 'top':
              c = 3;
              break;
          }
          var img = that.add.image(this.x, startPos.common.items.y - startPos.common.items.d * (j - 1), "cloth_" + c.toString() + "_" + j.toString());
          img.setInteractive();
          img.setScale(startPos.common.scale);
          img.setDepth(5);
          img.on('pointerdown', function (pointer, localX, localY, event) {
            musics.wearing.play();
            chosen.clearTint();

            chosen.setTexture("cloth_" + c.toString() + "_" + j.toString());
            bubble.destroy();

            cloths[chosenClothType].setTexture(itemsConfig[chosenClothType][j - 1].main);
            if ('back' in itemsConfig[chosenClothType][j - 1]) {
              cloths.back.setTexture(itemsConfig[chosenClothType][j - 1].back);
              cloths.back.setAlpha(1);
            } else {
              cloths.back.setAlpha(0);
            }

            chosenCloths[chosenClothType] = j - 1;


            openItems.forEach(i => {
              i.destroy();
            });


            openItems = [];

            if (isWin()) {
              endLevel();
            }
          });
          openItems.push(img);
        }
      });

    });
    startLevel();
    isWin();
  }

  function resetLevel() {
    chosenCloths = { ...startItems };
    cloths.head.setTexture(itemsConfig.head[startItems.head].main);
    cloths.bottom.setTexture(itemsConfig.bottom[startItems.bottom].main);
    cloths.top.setTexture(itemsConfig.top[startItems.top].main);
    cloths.back.setTexture(itemsConfig.top[startItems.top].back);
    if (!('back' in itemsConfig.top[startItems.top])) {
      cloths.back.setAlpha(0);
    }

    var j = 1;
    items.forEach(i => {
      i.setTexture('item_' + j.toString());
      ++j;
    });

  }

  function showTutorial() {
    var tutorial = that.add.image(291, 400, 'tutorial');
    tutorial.setScale(startPos.common.scale);
    tutorial.setDepth(4);
    var startBtn = that.add.image(291, 502, 'start');
    startBtn.setScale(startPos.common.scale);
    startBtn.setDepth(5);
    startBtn.setInteractive();
    startBtn.on('pointerdown', function (pointer, localX, localY, event) {
      musics['button_common'].play();
      startGame();
      tutorial.destroy();
      startBtn.destroy();

    });

    startBtn.on('pointerover', function (pointer, localX, localY, event) {
      this.setScale(this.scale * 1.2);

    });

    startBtn.on('pointerout', function (pointer, localX, localY, event) {
      this.setScale(this.scale / 1.2);

    });
  }

  function startLevel() {
    cloths = {};
    chosenCloths = { ...startItems };
    cloths.bottom = that.add.image(startPos.images['avatar'].x, startPos.images['avatar'].y, itemsConfig.bottom[startItems.bottom].main);
    cloths.top = that.add.image(startPos.images['avatar'].x, startPos.images['avatar'].y, itemsConfig.top[startItems.top].main);
    cloths.head = that.add.image(startPos.images['avatar'].x, startPos.images['avatar'].y, itemsConfig.head[startItems.head].main);
    cloths.back = that.add.image(startPos.images['avatar'].x, startPos.images['avatar'].y, itemsConfig.top[startItems.top].back);
    if (!('back' in itemsConfig.top[startItems.top])) {
      cloths.back.setAlpha(0);
    }

    cloths.head.setScale(startPos.common.scale);
    cloths.top.setScale(startPos.common.scale);
    cloths.bottom.setScale(startPos.common.scale);
    cloths.back.setScale(startPos.common.scale);

    cloths.head.setDepth(3);
    cloths.top.setDepth(3);
    cloths.bottom.setDepth(3);
    cloths.back.setDepth(1);
  }

  function restartLevel() {
    resetLevel();
    //startLevel();
  }

  function restartGame() {
    curLevel = 1;
    resetLevel();
    //startLevel();
  }

  function endLevel() {
    var t = 0;
    checks.forEach(x => {

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


    that.time.delayedCall(1000, () => {
      endGame();
    });

  }

  function endGame() {
    musics.win_common.play();
    gameObjects.forEach(x => x.destroy());
    cloths.bottom.destroy();
    cloths.top.destroy();
    cloths.head.destroy();
    cloths.back.destroy();
    items.forEach(x => x.destroy());
    checks.forEach(x => x.destroy())
    var end = that.add.image(285, 400, 'end');
    end.setScale(0.625);
    end.setDepth(5);

    var exitBtn = that.add.image(285, 502, 'exit');
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
    height: 900,
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
      height: 900,
    },
    transparent: true,
  })
}

export default createGame
