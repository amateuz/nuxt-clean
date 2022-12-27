<template>
  <section class="house-page" :class="{ zoomed: zoomed }">
    <!--    <button @click="zoomed = true">Zoom</button>-->
    <!--    <button @click="zoomed = false">Unzoom</button>-->
    <!--    <button @click="curGame++">Next</button>-->
    <!--    <button @click="curGame&#45;&#45;">Prev</button>-->
    <!--    <div>{{ curGame }}</div>-->
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
            src="/house2.png"
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
                  preload
                  placeholder
                  class="floor__img"
                  :src="getFloorSrc(floorCount - floorNum + 1)"
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
                    v-if="curGame <= 2"
                    :class="`floor__top top top_${floorCount - floorNum + 1}`"
                  >
                    <nuxt-img
                      :src="`/tops/top${floorCount - floorNum + 1}.png`"
                      :alt="`top ${floorCount - floorNum + 1} image`"
                      @click.prevent="runDialog($event, floorNum - 1)"
                      @load="onImgLoad"
                    />
                    <DialogView
                      v-if="curGame === 2 && gameStep < 2"
                      :id="floorNum"
                      bottom="102%"
                      right="40%"
                      :dialogs="dialogs[floorNum - 1].content"
                      :dialog-num="dialogs[floorNum - 1].timesClicked"
                      dialog-origin="right-bottom"
                      @click="dialogBtnClicked($event, floorNum - 1)"
                    />
                    <DialogView
                      v-else-if="curGame === 2 && gameStep === 2"
                      :id="9"
                      bottom="102%"
                      right="-180%"
                      :dialogs="dialogs[8].content"
                      :dialog-num="dialogs[8].timesClicked"
                      :visible="true"
                      :visibility-timeout="500"
                      :hiding-timeout="1100"
                    />
                  </div>
                  <div
                    v-if="gameStep >= 2 && curGame === 2"
                    class="top top_1_christmas_floor2 no-iteraction"
                  >
                    <nuxt-img
                      src="/tops/top1christmas.png"
                      alt="top 1 christmas image"
                    />
                    <div class="top_1_christmas_floor2__dialog">
                      <DialogView
                        v-if="curGame === 2 && gameStep === 2"
                        :id="10"
                        :dialogs="dialogs[9].content"
                        :dialog-num="dialogs[9].timesClicked"
                        :visible="true"
                        :visibility-timeout="1600"
                        :hiding-timeout="2700"
                        @end="
                          gameStep = 0
                          curGame = 3
                          showModal = true
                        "
                      />
                    </div>
                  </div>
                </template>
                <template v-if="floorNum === 6">
                  <div
                    v-if="curGame === 1"
                    class="floor__top top"
                    :class="[
                      {
                        [`top_${floorCount - floorNum + 1}`]:
                          gameStep < 2 && curGame === 1,
                      },
                      {
                        [`top_${
                          floorCount - floorNum + 1
                        }_christmas no-iteraction`]:
                          gameStep >= 2 && curGame === 1,
                      },
                    ]"
                  >
                    <nuxt-img
                      preload
                      placeholder
                      :src="getTopSrc(1)"
                      :alt="`top ${floorCount - floorNum + 1} image`"
                      @click.prevent="runDialog($event, floorNum - 1)"
                      @load="onImgLoad"
                    />
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
                    <DialogView
                      :id="7"
                      v-if="gameStep === 3"
                      class="top__dialog_clock"
                      :dialogs="dialogs[6].content"
                      :dialog-num="dialogs[6].timesClicked"
                      :visible="true"
                      :visibility-timeout="500"
                      :hiding-timeout="1100"
                    />
                    <DialogView
                      :id="8"
                      v-if="gameStep === 3"
                      class="top__dialog_top6_christmas"
                      :dialogs="dialogs[7].content"
                      :dialog-num="dialogs[7].timesClicked"
                      dialog-origin="right-bottom"
                      :visible="true"
                      :visibility-timeout="1600"
                      :hiding-timeout="2700"
                      @end="
                        gameStep = 0
                        curGame = 2
                        showModal = true
                      "
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
      @closed="
        closeModal()
        isModalPopupRules = false
      "
    >
      <template v-if="isModalPopupRules">
        <div class="notice">
          <nuxt-img class="notice__img" src="/popup-rules.png" />
          <Btn
            w="37%"
            h="10%"
            max-w="160px"
            max-h="50px"
            bg="6"
            br="35"
            class="notice__btn"
            @click="noticeClosed"
          />
        </div>
      </template>
      <template v-else-if="curGame === 1 && gameStep < 4">
        <div class="game1">
          <div class="game1__container">
            <template v-if="gameStep === 0">
              <Btn
                class="game1__close-btn"
                w="40px"
                h="40px"
                max-w="40px"
                max-h="40px"
                @click.native="closeModal"
              />
              <nuxt-img class="game1__img" src="/game1/game1-start.png" />
              <Btn
                class="game1__btn"
                bg="3"
                w="37%"
                h="10%"
                max-w="160px"
                max-h="50px"
                br="35"
                @click="startGame"
              />
            </template>
            <template v-else-if="gameStep === 1">
              <template v-for="i in 5">
                <nuxt-img
                  v-if="!imgClicked[i - 1]"
                  preload
                  :key="i"
                  :class="[`game1__item game1__item_${i}`]"
                  :src="`/game1/items/item${i}out.png`"
                  @click.native="onImgClicked($event, i - 1)"
                />
                <nuxt-img
                  v-else
                  preload
                  :key="i + 10"
                  :class="[
                    `game1__item game1__item_${i}`,
                    { 'no-interaction': i === 1 },
                  ]"
                  :src="`/game1/items/item${i}.png`"
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
            </template>
            <template v-else-if="gameStep === 2">
              <nuxt-img class="game1__img" src="/game1/game1-finish.png" />
              <Btn
                class="game1__btn"
                bg="4"
                w="37%"
                h="10%"
                max-w="160px"
                max-h="50px"
                br="35"
                @click="closeModalAndMoveGame"
              />
            </template>
          </div>
        </div>
      </template>
      <template v-else-if="gameStep === 0">
        <div class="notice">
          <nuxt-img class="notice__img" src="/popup-magic.png" />
          <div>
            {{ curGame }}
          </div>
          <Btn
            w="37%"
            h="10%"
            max-w="160px"
            max-h="50px"
            bg="6"
            br="35"
            class="notice__btn"
            @click="magicClosed"
          />
        </div>
      </template>
      <template v-else>
        <PhaserGame v-if="createGame" :create-game="createGame" />
      </template>
    </vue-final-modal>
    <button
      class="house-page__notice-btn"
      :class="{ swing: noticeAnimated }"
      @click="
        noticeAnimated = false
        isModalPopupRules = true
        showModal = true
      "
    />
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
      gameStep: 0,

      isLoading: true,
      imgLoaded: 0,
      noticeAnimated: true,
      isModalPopupRules: false,

      dialogs: dataDialogs,
      showModal: false,
      imgClicked: [false, false, false, false, false],
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
          }, 800)
        }
      },
    },
  },
  beforeCreate() {},
  created() {
    this.floorCookieValue = this.getFloorCookie(this.floorCookieName)
    this.curGame = 1 // this.floorCookieValue
    this.gameStep = 1
  },
  mounted() {
    const tops = document.getElementsByClassName('top')

    Array.prototype.forEach.call(tops, function (top) {
      top.style.visibility = 'visible'
    })
  },
  computed: {},
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
              this.createGame = null
              this.closeModalAndMoveGame()
            },
            this
          )
          this.$phaser.eventEmitter.addListener(
            'close',
            () => {
              this.createGame = null
              this.closeModal()
            },
            this
          )
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
      return this.$cookies.get(this.floorCookieName) ?? 1
    },
    setFloorCookie(value) {
      this.$cookies.set(this.floorCookieName, value, this.floorCookieOptions)
    },

    closeModal() {
      this.showModal = false
    },
    closeModalAndMoveGame() {
      this.closeModal()
      // this.curGame++
      if (this.curGame >= 3) {
        this.curGame++
        this.gameStep = 1
      } else {
        this.gameStep++
      }
      // this.setFloorCookie(this.curGame)
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
    noticeClosed() {
      this.showModal = false
      setTimeout(() => {
        this.isModalPopupRules = false
      }, 200)
    },
    magicClosed() {
      this.showModal = false
      this.gameStep = 1
    },

    getTopSrc(num) {
      const christmas = this.gameStep >= 2 ? 'christmas' : ''
      return `/tops/top${num}${christmas}.png`
    },
    getFloorSrc(num) {
      const christmas =
        (this.gameStep >= 2 && this.curGame === num) || this.curGame > num
          ? 'christmas'
          : ''
      return `/floors/floor${num}${christmas}.png`
    },
  },
}
</script>

<style scoped lang="less">
.no-interaction {
  cursor: default;

  &:hover {
    cursor: default;
  }

  pointer-events: none;
  touch-action: none;
}

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

.notice {
  position: relative;

  &__img {
    max-height: 100vh;
    max-width: 100%;
  }

  &__btn {
    position: absolute;
    bottom: 32%;
    left: 50%;

    transform: translateX(-50%);

    &:active {
      transform: translate(-50%, 2px);
    }
  }
}

.house-page {
  background: rgb(161, 183, 255);
  background: no-repeat center center;
  background-image: url('~static/bgs/house-bg2.png');
  background-image: url('~static/bgs/house-bg2.png'),
    linear-gradient(
      0deg,
      rgba(222, 222, 246, 1) 0%,
      rgba(240, 207, 241, 1) 35%,
      rgba(161, 183, 255, 1) 100%
    );
  background-size: auto 100%;

  &__container_blur-content {
    filter: blur(10px);
  }

  &__house {
    position: relative;
  }

  &__notice-btn {
    background: url('~static/btns/notice.png') no-repeat center center;
    background-size: contain;
    box-shadow: none;
    border: none;
    border-radius: 60px;
    position: fixed;

    right: 5%;
    top: 10%;
    width: 100px;
    height: 100px;
    max-width: 10vh;
    max-height: 10vh;
    transition: all 0.05s ease;

    &:hover {
      cursor: pointer;
      filter: brightness(105%);
    }

    &:active {
      transform: translate(0, 5px) !important;
    }
  }
}

.top {
  height: auto;
  max-width: 100%;
  position: absolute;
  // visibility: hidden;

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

    &_christmas {
      left: 38.3%;
      bottom: 0;
      width: 13%;

      &_floor2 {
        visibility: visible;
        bottom: 0;
        z-index: 3;
        transform: scaleX(-1);
        height: 66%;
        left: 30.5%;

        &__dialog {
          transform: scaleX(-1);
          position: relative;
          bottom: 124%;
          left: -73%;
        }

        img {
          max-height: 100%;
        }
      }
    }
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
    bottom: 2%;
    width: 10.1%;
  }

  &_6 {
    right: 15%;
    bottom: -3%;
    width: 6%;
  }

  &__dialog_clock {
    left: -112%;
    top: -37%;
  }

  &__dialog_top6_christmas {
    top: -30%;
    left: -55%;
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

  &__container {
    position: relative;
  }

  &__item {
    display: none;
    position: absolute;

    &_1 {
      display: block;
      bottom: 4.55%;
      right: 0.2%;
      height: 74.6%;
      width: auto;
      z-index: 2;
    }

    &_2 {
      display: block;
      top: 21.2%;
      left: 22.4%;
      height: 7.6%;
      width: auto;
    }

    &_3 {
      display: block;

      bottom: 26%;
      left: 13.6%;
      height: 10.8%;
      width: auto;
    }

    &_4 {
      display: block;

      right: 35.6%;
      top: 32.5%;
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

  &__btn {
    position: absolute;
    bottom: 35%;
    left: 50%;
    transform: translateX(-50%);

    &:active {
      transform: translate(-50%, 2px);
    }
  }

  &__img {
    max-height: 100vh;
  }

  &__tracker {
    position: absolute;
    top: 5%;
    left: 3%;
    width: 14%;
    height: auto;
    // display: none;
    z-index: 2;
  }
}

.game-tracker {
  &_visible {
    // display: block;
    z-index: 3;
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

@keyframes swing {
  3% {
    transform: rotate3d(0, 0, 1, 15deg);
  }

  6% {
    transform: rotate3d(0, 0, 1, -15deg);
  }

  9% {
    transform: rotate3d(0, 0, 1, 10deg);
  }

  12% {
    transform: rotate3d(0, 0, 1, -10deg);
  }

  15% {
    transform: rotate3d(0, 0, 1, 5deg);
  }

  18% {
    transform: rotate3d(0, 0, 1, -5deg);
  }

  21% {
    transform: rotate3d(0, 0, 1, 0deg);
  }

  to {
    transform: rotate3d(0, 0, 1, 0deg);
  }
}

.swing {
  transform-origin: top center;
  animation-name: swing;
  animation-iteration-count: 10;
  animation-delay: 3s;
  animation-duration: 10s;
}
</style>
