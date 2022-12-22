const createGame = (config = {}) => {
    var piano
    var spacebar
    var bars = []
    var buttons = []
    var btns = []
    var btnsSound = []
    var music = [1, 1, 2, 5, 8, 7, 2, 2, 3, 2, 4, 5, 6, 7]
    var musicIdx = 0
    var good = 0
    var wrong
    var nextBarEvent
    var end = false
    var that
    var physics
    var time
    var graphics
    function preload() {
        that = this

        //that.load.image('sky', 'assets/skies/space3.png');
        //that.load.image('logo', 'assets/sprites/phaser3-logo.png');
        that.load.image('background', 'game3/piano_background.png')
        that.load.image('bar', 'game3/bar.png')
        that.load.image('piano', 'game3/piano.png')
        that.load.image('tutorial', 'game3/tutorial.png')
        that.load.image('start', 'game3/start.png')
        that.load.image('end', 'game3/end.png')
        that.load.image('restart', 'game3/restart.png')
        that.load.image('exit', 'game3/exit.png')

        for (let i = 1; i <= 8; ++i) {
            that.load.audio('note' + i.toString(), [
                'game3/note' + i.toString() + '.mp3',
            ])
        }

        that.load.audio('wrong', 'game3/wrong.mp3')
        physics = that.physics
        time = that.time
    }

    function create() {
        for (let i = 1; i <= 8; ++i) {
            btnsSound.push(that.sound.add('note' + i.toString()))
        }
        wrong = that.sound.add('wrong')
        graphics = that.add.graphics({
            lineStyle: { width: 4, color: 0xaa00aa },
        })
        graphics.depth = 4

        that.add.image(285, 400, 'background').setScale(0.625)
        var piano = that.add.image(285, 627.5, 'piano')
        piano.setScale(0.625)
        piano.setDepth(2)

        spacebar = that.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        )

        buttons = [
            that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F),
            that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G),
            that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H),
            that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
            that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
        ]

        for (let i = 0; i < 8; ++i) {
            var btn = that.add.rectangle(i * 52 + 96, 600, 52, 250, 0xffff00, 0)
            btn.setInteractive()
            btn.on('pointerdown', function (pointer, localX, localY, event) {
                onBtn(this)
            })
            btns.push(btn)
        }
        showTutorial()
    }

    function update() {
        buttons.forEach((x) => {
            if (Phaser.Input.Keyboard.JustDown(x)) {
                onBtn(btns[buttons.indexOf(x)])
            }
        })
        var deleted = []

        bars.forEach(function (item) {
            if (item.y > 500) {
                deleted.push(item)
            }
        })

        bars = bars.filter(function (item) {
            return !deleted.includes(item)
        })

        if (deleted.filter((x) => x.state == 'active').length > 0) {
            wrong.play()
        }
        deleted.forEach((x) => x.destroy())

        if (bars.length == 0 && musicIdx >= music.length && !end) {
            end = true
            showEnd()
        }
    }

    function createBar() {
        var speed = 75
        var bar = physics.add.image(96 + 52 * (music[musicIdx] - 1), -50, 'bar')

        bar.depth = 1
        bar.state = 'active'
        bar.setVelocity(0, speed)
        bar.setScale(0.625)
        bars.push(bar)
        ++musicIdx
        if (musicIdx < music.length) {
            nextBarEvent = time.delayedCall(speed * 11, createBar, [], this)
        }
    }

    function showTutorial() {
        var tutorial = that.add.image(285, 375, 'tutorial')
        tutorial.setScale(0.625)
        tutorial.setDepth(5)
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

    function showEnd() {
        var end = that.add.image(285, 375, 'end')
        end.setScale(0.625)
        end.setDepth(5)
        var restartBtn = that.add.image(70, 657, 'restart')
        restartBtn.setScale(0.625)
        restartBtn.setDepth(5)
        restartBtn.setInteractive()
        restartBtn.on('pointerdown', function (pointer, localX, localY, event) {
            reset()
            end.destroy()
            restartBtn.destroy()
            exitBtn.destroy()
            endText.destroy()
        })

        var endText = that.add.text(
            70,
            200,
            '���������� �������� ' +
                Math.floor((good * 100) / music.length).toString() +
                '%',
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

    function startLevel() {
        var one = that.add.text(185, 200, '3', {
            fontFamily: 'Arial',
            fontSize: 300,
            color: '#ffffff',
        })
        one.setDepth(5)
        tween(one, () => {
            one.setText('2')
            one.setAlpha(1)
            tween(one, () => {
                one.setText('1')
                one.setAlpha(1)

                tween(one, () => {
                    one.destroy()
                    createBar()
                })
            })
        })
    }

    function tween(text, onComplete) {
        that.tweens.add({
            targets: text,
            alpha: { value: 0.5, duration: 1000, ease: 'Sine.easeInOut' },
            yoyo: false,
            repeat: 1,
            duration: 1000,
            onComplete: onComplete,
        })
    }

    function reset() {
        good = 0
        musicIdx = 0
        bars.forEach((x) => x.destroy())
        nextBarEvent.remove(false)
        end = false
        startLevel()
    }

    function onBtn(btn) {
        var oneBars = bars.filter(
            (item) => Math.abs(item.x - btn.x) < 10 && item.state == 'active'
        )

        time.delayedCall(10, () => {
            if (oneBars.length > 0) {
                if (oneBars[0].y >= 424 && oneBars[0].y <= 486) {
                    {
                        oneBars[0].setTint(0x00ff00)
                        oneBars[0].state = 'inactive'

                        var idx = btns.indexOf(btn)
                        btnsSound[idx].play()
                        ++good
                    }
                } else {
                    {
                        oneBars[0].setTint(0xff0000)
                        oneBars[0].state = 'inactive'
                        wrong.play()
                    }
                }
            }
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
        transparent: true,

        scale: {
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        ...config,
    })
}
export default createGame
