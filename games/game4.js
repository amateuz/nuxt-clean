const createGame = (config = {}) => {
  var that
  var helper
  var robot
  var words = []
  var last
  var start
  var startPos = [
    { x: 212, y: 228 },
    { x: 304, y: 273 },
    { x: 363, y: 210 },
    { x: 380, y: 274 },
    { x: 256, y: 353 },
    { x: 226, y: 293 },
    { x: 346, y: 345 },
    { x: 282, y: 217 },
  ]
  var endPos = [
    { x: 200, y: 456 },
    { x: 258, y: 457 },
    { x: 319, y: 456 },
    { x: 385, y: 456 },
    { x: 201, y: 514 },
    { x: 267, y: 513 },
    { x: 340, y: 513 },
    { x: 385, y: 512 },
  ]
  var minDistanceToStick = 15
  var checks = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  var levels = {
    level1: {
      start: [
        { x: 190, y: 601 },
        { x: 359, y: 593 },
        { x: 336, y: 673 },
        { x: 266, y: 671 },
        { x: 311, y: 629 },
        { x: 291, y: 588 },
        { x: 201, y: 669 },
        { x: 240, y: 623 },
      ],
      end: [
        { x: 206, y: 372 },
        { x: 247, y: 372 },
        { x: 294, y: 372 },
        { x: 346, y: 374 },
        { x: 196, y: 423 },
        { x: 247, y: 423 },
        { x: 298, y: 425 },
        { x: 349, y: 424 },
      ],
    },
    level2: {
      start: [
        { x: 274, y: 653 },
        { x: 219, y: 663 },
        { x: 330, y: 604 },
        { x: 264, y: 596 },
        { x: 335, y: 657 },
        { x: 200, y: 612 },
      ],
      end: [
        { x: 228, y: 373 },
        { x: 273, y: 373 },
        { x: 318, y: 375 },
        { x: 222, y: 423 },
        { x: 268, y: 424 },
        { x: 322, y: 426 },
      ],
    },
    level3: {
      start: [
        { x: 235, y: 654 },
        { x: 296, y: 657 },
        { x: 197, y: 608 },
        { x: 352, y: 648 },
        { x: 301, y: 609 },
        { x: 252, y: 599 },
        { x: 183, y: 654 },
        { x: 350, y: 600 },
      ],
      end: [
        { x: 202, y: 376 },
        { x: 251, y: 373 },
        { x: 302, y: 375 },
        { x: 356, y: 374 },
        { x: 200, y: 426 },
        { x: 246, y: 428 },
        { x: 298, y: 425 },
        {
          x: 346,
          y: 425,
        },
      ],
    },
    //'level2': { 'start': [], 'end' : [] },
    //'level3': { 'start': [], 'end': [] }
  }
  var curLevel = 1

  var commonMusics = [
    'button_common',
    'win_common',
    'pic_set',
    'pic_take',
    'robovoice_1',
    'robovoice_2',
    'robovoice_3',
  ]
  var musics = {}

  function preload() {
    //that.load.setBaseURL('http://localhost:1337/');
    that = this
    for (let j = 1; j <= 3; j++) {
      var level = 'level' + j.toString()
      for (let i = 1; i <= levels[level].start.length; i++) {
        that.load.image(
          level + '_word' + i.toString(),
          'game4/' + level + '/word' + i.toString() + '.png'
        )
      }
    }

    that.load.image('robot', 'game4/robot.png')
    that.load.image('tutorial', 'game4/tutorial.png')
    that.load.image('start', 'game4/start.png')
    that.load.image('end', 'game4/end.png')
    that.load.image('restart', 'game4/restart.png')
    that.load.image('exit', 'game4/exit.png')
    that.load.image('helper1', 'game4/helper1.png')
    that.load.image('helper2', 'game4/helper2.png')
    that.load.image('helper3', 'game4/helper3.png')
    that.load.image('play', 'game4/play.png')
    that.load.image('play_pressed', 'game4/play_pressed.png')
    that.load.image('message', 'game4/message.png')
    that.load.audio('all', 'game4/robovoice_full.mp3')

    commonMusics.forEach((x) => that.load.audio(x, 'common/' + x + '.mp3'))
    that.load.image('close', 'common/close.png');
  }

  function create() {
    let { width, height } = that.sys.game.canvas

    this.scale.displaySize.setAspectRatio(width / height)
    this.scale.refresh()

    commonMusics.forEach((x) => (musics[x] = that.sound.add(x)))

    showTutorial()
    closeBtn = that.add.image(530, 70, 'close');
    closeBtn.setDepth(7);
    closeBtn.setInteractive();
    closeBtn.setScale(startPos.common.scale);
    closeBtn.on('pointerdown', function (pointer, localX, localY, event) {
      musics['button_common'].play();
      PhaserNuxt.eventEmitter.emit('close');

    });
  }

  function resetLevel() {
    last = null
    start = null
    words.forEach((p) => p.destroy())
    words = []
    checks = []
  }

  function startGame() {
    robot = that.add.image(284, 381, 'robot')
    robot.setScale(0.5)
    helper = that.add.image(275, 398, 'helper1')

    that.input.on('dragstart', function (pointer, gameObject, dragX, dragY) {
      musics.pic_take.play()
    })

    that.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = Math.max(Math.min(dragX, 385), 200)
      gameObject.y = Math.max(Math.min(dragY, 585), 200)
    })
    that.input.on('dragend', function (pointer, gameObject) {
      musics.pic_set.play()
      var i = words.indexOf(gameObject)

      if (
        Math.pow(Math.abs(gameObject.x - endPos[i].x), 2) +
          Math.pow(Math.abs(gameObject.y - endPos[i].y), 2) <
        Math.pow(minDistanceToStick, 2)
      ) {
        gameObject.x = endPos[i].x
        gameObject.y = endPos[i].y
        gameObject.setTint(0x00ff00)
        that.input.setDraggable(words[i], false)
        checks[i] = 1
        if (checks.filter((x) => x === 1).length === startPos.length) {
          endLevel()
        }
      } else {
        gameObject.x = startPos[i].x
        gameObject.y = startPos[i].y
      }
    })

    startLevel()
  }

  function showTutorial() {
    var tutorial = that.add.image(291, 375, 'tutorial')
    tutorial.setScale(0.625)
    tutorial.setDepth(4)
    var startBtn = that.add.image(291, 450, 'start')
    startBtn.setScale(0.625)
    startBtn.setDepth(5)
    startBtn.setInteractive()
    startBtn.on('pointerdown', function (pointer, localX, localY, event) {
      musics['button_common'].play()
      startGame()
      tutorial.destroy()
      startBtn.destroy()
    })

    startBtn.on('pointerover', function (pointer, localX, localY, event) {
      this.setScale(this.scale * 1.2)
    })

    startBtn.on('pointerout', function (pointer, localX, localY, event) {
      this.setScale(this.scale / 1.2)
    })
  }

  function startLevel() {
    helper.setTexture('helper' + curLevel.toString())
    helper.setScale(0.5)
    helper.setDepth(1)
    var level = 'level' + curLevel.toString()
    startPos = levels[level].start
    endPos = levels[level].end

    var i = 1
    startPos.forEach((p) => {
      var img = that.add.image(p.x, p.y, level + '_word' + i.toString())
      ++i
      img.setInteractive()
      that.input.setDraggable(img)
      img.setDepth(2)
      img.setScale(0.5)
      words.push(img)
      checks.push(0)
    })
  }

  function restartLevel() {
    resetLevel()
    startLevel()
  }

  function restartGame() {
    curLevel = 1
    resetLevel()
    startGame()
  }

  function final() {
    resetLevel()
    helper.setTexture(null)
    helper.setDepth(-5)

    var button = that.add.image(275, 398, 'play')
    button.setScale(0.5)
    button.setInteractive()
    button.on('pointerdown', function (pointer, localX, localY, event) {
      this.setTexture('play_pressed')
      var music = that.sound.add('all')
      music.on('complete', endGame)
      music.play()
    })

    button.on('pointerup', function (pointer, localX, localY, event) {
      this.setTexture('play')
      this.disableInteractive()
    })
  }

  function endLevel() {
    var t = 0
    words.forEach((x) => {
      that.tweens.add({
        targets: x,
        scaleX: x.scaleX * 1.2,
        scaleY: x.scaleY * 1.2,
        ease: 'Sine.easeInOut',
        duration: 300,
        delay: t * 50,
        repeat: 1,
        yoyo: true,
      })

      t++
    })

    var lastLevel = curLevel.toString()
    ++curLevel
    if ('level' + curLevel.toString() in levels) {
      musics['robovoice_' + lastLevel].on('complete', () => {
        resetLevel()
        startLevel()
      })
      musics['robovoice_' + lastLevel].play()
    } else {
      musics['robovoice_' + lastLevel].on('complete', () => {
        final()
      })
      musics['robovoice_' + lastLevel].play()
    }
  }

  function endGame() {
    robot.destroy()
    var end = that.add.image(291, 375, 'end')
    end.setScale(0.5)
    end.setDepth(5)
    var restartBtn = that.add.image(291, 404, 'restart')
    restartBtn.setScale(0.5)
    restartBtn.setDepth(5)
    restartBtn.setInteractive()
    restartBtn.on('pointerdown', function (pointer, localX, localY, event) {
      restartGame()
      end.destroy()
      restartBtn.destroy()
      exitBtn.destroy()
      endText.destroy()
    })

    var exitBtn = that.add.image(320, 657, 'exit')
    exitBtn.setScale(0.5)
    exitBtn.setDepth(5)
    exitBtn.setInteractive()
    exitBtn.on('pointerdown', function (pointer, localX, localY, event) {
      musics['button_common'].play()
      PhaserNuxt.eventEmitter.emit('exit')
    })
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
    },
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: 'phaser',
      mode: Phaser.Scale.FIT,
      width: 585,
      height: 800,
    },
    transparent: true,
    ...config,
  })
}
export default createGame
