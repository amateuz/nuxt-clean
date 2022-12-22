const createGame = (config = {}) => {
    var piano
    var spacebar
    var bars = []
    var buttons = []
    var start = null
    var line
    var graphics
    var paintedLines = []
    var usedLines = []

    var last
    var that
    var curLevel = 1

    var gameObjects = []

    var gameImgs = [
        'background',
        'point_1',
        'point_2',
        'point_3',
        'tutorial',
        'start',
        'end',
        'restart',
        'exit',
    ]

    var points = []

    var startPos = {
        common: { scale: 0.4 },
        images: {
            background: { x: 292, y: 383, depth: 0, rotation: 0, flip: false },
            point_1: { x: 212, y: 340, depth: 2, rotation: 0, flip: false },
            point_2: { x: 384, y: 313, depth: 2, rotation: 0, flip: false },
            point_3: { x: 289, y: 514, depth: 2, rotation: 0, flip: false },
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
                { img: 'point_1', x: 212, y: 340 },
                { img: 'point_2', x: 384, y: 313 },
                { img: 'point_3', x: 289, y: 514 },
            ],
            links: [
                { start: 0, end: 1 },
                { start: 1, end: 2 },
                { start: 2, end: 0 },
            ],
        },
        level2: {
            points: [
                { img: 'point_1', x: 212, y: 240 },
                { img: 'point_2', x: 384, y: 213 },
                { img: 'point_1', x: 212, y: 340 },
                { img: 'point_2', x: 384, y: 313 },
                { img: 'point_3', x: 289, y: 514 },
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
                { img: 'point_1', x: 212, y: 213 },
                { img: 'point_2', x: 384, y: 213 },
                { img: 'point_1', x: 289, y: 340 },
                { img: 'point_2', x: 212, y: 514 },
                { img: 'point_3', x: 384, y: 514 },
            ],
            links: [
                { start: 0, end: 1 },
                { start: 1, end: 2 },
                { start: 2, end: 0 },
                { start: 2, end: 3 },
                { start: 2, end: 4 },
                { start: 3, end: 4 },
            ],
        },
    }

    var lastPointIdx

    function resetLevel() {
        last = null
        start = null
        points.forEach((p) => p.destroy())
        paintedLines = []
        points = []
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
        var level = 'level' + curLevel.toString()
        var pointsInLevels = levels[level].points
        console.log(pointsInLevels)
        pointsInLevels.forEach((p) => {
            var img = that.add.image(p.x, p.y, p.img)
            img.setInteractive()
            img.setDepth(2)
            img.setScale(startPos.common.scale)
            img.on('pointerdown', function (pointer, localX, localY, event) {
                last = img
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
        console.log(
            'Success ' +
                Math.floor((good * 100) / music.length).toString() +
                '%'
        )
    }

    function preload() {
        that = this

        gameImgs.forEach((x) => {
            this.load.image(x, 'game2/' + x + '.png')
        })
    }

    function create() {
        graphics = this.add.graphics({
            lineStyle: { width: 8, color: 0xaa00aa },
        })

        graphics.fillStyle(0xff0000)

        var img = this.add.image(
            startPos.images['background'].x,
            startPos.images['background'].y,
            'background'
        )
        img.setScale(startPos.common.scale)
        img.setDepth(0)
        showTutorial()

        this.input.on(
            'pointerup',
            function (pointer) {
                if (last != null) {
                    var curIdx = points.indexOf(last)

                    if (start != null) {
                        console.log(remainLinks)
                        var path = remainLinks.find((x) => {
                            return (
                                (x.start === lastPointIdx &&
                                    x.end === curIdx) ||
                                (x.start === curIdx && x.end === lastPointIdx)
                            )
                        })
                        if (path) {
                            remainLinks = remainLinks.filter((x) => x !== path)
                            line.setTo(start.x, start.y, last.x, last.y)
                            paintedLines.push(line)
                            start = { x: last.x, y: last.y }
                            line = new Phaser.Geom.Line(
                                start.x,
                                start.y,
                                start.x,
                                start.y
                            )
                            lastPointIdx = curIdx
                        } else {
                            start = null
                            line = null
                        }
                    } else {
                        if (!lastPointIdx || curIdx === lastPointIdx) {
                            start = { x: last.x, y: last.y }

                            line = new Phaser.Geom.Line(
                                start.x,
                                start.y,
                                start.x,
                                start.y
                            )
                            lastPointIdx = curIdx
                        } else {
                            start = null
                            line = null
                        }
                    }
                } else {
                    start = null
                    line = null
                }
                last = null

                if (remainLinks.length === 0) {
                    start = null
                    line = null

                    endLevel()
                }
            },
            this
        )

        this.input.on(
            'pointermove',
            function (pointer) {
                if (start != null) {
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
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
        scale: {
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        transparent: true,
        ...config,
    })
}
export default createGame
