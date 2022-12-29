const createGame = (config = {}) => {
  var start = null
  var line
  var graphics
  var paintedLines = []

  var last = null
  var that
  var curLevel = 1
  var back
  var kontur
  var paint = false
  var closeBtn
  var restartBtn

  var commonMusics = [
    'button_common',
    'win_common',
    'pic_set',
    'pic_take',
    'button_add'
  ]
  var musics = {}

  var gameImgs = [
    'fonur1',
    'fonur2',
    'fonur3',
    'magnit1',
    'magnit2',
    'magnit3',
    'tutorial',
    'start',
    'end',
    'restart',
    'exit',
    'ur1_marker_kontur',
    'ur2_marker_kontur',
    'ur3_marker_kontur',
  ]

  var points = []

  var startPos = {
    common: { scale: 0.625, width: 585, height: 800 },
    images: {
      background: { x: 292, y: 383, depth: 0, rotation: 0, flip: false },
      tutorial: { x: 291, y: 375, depth: 0 },
      start: { x: 291, y: 480, depth: 0 },
      magnit1: { x: 212, y: 340, depth: 2, rotation: 0, flip: false },
      magnit2: { x: 384, y: 313, depth: 2, rotation: 0, flip: false },
      magnit3: { x: 289, y: 514, depth: 2, rotation: 0, flip: false },
    },
  }
  var remainLinks = [
    { start: 0, end: 1 },
    { start: 1, end: 2 },
    { start: 2, end: 0 },
  ]

  var levels = {
    level1: {
      points: [
        { img: 'magnit1', x: 205, y: 375 },
        { img: 'magnit2', x: 406, y: 383 },
        { img: 'magnit3', x: 300, y: 485 },
      ],
      links: [
        { start: 0, end: 1 },
        { start: 1, end: 2 },
        { start: 2, end: 0 },
      ],
    },
    level2: {
      points: [
        { img: 'magnit3', x: 210, y: 300 },
        { img: 'magnit3', x: 397, y: 300 },
        { img: 'magnit1', x: 222, y: 467 },
        { img: 'magnit1', x: 374, y: 458 },
        { img: 'magnit2', x: 299, y: 552 },
      ],
      links: [
        { start: 0, end: 1 },
        { start: 0, end: 2 },
        { start: 1, end: 3 },
        { start: 3, end: 4 },
        { start: 2, end: 4 },
      ],
    },
    level3: {
      points: [
        { img: 'magnit3', x: 218, y: 326 },
        { img: 'magnit3', x: 384, y: 327 },
        { img: 'magnit2', x: 300, y: 415 },
        { img: 'magnit1', x: 219, y: 507 },
        { img: 'magnit1', x: 385, y: 507 },
      ],
      links: [
        { start: 0, end: 1 },
        { start: 1, end: 2 },
        { start: 2, end: 0 },
        { start: 2, end: 3 },
        { start: 2, end: 4 },
        { start: 3, end: 4 },
        { start: 0, end: 3 },
      ],
    },
  }

  var lastPointIdx

  function addImage(name, x, y, imgName) {
    let ox = x ?? (name in startPos.images ? startPos.images[name].x : 0)
    let oy = y ?? (name in startPos.images ? startPos.images[name].y : 0)

    let inm =
      imgName ??
      (name in startPos.images && 'img' in startPos.images[name]
        ? startPos.images[name].img
        : name)

    let { width, height } = that.sys.game.canvas

    let updatedX = ox // / startPos.common.width * width;
    let updatedY = oy /// startPos.common.height * height;
    let scale = startPos.common.scale // * width  / (startPos.common.width );

    var img = that.add.image(updatedX, updatedY, inm)
    if (name in startPos.images) img.setDepth(startPos.images[name].depth)
    img.setScale(scale)
    return img
  }

  function resetLevel() {
    last = null
    start = null
    lastPointIdx = null
    points.forEach((p) => p.destroy())
    paintedLines = []
    points = []
  }

  function showTutorial() {
    var tutorial = addImage('tutorial')
    var startBtn = addImage('start')
    startBtn.setInteractive({ cursor: 'pointer' })
    startBtn.on('pointerdown', function (pointer, localX, localY, event) {
      playSound('button_common')
      startLevel()
      tutorial.destroy()
      startBtn.destroy()
    })

  }

  function startGame() {}

  function playSound(sound) {
    if (!(sound in musics)) {

        musics[sound] = that.sound.add(sound);
      
    }

    if (musics[sound]) musics[sound].play()
  }
  function startLevel() {
    if (!back) {
      back = addImage('background')
    }

    if (!restartBtn) {
      restartBtn = that.add.image(120, 100, 'restart')
      restartBtn.setDepth(7)
      restartBtn.setInteractive({ cursor: 'pointer' })
      restartBtn.setScale(startPos.common.scale)
      restartBtn.on('pointerdown', function (pointer, localX, localY, event) {
        playSound('button_add')
        restartLevel()
      })
    }

    if (!kontur) {
      kontur = addImage(
        'tutorial',
        300,
        417,
        'ur' + curLevel.toString() + '_marker_kontur'
      )
    }

    back.setTexture('fonur' + curLevel.toString())
    kontur.setTexture('ur' + curLevel.toString() + '_marker_kontur')
    var level = 'level' + curLevel.toString()

    var pointsInLevels = levels[level].points

    pointsInLevels.forEach((p) => {
      var img = addImage(p.img, p.x, p.y, p.img)
      img.setInteractive({ cursor: 'pointer' })
      img.setDepth(2)
      img.on('pointerdown', function (pointer, localX, localY, event) {
        if (paintedLines.length == 0 || last == this || !last) {
          if (!line) {
            playSound('pic_take')
          }
          last = img
          paint = true
          start = { x: this.x, y: this.y }
          line = new Phaser.Geom.Line(start.x, start.y, start.x, start.y)
        }
      })
      img.on('pointermove', function (pointer, localX, localY, event) {
        if (!paint) return

        if (last != null) {
          var curIdx = points.indexOf(this)
          lastPointIdx = points.indexOf(last)

          if (start != null) {

            var path = remainLinks.find((x) => {
              return (
                (x.start === lastPointIdx && x.end === curIdx) ||
                (x.start === curIdx && x.end === lastPointIdx)
              )
            })
            if (path) {
              remainLinks = remainLinks.filter((x) => x !== path)
              line.setTo(start.x, start.y, this.x, this.y)
              paintedLines.push(line)
              start = { x: this.x, y: this.y }
              line = new Phaser.Geom.Line(start.x, start.y, start.x, start.y)
              lastPointIdx = curIdx
              last = this
              playSound('win_common')
            }
          }
        }

        if (remainLinks.length === 0) {
          paint = false
          start = null
          line = null

          endLevel()
        }
      })
      points.push(img)
    })

    remainLinks = levels[level].links
  }

  function restartLevel() {
    resetLevel()
    startLevel()
  }

  function restartGame() {
    curLevel = 1

    resetLevel()
    startLevel()
  }

  function endLevel() {
    var t = 0
    points.forEach((x) => {
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

    ++curLevel
    if ('level' + curLevel.toString() in levels) {
      that.time.delayedCall(1500, () => {
        resetLevel()
        startLevel()
      })
    } else {
      that.time.delayedCall(1500, () => {
        resetLevel()
        endGame()
      })
    }
  }

  function endGame() {
    playSound('win_common')
    back.destroy()
    restartBtn.destroy()

    var end = addImage('end', 291, 365)

    var exitBtn = that.add.image(291, 480, 'exit')
    exitBtn.setScale(0.625)
    exitBtn.setDepth(5)
    exitBtn.setInteractive({ cursor: 'pointer' })
    exitBtn.on('pointerdown', function (pointer, localX, localY, event) {
      playSound('button_common')
      PhaserNuxt.eventEmitter.emit('exit')
    })
  }

  function preload() {
    that = this

    gameImgs.forEach((x) => {
      that.load.image(x, 'game2/' + x + '.png')
    })

    that.load.image('close', 'common/close.png')
    that.load.image('restart', 'game2/restart.png')
    commonMusics.forEach((x) => {
      that.load.audio(x, 'common/' + x + '.mp3')
    })
  }

  function create() {
    let { width, height } = that.sys.game.canvas

    this.scale.displaySize.setAspectRatio(width / height)
    this.scale.refresh()

    graphics = that.add.graphics({ lineStyle: { width: 8, color: 0xaa00aa } })

    graphics.fillStyle(0xff0000)

    commonMusics.forEach((x) => {
      musics[x] = that.sound.add(x)
    })

    showTutorial()

    closeBtn = that.add.image(465, 100, 'close')
    closeBtn.setDepth(7)
    closeBtn.setInteractive({ cursor: 'pointer' })
    closeBtn.setScale(startPos.common.scale)
    closeBtn.on('pointerdown', function (pointer, localX, localY, event) {
      playSound('button_add')
      PhaserNuxt.eventEmitter.emit('close')
    })


    that.input.on(
      'pointerup',
      function (pointer) {
        line = null
        paint = false
      },
      this
    )

    that.input.on(
      'pointermove',
      function (pointer) {
        if (start != null && line != null) {
          line.setTo(start.x, start.y, pointer.x, pointer.y)
        }
      },
      this
    )
  }

  function update() {
    graphics.clear()

    graphics.fillStyle(0xff0000)
    graphics.depth = 1

    if (line != null) graphics.strokeLineShape(line)

    paintedLines.forEach((l) => {
      graphics.strokeLineShape(l)
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
    audio: {
      disableWebAudio: true
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
    transparent: true,
    ...config,
  })
}
export default createGame
