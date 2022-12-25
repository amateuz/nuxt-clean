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
    common: { scale: 0.4 },
    images: {
      background: { x: 292, y: 383, depth: 0, rotation: 0, flip: false },
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

  function resetLevel() {
    last = null
    start = null
    lastPointIdx = null
    points.forEach((p) => p.destroy())
    paintedLines = []
    points = []
  }

  function showTutorial() {
    var tutorial = that.add.image(291, 375, 'tutorial')
    tutorial.setScale(0.625)
    tutorial.setDepth(4)
    var startBtn = that.add.image(291, 480, 'start')
    startBtn.setScale(0.625)
    startBtn.setDepth(5)
    startBtn.setInteractive()
    startBtn.on('pointerdown', function (pointer, localX, localY, event) {
      startLevel()
      tutorial.destroy()
      startBtn.destroy()
    })
  }

  function startLevel() {
    back.setTexture('fonur' + curLevel.toString())
    kontur.setTexture('ur' + curLevel.toString() + '_marker_kontur')
    var level = 'level' + curLevel.toString()
    console.log(curLevel)
    console.log(level)
    console.log(levels)
    var pointsInLevels = levels[level].points
    console.log(pointsInLevels)
    pointsInLevels.forEach((p) => {
      var img = that.add.image(p.x, p.y, p.img)
      img.setInteractive()
      img.setDepth(2)
      img.setScale(startPos.common.scale)
      img.on('pointerdown', function (pointer, localX, localY, event) {
        if (last == this || !last) {
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
            console.log(remainLinks)
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
        endGame()
      })
    }
  }

  function endGame() {
    back.setTexture(null)
    var end = that.add.image(291, 365, 'end')
    end.setScale(0.625)
    end.setDepth(5)

    var exitBtn = that.add.image(291, 480, 'exit')
    exitBtn.setScale(0.625)
    exitBtn.setDepth(5)
    exitBtn.setInteractive()
    exitBtn.on('pointerdown', function (pointer, localX, localY, event) {
      window.open('http://2023.sberlabs.com:3000/house', '_self')
    })
  }

  function preload() {
    that = this

    gameImgs.forEach((x) => {
      that.load.image(x, 'game2/' + x + '.png')
    })
  }

  function create() {
    graphics = that.add.graphics({ lineStyle: { width: 8, color: 0xaa00aa } })

    graphics.fillStyle(0xff0000)

    var img = that.add.image(
      startPos.images['background'].x,
      startPos.images['background'].y,
      'background'
    )
    img.setScale(startPos.common.scale)
    img.setDepth(0)
    back = img

    kontur = that.add.image(300, 417, null)
    kontur.setScale(startPos.common.scale)
    kontur.setDepth(0)
    showTutorial()
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
        if (start != null) {
          line.setTo(start.x, start.y, pointer.x, pointer.y)
        }
      },
      this
    )

    let { width, height } = that.sys.game.canvas

    this.scale.displaySize.setAspectRatio(width / height)
    this.scale.refresh()
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
