<template>
  <section
    class="house-page"
    :class="{ zoomed: zoomed }"
    @click="someMethod($event)"
  >
    <!--    <button @click="zoomed = true">Zoom</button>-->
    <!--    <button @click="zoomed = false">Unzoom</button>-->
    <!--    <button @click="curGame++">Next</button>-->
    <!--    <button @click="curGame&#45;&#45;">Prev</button>-->
    <!--    <div>{{ curGame }}</div>-->
    <template>
      <div
        class="house-page__container"
        :class="{ [`house-page__container_blur-content`]: showModal }"
      >
        <div class="house-page__content-container container">
          <div class="house-page__house sber-house">
            <nuxt-img
              preload
              placeholder
              class="sber-house__img"
              src="/house.png"
              alt="sber house image"
              @load="onImgLoad"
            />
            <template v-for="floorNum in floorCount">
              <div
                :key="floorNum"
                :class="[
                  `sber-house__floor floor floor_${floorCount - floorNum + 1}`,
                  {
                    [`floor_disabled`]: curGame < floorCount - floorNum + 1,
                  },
                ]"
              >
                <div class="floor__content">
                  <nuxt-img
                    v-if="floorNum === 6"
                    preload
                    placeholder
                    class="floor__img"
                    :src="`/floors/floor${floorCount - floorNum + 1}.png`"
                    :alt="`floor ${floorCount - floorNum + 1} img`"
                    @load="onImgLoad"
                  />
                  <nuxt-img
                    v-else
                    preload
                    placeholder
                    class="floor__img"
                    :src="`/floors/floor${floorCount - floorNum + 1}.png`"
                    :alt="`floor ${floorCount - floorNum + 1} img`"
                    @load="onImgLoad"
                  />
                  <template v-if="floorNum === 1">
                    <div
                      :class="`floor__top top top_${floorCount - floorNum + 1}`"
                    >
                      <DialogView
                        :id="floorNum"
                        bottom="102%"
                        right="40%"
                        :dialogs="dialogs[floorNum - 1].content"
                        :dialog-num="dialogs[floorNum - 1].timesClicked"
                        dialog-origin="right-bottom"
                        @click="dialogBtnClicked($event, floorNum - 1)"
                      />
                      <nuxt-img
                        preload
                        placeholder
                        class="top__img"
                        :src="`/tops/top${floorCount - floorNum + 1}.png`"
                        :alt="`top ${floorCount - floorNum + 1} image`"
                        @click.prevent="runDialog($event, floorNum - 1)"
                        @load="onImgLoad"
                      />
                    </div>
                  </template>
                  <template v-if="floorNum === 2">
                    <div
                      :class="`floor__top top top_${floorCount - floorNum + 1}`"
                    >
                      <DialogView
                        :id="floorNum"
                        bottom="102%"
                        right="55%"
                        :dialogs="dialogs[floorNum - 1].content"
                        :dialog-num="dialogs[floorNum - 1].timesClicked"
                        dialog-origin="right-bottom"
                        @click="dialogBtnClicked($event, floorNum - 1)"
                      />
                      <nuxt-img
                        preload
                        placeholder
                        class="top__img"
                        :src="`/tops/top${floorCount - floorNum + 1}.png`"
                        :alt="`top ${floorCount - floorNum + 1} image`"
                        @click.prevent="runDialog($event, floorNum - 1)"
                        @load="onImgLoad"
                      />
                    </div>
                  </template>
                  <template v-if="floorNum === 3">
                    <div
                      :class="`floor__top top top_${floorCount - floorNum + 1}`"
                    >
                      <DialogView
                        :id="floorNum"
                        bottom="102%"
                        right="40%"
                        :dialogs="dialogs[floorNum - 1].content"
                        :dialog-num="dialogs[floorNum - 1].timesClicked"
                        dialog-origin="right-bottom"
                        @click="dialogBtnClicked($event, floorNum - 1)"
                      />
                      <nuxt-img
                        preload
                        placeholder
                        :src="`/tops/top${floorCount - floorNum + 1}.png`"
                        :alt="`top ${floorCount - floorNum + 1} image`"
                        @click.prevent="runDialog($event, floorNum - 1)"
                        @load="onImgLoad"
                      />
                    </div>
                  </template>
                  <template v-if="floorNum === 4">
                    <div
                      :class="`floor__top top top_${floorCount - floorNum + 1}`"
                    >
                      <DialogView
                        :id="floorNum"
                        bottom="102%"
                        right="30%"
                        :dialogs="dialogs[floorNum - 1].content"
                        :dialog-num="dialogs[floorNum - 1].timesClicked"
                        dialog-origin="right-bottom"
                        @click="dialogBtnClicked($event, floorNum - 1)"
                      />
                      <nuxt-img
                        preload
                        placeholder
                        :src="`/tops/top${floorCount - floorNum + 1}.png`"
                        :alt="`top ${floorCount - floorNum + 1} image`"
                        @click.prevent="runDialog($event, floorNum - 1)"
                        @load="onImgLoad"
                      />
                    </div>
                  </template>
                  <template v-if="floorNum === 5">
                    <div
                      :class="`floor__top top top_${floorCount - floorNum + 1}`"
                    >
                      <DialogView
                        :id="floorNum"
                        bottom="102%"
                        right="40%"
                        :dialogs="dialogs[floorNum - 1].content"
                        :dialog-num="dialogs[floorNum - 1].timesClicked"
                        dialog-origin="right-bottom"
                        @click="dialogBtnClicked($event, floorNum - 1)"
                      />
                      <nuxt-img
                        :src="`/tops/top${floorCount - floorNum + 1}.png`"
                        :alt="`top ${floorCount - floorNum + 1} image`"
                        @click.prevent="runDialog($event, floorNum - 1)"
                        @load="onImgLoad"
                      />
                    </div>
                  </template>
                  <template v-if="floorNum === 6">
                    <div
                      :class="`floor__top top top_${floorCount - floorNum + 1}`"
                    >
                      <DialogView
                        :id="floorNum"
                        :disabled="showModal"
                        bottom="102%"
                        right="40%"
                        :dialogs="dialogs[floorNum - 1].content"
                        :dialog-num="dialogs[floorNum - 1].timesClicked"
                        dialog-origin="right-bottom"
                        @click="dialogBtnClicked($event, floorNum - 1)"
                      />
                      <nuxt-img
                        preload
                        placeholder
                        :src="`/tops/top${floorCount - floorNum + 1}.png`"
                        :alt="`top ${floorCount - floorNum + 1} image`"
                        @click.prevent="runDialog($event, floorNum - 1)"
                        @load="onImgLoad"
                      />
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <vue-final-modal
        v-model="showModal"
        classes="modal-container"
        content-class="modal-content"
        @closed="closeModal"
      >
        <template v-if="curGame === 1">
          <div class="game1">
            <div v-if="gameStep === 0" class="game1__start-container">
              <!--              <Btn-->
              <!--                class="game1__close-btn"-->
              <!--                w="40px"-->
              <!--                h="40px"-->
              <!--                max-w="40px"-->
              <!--                max-h="40px"-->
              <!--                @click.native="closeModal"-->
              <!--              />-->
              <nuxt-img class="game1__start-img" src="/game1/game1-start.png" />
              <Btn
                class="game1__start-btn"
                bg="3"
                w="37%"
                h="10%"
                max-w="160px"
                max-h="50px"
                br="35"
                @click="startGame"
              />
            </div>
            <div v-else-if="gameStep === 1" class="game1__game-container">
              <template v-for="i in 5">
                <nuxt-img
                  v-if="!imgClicked[i - 1]"
                  preload
                  :key="i"
                  :class="`game1__item game1__item_${i}`"
                  :src="`/game1/item${i - 1}-ph.png`"
                  @click.native="onImgClicked($event, i - 1)"
                />
                <nuxt-img
                  v-else
                  preload
                  :key="i + 10"
                  :class="`game1__item game1__item_${i}`"
                  :src="`/game1/item${i - 1}.png`"
                  @click.native="onImgClicked($event, i - 1)"
                />
                <nuxt-img
                  preload
                  :key="i + 20"
                  :src="`game1/tracker${i - 1}.png`"
                  class="game1__tracker game-tracker"
                  :class="{
                    'game-tracker_visible':
                      imgClicked.filter((x) => x).length === i - 1,
                  }"
                />
              </template>
              <nuxt-img
                preload
                class="game1__tracker game-tracker"
                :class="{ 'game-tracker_visible': imgClicked.every((x) => x) }"
                src="/game1/tracker5.png"
              />
              <nuxt-img class="game1__floor" src="/floors/floor1.png" />
            </div>
            <div v-else-if="gameStep === 2" class="game1__finish-container">
              <!--              <Btn-->
              <!--                class="game1__close-btn"-->
              <!--                w="40px"-->
              <!--                h="40px"-->
              <!--                max-w="40px"-->
              <!--                max-h="40px"-->
              <!--                @click.native="closeModal"-->
              <!--              />-->
              <nuxt-img
                class="game1__start-img"
                src="/game1/game1-finish.png"
              />
              <Btn
                class="game1__start-btn"
                bg="4"
                w="37%"
                h="10%"
                max-w="160px"
                max-h="50px"
                br="35"
                @click="closeModalAndMoveGame"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <PhaserGame v-if="createGame" :create-game="createGame" />
        </template>
      </vue-final-modal>
    </template>
  </section>
</template>

<script>
import PhaserGame from 'nuxtjs-phaser/dist/phaserGame.vue'
import dataDialogs from '~/data/dialogs'

// eslint-disable-next-line no-unused-vars
const setPhaserFocus = () => {
  const phaser = document.getElementById('phaser')
  if (phaser) phaser.focus()
}
export default {
  name: 'Index2',
  components: { PhaserGame },
  data() {
    return {
      createGame: undefined,
      curGame: 1,
      isLoading: true,
      imgLoaded: 0,

      dialogs: dataDialogs,
      showModal: false,
      imgClicked: [false, false, false, false, false],
      gameStep: 0,
      gameFinished: [false, false, false, false, false, false],

      floorCount: 6,

      floorCookieValue: 0,
      floorCookieName: 'floor',
      floorCookieOptions: {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      },
      zoomed: false,
    }
  },
  watch: {
    floorCookieValue(newValue) {
      this.setFloorCookie(newValue)
    },
    imgLoaded(newValue) {
      if (newValue > 24) this.isLoading = false
    },
    curGame(newValue) {
      if (newValue > 1) setPhaserFocus()
    },
    imgClicked: {
      deep: true,
      handler: function (newValue) {
        if (newValue.every((x) => x)) {
          setTimeout(() => {
            this.gameStep = 2
          }, 1000)
        }
      },
    },
  },
  beforeCreate() {},
  created() {
    this.floorCookieValue = +this.getFloorCookie(this.floorCookieName)
  },
  methods: {
    async dialogBtnClicked(event, floorNum) {
      this.showModal = true
      if (this.curGame > 1) {
        this.createGame = await this.getGame()
        setPhaserFocus()

        this.$nextTick(() => {
          this.$phaser.eventEmitter.addListener(
            'exit',
            () => {
              this.closeModalAndMoveGame()
            },
            this
          );
          this.$phaser.eventEmitter.addListener(
            'close',
            () => {
              this.createGame = null;
              this.closeModal()
            },
            this
          );

        })
      }
    },
    runDialog(event, dialogNum) {
      this.dialogs[dialogNum].timesClicked += 1
      if (
        this.dialogs[dialogNum].timesClicked >=
        this.dialogs[dialogNum].content.length
      )
        this.dialogs[dialogNum].timesClicked = 0
    },

    getFloorCookie() {
      return this.$cookies.get(this.floorCookieName)
    },
    setFloorCookie(value) {
      this.$cookies.set(this.floorCookieName, value, this.floorCookieOptions)
    },

    closeModal() {
      this.showModal = false
    },
    closeModalAndMoveGame() {
      this.closeModal()
      this.curGame++
    },

    startGame() {
      this.gameStep = 1
    },
    onImgClicked(event, i) {
      this.$set(this.imgClicked, i, true)
    },
    onImgLoad() {
      this.imgLoaded++
    },
    async getGame() {
      const { default: createGame } = await import(
        `../games/game${this.curGame}.js`
      )
      return createGame
    },

    someMethod(event) {
      // clientX/Y gives the coordinates relative to the viewport in CSS pixels.
      console.log('clientX: ' + event.clientX)
      console.log('clientY: ' + event.clientY)

      // pageX/Y gives the coordinates relative to the <html> element in CSS pixels.
      console.log('eventX: ' + event.pageX)
      console.log('eventY: ' + event.pageY)

      // screenX/Y gives the coordinates relative to the screen in device pixels.
      console.log('screenX: ' + event.screenX)
      console.log('screenY: ' + event.screenY)
    },
  },
}
</script>

<style scoped lang="less">
.zoomed {
  transform: scale(4);
  transform-origin: center bottom;
  -moz-transform: scale(4);
  -moz-transform-origin: center bottom;
  transition: all 0.5s ease;
}

a {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.house-page {
  background: rgb(161, 183, 255);
  background: no-repeat center center;
  background-image: url('~static/bgs/house-bg.png');
  background-image: url('~static/bgs/house-bg.png'),
    linear-gradient(
      0deg,
      rgba(222, 222, 246, 1) 0%,
      rgba(240, 207, 241, 1) 35%,
      rgba(161, 183, 255, 1) 100%
    );
  background-size: auto 100%;

  &__container_blur-content {
    filter: blur(5px);
  }

  &__house {
    position: relative;
  }
}

.top {
  height: auto;
  max-width: 100%;
  position: absolute;

  &:hover {
    cursor: pointer;
    transition: transform 0.15s ease-in;
    //transform: scale(1.05);
    transform-origin: center bottom;

    //filter: drop-shadow(0 0 45px rgb(82, 216, 215));
  }

  &_1 {
    left: 25.3%;
    bottom: 0;
    width: 13%;
  }

  &_2 {
    right: 35.5%;
    bottom: -0.8%;
    width: 8%;
  }

  &_3 {
    right: 61.8%;
    bottom: -0.5%;
    width: 11.8%;
  }

  &_4 {
    right: 19%;
    bottom: 2.5%;
    width: 9%;
  }

  &_5 {
    right: 24%;
    bottom: 2.5%;
    width: 10.1%;
  }

  &_6 {
    right: 15%;
    bottom: -1%;
    width: 6%;
  }
}

.floor {
  display: block;
  position: absolute;
  user-select: none;

  &_disabled {
    pointer-events: none;
    touch-action: none;
    &:hover {
      transform: none !important;
    }
    opacity: 0.4;
  }

  &-link {
    width: auto;
    height: auto;
  }

  &_1 {
    bottom: 5.9%;
    right: 21.15%;
    width: 64%;
    height: auto;
  }

  &_2 {
    bottom: 19%;
    right: 25%;
    width: 66.85%;
    height: auto;
  }

  &_3 {
    bottom: 32.1%;
    right: 20%;
    width: 67.4%;
    height: auto;
  }

  &_4 {
    bottom: 44.7%;
    right: 29%;
    width: 69.5%;
    height: auto;
  }

  &_5 {
    top: 26%;
    right: 19.5%;
    width: 72%;
    height: auto;
  }

  &_6 {
    top: 16.5%;
    right: 27%;
    width: 64%;
    height: auto;
  }

  &__content {
    position: relative;
  }

  &__img {
    display: block;
    margin: 0;
    max-width: 100%;
    position: relative;

    z-index: 1;
  }

  &__top {
    z-index: 2;
  }
}

.bordered {
  outline: 4px solid yellow;
}

.game1 {
  &__close-btn {
    background: url('~static/btns/close.png') no-repeat center center;
    background-size: contain;
    box-shadow: none;
    border: none;
    border-radius: 60px;
    position: absolute;
    top: 18%;
    right: 27%;
  }

  &__game-container {
    position: relative;
  }

  &__item {
    display: none;
    position: absolute;

    &_1 {
      display: block;
      bottom: 3.1%;
      right: 2.7%;
      height: 64%;
      width: auto;
      z-index: 2;

      bottom: 3.55%;
      right: 2.6%;
      height: 64.6%;
      width: auto;
    }

    &_2 {
      display: block;
      top: 21.7%;
      left: 22.4%;
      height: 7.6%;
      width: auto;
    }

    &_3 {
      display: block;
      bottom: 26.8%;
      left: 13.6%;
      height: 10.5%;
      width: auto;

      bottom: 26.6%;
      left: 13.6%;
      height: 10.8%;
      width: auto;
    }

    &_4 {
      display: block;
      right: 35.6%;
      top: 33%;
      height: 3.4%;
      width: auto;

      right: 35.6%;
      top: 32.9%;
      height: 3.6%;
      width: auto;
    }

    &_5 {
      display: block;
      right: 3.4%;
      top: 40.1%;
      width: 14%;
      height: auto;
    }
  }

  &__top {
    position: absolute;
    bottom: 3%;
    left: 35.5%;
    width: 11%;
    height: 65%;
  }

  &__start-container {
    position: relative;
  }

  &__start-btn {
    position: absolute;
    bottom: 35%;
    left: 50%;
    transform: translateX(-50%);

    &:active {
      transform: translate(-50%, 2px);
    }
  }

  &__start-img {
    max-height: 100vh;
  }

  &__tracker {
    position: absolute;
    top: 10%;
    left: 5%;
    display: none;
  }
}

.game-tracker {
  &_visible {
    display: block;
  }
}

.zoomed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.none {
  display: none;
}

::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
::v-deep .modal-content {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 0.25rem;
  background: transparent;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
