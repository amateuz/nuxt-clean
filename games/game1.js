const createGame = (config = {}) => {
  var that

  var scale = 0.2

  var gameObjects = []

  var gameImgs = ['item_1', 'item_2', 'item_3', 'item_4', 'item_5']

  var startPos = {
    common: { scale: 0.4 },
    images: {
      item_1: { x: 82, y: 406, depth: 0, rotation: 0, flip: false },
      item_2: { x: 219, y: 606, depth: 0, rotation: 0, flip: false },
      item_3: {
        x: 45,
        y: 551,
        depth: 0,
        rotation: 1.3500000000000192,
        flip: false,
      },
      item_4: {
        x: 467,
        y: 627,
        depth: 0,
        rotation: 0.6000000000000085,
        flip: true,
      },
      item_5: {
        x: 417,
        y: 398,
        depth: 0,
        rotation: 0.20000000000000284,
        flip: true,
      },
    },
  }
  var endPos = {
    item_1: { x: 10, y: 100 },
    item_2: { x: 119, y: 120 },
    item_3: {
      x: 45,
      y: 100,
    },
    item_4: { x: 230, y: 127 },
    item_5: { x: 417, y: 198 },
  }

  var all = 0
  function preload() {
    that = this

    gameImgs.forEach((x) => {
      this.load.image(x, 'game1/' + x + '.png')
    })
  }
  function create() {
    gameImgs.forEach((x) => {
      var img = this.add.image(startPos.images[x].x, startPos.images[x].y, x)
      img.setInteractive()
      img.setScale(startPos.common.scale)
      img.setDepth(startPos.images[x].depth)
      img.rotation = startPos.images[x].rotation
      img.flipX = startPos.images[x].flip

      img.on('pointerdown', function (pointer, localX, localY, event) {
        var idx = gameObjects.indexOf(this)
        this.x = endPos[gameImgs[idx]].x
        this.y = endPos[gameImgs[idx]].y
        img.rotation = 0
        img.flipX = false
        this.disableInteractive()
        ++all
        if (all == 5) {
          var t = 0
          gameObjects.forEach((x) => {
            that.tweens.add({
              targets: x,
              scaleX: 0.8,
              scaleY: 0.8,
              ease: 'Sine.easeInOut',
              duration: 300,
              delay: t * 50,
              repeat: 1,
              yoyo: true,
            })

            t++
          })
        }
      })

      gameObjects.push(img)
    })
  }

  function update() {}

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
    transparent: true,
    scene: {
      preload: preload,
      create: create,
      update: update,
    },

    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    ...config,
  })
}
export default createGame
