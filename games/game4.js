const createGame = (config = {}) => {
    var last
    var start
    var that
    var words = []
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
                { x: 212, y: 228 },
                { x: 304, y: 273 },
                { x: 363, y: 210 },
                { x: 380, y: 274 },
                { x: 256, y: 353 },
                { x: 226, y: 293 },
                { x: 346, y: 345 },
                { x: 282, y: 217 },
            ],
            end: [
                { x: 200, y: 456 },
                { x: 258, y: 457 },
                { x: 319, y: 456 },
                { x: 385, y: 456 },
                { x: 201, y: 514 },
                { x: 267, y: 513 },
                { x: 340, y: 513 },
                { x: 385, y: 512 },
            ],
        },
        level2: {
            start: [
                { x: 212, y: 228 },
                { x: 304, y: 273 },
                { x: 363, y: 210 },
                { x: 380, y: 274 },
                { x: 256, y: 353 },
                { x: 226, y: 293 },
                { x: 346, y: 345 },
                { x: 282, y: 217 },
            ],
            end: [
                { x: 200, y: 456 },
                { x: 258, y: 457 },
                { x: 319, y: 456 },
                { x: 385, y: 456 },
                { x: 201, y: 514 },
                { x: 267, y: 513 },
                { x: 340, y: 513 },
                { x: 385, y: 512 },
            ],
        },
        level3: {
            start: [
                { x: 212, y: 228 },
                { x: 304, y: 273 },
                { x: 363, y: 210 },
                { x: 380, y: 274 },
                { x: 256, y: 353 },
                { x: 226, y: 293 },
                { x: 346, y: 345 },
                { x: 282, y: 217 },
            ],
            end: [
                { x: 200, y: 456 },
                { x: 258, y: 457 },
                { x: 319, y: 456 },
                { x: 385, y: 456 },
                { x: 201, y: 514 },
                { x: 267, y: 513 },
                { x: 340, y: 513 },
                { x: 385, y: 512 },
            ],
        },
        //'level2': { 'start': [], 'end' : [] },
        //'level3': { 'start': [], 'end': [] }
    }
    var curLevel = 1

    function preload() {
        //this.load.setBaseURL('http://localhost:1337/');
        that = this
        for (let j = 1; j <= 3; j++) {
            var level = 'level' + j.toString()
            for (let i = 1; i <= levels[level].start.length; i++) {
                this.load.image(
                    level + '_word' + i.toString(),
                    'game4/' + level + '/word' + i.toString() + '.png'
                )
            }
        }

        this.load.image('robot', 'game4/robot.png')
        that.load.image('tutorial', 'game4/tutorial.png')
        that.load.image('start', 'game4/start.png')
        that.load.image('end', 'game4/end.png')
        that.load.image('restart', 'game4/restart.png')
        that.load.image('exit', 'game4/exit.png')
    }

    function create() {
        this.add.image(293, 400, 'robot').setScale(0.2)
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = Math.max(Math.min(dragX, 385), 200)
            gameObject.y = Math.max(Math.min(dragY, 585), 200)
        })
        this.input.on('dragend', function (pointer, gameObject) {
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
            }
        })

        showTutorial()
    }

    function resetLevel() {
        last = null
        start = null
        words.forEach((p) => p.destroy())
        words = []
        checks = []
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
        startPos = levels[level].start
        endPos = levels[level].end

        var i = 1
        startPos.forEach((p) => {
            var img = that.add.image(p.x, p.y, level + '_word' + i.toString())
            ++i
            img.setInteractive()
            that.input.setDraggable(img)
            img.setDepth(2)
            //img.setScale(0.625);
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
        startLevel()
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
        },
        transparent: true,
        ...config,
    })
}
export default createGame
