const createGame = (config = {}) => {
    var gameImgs = [
        'room',
        'avatar',
        'item_1',
        'item_2',
        'item_3',
        'items_popup',
    ]

    var startPos = {
        common: { scale: 0.2 },
        images: {
            room: { x: 291, y: 293, depth: -3 },
            avatar: { x: 285, y: 320, depth: 2 },
            item_1: { x: 167, y: 607, depth: 4 },
            item_2: { x: 287, y: 607, depth: 4 },
            item_3: { x: 407, y: 607, depth: 4 },
            items_popup: { x: 289, y: 607, depth: 3 },
        },
    }
    var gameObjects = []

    var itemsConfig = {
        head: [
            { main: 'smotki_10' },
            { main: 'smotki_2' },
            { main: 'smotki_3' },
        ],
        top: [
            { main: 'smotki_5' },
            { main: 'smotki_4', back: 'smotki_1' },
            { main: 'smotki_6' },
        ],
        bottom: [
            { main: 'smotki_7' },
            { main: 'smotki_9' },
            { main: 'smotki_8' },
        ],
    }
    var winItems = {
        head: 2,
        top: 1,
        bottom: 2,
    }

    var startItems = {
        head: 0,
        top: 0,
        bottom: 0,
    }
    var cloths
    var items = []
    var openItems = []
    var chosen
    var chosenCloths
    var top
    var head
    var bottom
    var curLevel
    var that

    function preload() {
        that = this

        gameImgs.forEach((x) => {
            this.load.image(x, 'game6/' + x + '.png')
        })

        for (let i = 1; i <= 10; ++i) {
            this.load.image(
                'smotki_' + i.toString(),
                'game6/smotki(' + i.toString() + ').png'
            )
        }

        that.load.image('tutorial', 'game6/tutorial.png')
        that.load.image('start', 'game6/start.png')
        that.load.image('end', 'game6/end.png')
        that.load.image('restart', 'game6/restart.png')
        that.load.image('exit', 'game6/exit.png')
    }

    function create() {
        gameImgs.forEach((x) => {
            var img = this.add.image(
                startPos.images[x].x,
                startPos.images[x].y,
                x
            )
            img.setInteractive()
            img.setScale(startPos.common.scale)
            img.setDepth(startPos.images[x].depth)

            if (x.startsWith('item') && x != 'items_popup') {
                img.setInteractive()
                items.push(img)
                img.on(
                    'pointerdown',
                    function (pointer, localX, localY, event) {
                        chosen = this
                        items.forEach((i) => {
                            i.clearTint()
                        })
                        this.setTint(0x00ff11)

                        openItems.forEach((i) => {
                            i.destroy()
                        })

                        var chosenClothType

                        switch (x) {
                            case 'item_1':
                                chosenClothType = 'head'
                                break
                            case 'item_2':
                                chosenClothType = 'top'
                                break
                            case 'item_3':
                                chosenClothType = 'bottom'
                                break
                        }

                        openItems = []

                        for (let j = 1; j <= 3; ++j) {
                            var img = that.add.image(
                                this.x,
                                this.y - 100 * j,
                                'item_' + j.toString()
                            )
                            img.setInteractive()
                            img.setScale(startPos.common.scale)
                            img.setDepth(5)
                            img.on(
                                'pointerdown',
                                function (pointer, localX, localY, event) {
                                    chosen.clearTint()
                                    chosen.setTexture('item_' + j.toString())

                                    cloths[chosenClothType].setTexture(
                                        itemsConfig[chosenClothType][j - 1].main
                                    )
                                    if (
                                        'back' in
                                        itemsConfig[chosenClothType][j - 1]
                                    ) {
                                        cloths.back.setTexture(
                                            itemsConfig[chosenClothType][j - 1]
                                                .back
                                        )
                                        cloths.back.setAlpha(1)
                                    } else {
                                        cloths.back.setAlpha(0)
                                    }

                                    chosenCloths[chosenClothType] = j - 1

                                    openItems.forEach((i) => {
                                        i.destroy()
                                    })

                                    openItems = []

                                    if (isWin()) {
                                        endGame()
                                    }
                                }
                            )
                            openItems.push(img)
                        }
                    }
                )
            }
            gameObjects.push(img)
        })
        showTutorial()
    }

    function isWin() {
        return (
            chosenCloths.head == winItems.head &&
            chosenCloths.top == winItems.top &&
            chosenCloths.bottom == winItems.bottom
        )
    }

    function update() {}

    function resetLevel() {
        chosenCloths = { ...startItems }
        cloths.head.setTexture(itemsConfig.head[startItems.head].main)
        cloths.bottom.setTexture(itemsConfig.bottom[startItems.bottom].main)
        cloths.top.setTexture(itemsConfig.top[startItems.top].main)
        cloths.back.setTexture(itemsConfig.top[startItems.top].back)
        if (!('back' in itemsConfig.top[startItems.top])) {
            cloths.back.setAlpha(0)
        }

        var j = 1
        items.forEach((i) => {
            i.setTexture('item_' + j.toString())
            ++j
        })
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
        cloths = {}
        chosenCloths = { ...startItems }
        cloths.bottom = that.add.image(
            285,
            320,
            itemsConfig.bottom[startItems.bottom].main
        )
        cloths.top = that.add.image(
            285,
            320,
            itemsConfig.top[startItems.top].main
        )
        cloths.head = that.add.image(
            285,
            320,
            itemsConfig.head[startItems.head].main
        )
        cloths.back = that.add.image(
            285,
            320,
            itemsConfig.top[startItems.top].back
        )
        if (!('back' in itemsConfig.top[startItems.top])) {
            cloths.back.setAlpha(0)
        }

        cloths.head.setScale(0.2)
        cloths.top.setScale(0.2)
        cloths.bottom.setScale(0.2)
        cloths.back.setScale(0.2)

        cloths.head.setDepth(3)
        cloths.top.setDepth(3)
        cloths.bottom.setDepth(3)
        cloths.back.setDepth(1)
    }

    function restartLevel() {
        resetLevel()
        //startLevel();
    }

    function restartGame() {
        curLevel = 1
        resetLevel()
        //startLevel();
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
    })
}

export default createGame
