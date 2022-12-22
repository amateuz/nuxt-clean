const createGame = (config = {}) => {
    var curLevel
    var that
    var saveBtn
    var plusBtn
    var minusBtn
    var chosen
    var depthPlusBtn
    var depthMinusBtn

    var scale = 0.2
    var parts = []

    var gameImgs = [
        'bubble',
        'frame_1',
        'frame_2',
        'frame_3',
        'frame_4',

        'main_popup',
        'pause',
        'pause_2',
        'play',
        'play_2',
        'speed',
        'speed_2',
        'stop',
        'stop_2',
    ]

    var startPos = {
        common: { scale: 0.2 },
        images: {
            bubble: { x: 287, y: 142, depth: 0 },
            frame_1: { x: 219, y: 427, depth: 0 },
            frame_2: { x: 357, y: 426, depth: 0 },
            frame_3: { x: 220, y: 552, depth: 0 },
            frame_4: { x: 357, y: 551, depth: 0 },
            main_popup: { x: 289, y: 447, depth: -2 },
            pause: { x: 182, y: 295, depth: 0 },
            pause_2: { x: 182, y: 295, depth: -1 },
            play: { x: 252, y: 295, depth: 0 },
            play_2: { x: 252, y: 295, depth: -1 },
            speed: { x: 327, y: 295, depth: 0 },
            speed_2: { x: 327, y: 295, depth: -1 },
            stop: { x: 397, y: 295, depth: 0 },
            stop_2: { x: 397, y: 295, depth: -1 },
        },
    }
    var gameObjects = []

    var endPosForFrame = {
        frame_1: { x: 219, y: 427, depth: 0 },
        frame_2: { x: 357, y: 426, depth: 0 },
        frame_3: { x: 220, y: 552, depth: 0 },
        frame_4: { x: 357, y: 551, depth: 0 },
    }
    var startDrag = { x: 219, y: 427 }
    var framePoses = [
        { x: 219, y: 427, depth: 0 },
        { x: 357, y: 426, depth: 0 },
        { x: 220, y: 552, depth: 0 },
        { x: 357, y: 551, depth: 0 },
    ]
    var chosen
    function preload() {
        that = this

        gameImgs.forEach((x) => {
            that.load.image(x, 'game5/' + x + '.png')
        })

        that.load.image('tutorial', 'game5/tutorial.png')
        that.load.image('start', 'game5/start.png')
        that.load.image('end', 'game5/end.png')
        that.load.image('restart', 'game5/restart.png')
        that.load.image('exit', 'game5/exit.png')
    }

    function isWin() {
        var right = 0
        var frames = []
        for (let i = 1; i <= 4; ++i) {
            var f = gameImgs.indexOf('frame_' + i.toString())
            frames.push(gameObjects[f])
        }

        for (let i = 1; i <= frames.length; ++i) {
            if (
                frames[i - 1].x == endPosForFrame['frame_' + i.toString()].x &&
                frames[i - 1].y == endPosForFrame['frame_' + i.toString()].y
            ) {
                ++right
            }
        }

        console.log('right ' + right.toString())

        if (right === 4) {
            return true
        }

        return false
    }

    function create() {
        that.input.on('dragstart', function (pointer, gameObject) {
            startDrag = { x: gameObject.x, y: gameObject.y }
            console.log('start: ' + startDrag.toString())
            gameObject.setDepth(2)
            for (let i = 1; i <= 4; ++i) {
                var f = gameImgs.indexOf('frame_' + i.toString())
            }
        })
        that.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            chosen = gameObject
            gameObject.x = dragX
            gameObject.y = dragY
        })

        that.input.on('dragend', function (pointer, gameObject) {
            console.log(gameObject)
            var frames = []
            for (let i = 1; i <= 4; ++i) {
                var f = gameImgs.indexOf('frame_' + i.toString())
                frames.push(gameObjects[f])
            }

            if (!frames.find((x) => x === gameObject)) {
                return
            }

            var g = startDrag
            var prev =
                (startDrag.x - gameObject.x) * (startDrag.x - gameObject.x) +
                (startDrag.y - gameObject.y) * (startDrag.y - gameObject.y)

            framePoses.forEach((fr) => {
                var d =
                    (fr.x - gameObject.x) * (fr.x - gameObject.x) +
                    (fr.y - gameObject.y) * (fr.y - gameObject.y)
                if (prev > d) {
                    prev = d
                    g = fr
                }
            })

            var endFrame = frames.find((fr) => fr.x == g.x && fr.y == g.y)

            if (endFrame) {
                endFrame.x = startDrag.x
                endFrame.y = startDrag.y
            }

            gameObject.x = g.x
            gameObject.y = g.y
            gameObject.setDepth(1)

            if (isWin()) {
                endGame()
            }
        })

        showTutorial()
    }

    function update() {}

    function clamp(min, x, max) {
        return Math.max(Math.min(x, max), min)
    }

    function resetLevel() {
        gameObjects.forEach((p) => p.destroy())
        gameObjects = []
        startDrag = { x: 219, y: 427 }
        chosen = null
    }

    function showTutorial() {
        var tutorial = that.add.image(285, 375, 'tutorial')
        tutorial.setScale(0.625)
        tutorial.setDepth(4)
        var startBtn = that.add.image(225, 657, 'start')
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
        gameImgs.forEach((x) => {
            var img = that.add.image(
                startPos.images[x].x,
                startPos.images[x].y,
                x
            )
            img.setScale(startPos.common.scale)
            img.setDepth(startPos.images[x].depth)

            if (x.startsWith('frame')) {
                img.setInteractive()
                img.setDepth(1)
                that.input.setDraggable(img)
            }

            if (
                x === 'play' ||
                x === 'speed' ||
                x === 'stop' ||
                x === 'pause'
            ) {
                {
                    img.setInteractive()
                    img.on(
                        'pointerdown',
                        function (pointer, localX, localY, event) {
                            that.alpha = 0
                            if (chosen) {
                                if (x === 'play') {
                                }
                                if (x === 'speed') {
                                }
                                if (x === 'stop') {
                                }
                                if (x === 'pause') {
                                }
                            }
                            that.time.delayedCall(
                                300,
                                () => {
                                    that.alpha = 1
                                },
                                [],
                                this
                            )
                        }
                    )
                }
            }

            gameObjects.push(img)
        })
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
        frame.forEach((x) => {
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
            that.time.delayedCall(500, () => {
                resetLevel()
                startLevel()
            })
        } else {
            endGame()
        }
    }

    function endGame() {
        var end = that.add.image(285, 375, 'end')
        end.setScale(0.625)
        end.setDepth(5)
        var restartBtn = that.add.image(70, 657, 'restart')
        restartBtn.setScale(0.625)
        restartBtn.setDepth(5)
        restartBtn.setInteractive()
        restartBtn.on('pointerdown', function (pointer, localX, localY, event) {
            restartGame()
            end.destroy()
            restartBtn.destroy()
            exitBtn.destroy()
            endText.destroy()
        })

        var endText = that.add.text(
            70,
            200,
            '����������!\n �� ������� ���������',
            {
                fontFamily: 'Arial',
                fontSize: 30,
                color: '#00000',
            }
        )
        endText.setDepth(6)

        var exitBtn = that.add.image(320, 657, 'exit')
        exitBtn.setScale(0.625)
        exitBtn.setDepth(5)
        exitBtn.setInteractive()
        exitBtn.on('pointerdown', function (pointer, localX, localY, event) {
            window.open('http://localhost:1337/', '_self')
        })
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
        },
        ...config,
    })
}
export default createGame
