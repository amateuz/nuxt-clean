<template>
  <div>
    <section class="carousel-section">
      <template>
        <div class="container">
          <div class="carousel-container">
            <VueSlickCarousel
              v-show="$vuetify.breakpoint.mdAndUp"
              class="carousel"
              v-bind="settings"
              :arrows="true"
              @beforeChange="onChange"
            >
              <div class="carousel__slide slide">
                <div class="slide__content">
                  <nuxt-img src="/carousel2/slide1.png" />
                </div>
              </div>
              <div class="carousel__slide slide">
                <div class="slide__content">
                  <nuxt-img src="/carousel2/slide2.png" />
                </div>
              </div>

              <template #prevArrow>
                <nuxt-img
                  @click="playTurnSound"
                  src="/btns/prev-btn.png"
                  class="carousel__arrow carousel__arrow_prev"
                />
              </template>
              <template #nextArrow>
                <nuxt-img
                  @click="playTurnSound"
                  src="/btns/next-btn.png"
                  class="carousel__arrow carousel__arrow_next"
                />
              </template>
            </VueSlickCarousel>
            <VueSlickCarousel
              v-show="$vuetify.breakpoint.smAndDown"
              class="carousel carousel_mobile"
              v-bind="settings"
              :arrows="true"
              @beforeChange="onChange"
            >
              <div class="carousel__slide slide">
                <div class="slide__content">
                  <nuxt-img src="/carousel2/mobile/slide1.png" />
                </div>
              </div>
              <div class="carousel__slide slide">
                <div class="slide__content">
                  <nuxt-img src="/carousel2/mobile/slide2.png" />
                </div>
              </div>
              <div class="carousel__slide slide">
                <div class="slide__content">
                  <nuxt-img src="/carousel2/mobile/slide3.png" />
                </div>
              </div>
              <template #prevArrow>
                <nuxt-img
                  @click="playTurnSound"
                  src="/btns/prev-btn.png"
                  class="carousel__arrow carousel__arrow_prev"
                />
              </template>
              <template #nextArrow>
                <nuxt-img
                  @click="playTurnSound"
                  src="/btns/next-btn.png"
                  class="carousel__arrow carousel__arrow_next"
                />
              </template>
            </VueSlickCarousel>
            <div class="carousel-section__btn-wrapper">
              <NuxtLink
                v-show="showReturnBtn"
                @click.native="playBtnClick"
                class="carousel-section__btn carousel-section__btn_red"
                to="/house"
              />
              <a
                @click="
                  playBtnClick()
                  showReturnBtn = true
                "
                class="carousel-section__btn"
                :class="[
                  { 'carousel-section__btn_green': btnGreen },
                  {
                    'carousel-section__btn_red': !btnGreen,
                  },
                ]"
                href="https://t.me/+s3XyTFfAsmUyOTUy"
                target="_blank"
              />
            </div>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'ComicsFinal',
  components: { VueSlickCarousel },
  computed: {
    getVuetifyBreakpoint() {
      return this.$vuetify.breakpoint.name
    },
  },
  data() {
    return {
      showReturnBtn: true,
      eventListener: null,
      carouselItemNum: 0,
      krampusMobile: [],
      krampus: [],
      audio: null,
      btnGreen: true,
      settings: {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
      },
    }
  },
  methods: {
    onChange(oldSlideIndex, newSlideIndex) {
      this.carouselItemNum = newSlideIndex

      if (newSlideIndex !== 2) {
        this.krampus.forEach((k) => {
          k.pause()
          k.currentTime = 0
        })
        this.krampusMobile.forEach((k) => {
          k.pause()
          k.currentTime = 0
        })
      }

      // if (this.$vuetify.breakpoint.mdAndUp) {
      // this.btnGreen = newSlideIndex !== 1
      if (newSlideIndex === 0) {
        this.krampus[newSlideIndex].play()
        this.eventListener = this.krampus[newSlideIndex].addEventListener(
          'ended',
          () => {
            this.krampus[newSlideIndex + 1].play()
          }
        )
      } else if (newSlideIndex <= 1) {
        if (this.eventListener !== null)
          this.krampus[0].removeEventListener('ended', this.eventListener)
        this.krampus[2].play()
      }
      // } else if (this.$vuetify.breakpoint.smAndDown) {
      // this.btnGreen = newSlideIndex !== 3
      // this.krampusMobile[newSlideIndex].play()
      // }
    },
    playTurnSound() {
      const audio = new Audio('/sounds/pageTurn.mp3')
      audio.play()
    },
    playBackgroundSound() {
      this.audio = new Audio('/sounds/sbergrinch_main_loop.mp3')
      this.audio.addEventListener(
        'ended',
        function () {
          this.currentTime = 0
          this.play()
        },
        false
      )
      this.audio.play()
    },
    playBtnClick() {
      const audio = new Audio('/sounds/button_common.mp3')
      audio.play()
    },
  },
  mounted() {
    if (!this.audio) this.playBackgroundSound()
    this.$nextTick(() => {
      for (let i = 5; i <= 7; i++) {
        // if (i <= 2) this.krampus.push(new Audio(`/sounds/Krampus${i}.mp3`))
        this.krampus.push(new Audio(`/sounds/Krampus${i}_mobile.mp3`))
        this.krampusMobile.push(new Audio(`/sounds/Krampus${i}_mobile.mp3`))
      }

      // if (this.$vuetify.breakpoint.smAndDown) this.krampusMobile[0].play()
      // else {
      this.krampus[0].play()
      this.eventListener = this.krampus[0].addEventListener('ended', () => {
        this.krampus[1].play()
        this.krampus[0].removeEventListener('ended', this.eventListener)
      })
      // }
    })
  },
  beforeDestroy() {
    if (this.audio) this.audio.pause()

    this.krampus.forEach((k) => {
      k.pause()
      k.currentTime = 0
    })
    this.krampusMobile.forEach((k) => {
      k.pause()
      k.currentTime = 0
    })
  },
  watch: {
    /* getVuetifyBreakpoint(oldValue, newValue) {
      if (
        (['xs', 'sm'].includes(oldValue) && ['xs', 'sm'].includes(newValue)) ||
        (['md', 'lg', 'xl'].includes(oldValue) &&
          ['md', 'lg', 'xl'].includes(newValue))
      )
        return

      if (['xs', 'sm'].includes(newValue)) {
        this.krampus.forEach((k) => {
          k.pause()
          k.currentTime = 0
        })

        this.krampusMobile[this.carouselItemNum].play()
      } else {
        this.krampusMobile.forEach((k) => {
          k.pause()
          k.currentTime = 0
        })

        if (this.carouselItemNum < 2)
          this.krampusMobile[this.carouselItemNum].play()
      }
    }, */
  },
}
</script>

<style scoped lang="less">
.preload {
  display: none;

  img {
    width: 0;
    height: 0;
  }
}
.carousel-section {
  background: url('@/static/bgs/start-bg-2.png') no-repeat center center;
  background-size: cover;
  position: relative;
  min-height: 100vh;

  --scale: 1;

  @media (max-width: 1600px) {
    --scale: 1;
  }

  @media (max-width: 1280px) {
    --scale: 0.85;
  }

  @media (max-width: 950px) {
    --scale: 0.75;
  }

  @media (max-width: 750px) {
    --scale: 0.65;
  }

  &__btn {
    &_green {
      background-image: url('~static/btns/btn9-text.png');
    }
    &_red {
      background-image: url('~static/btns/btn7-text.png');
    }

    background: no-repeat center;
    background-size: cover;
    display: block;
    width: calc(256px * var(--scale));
    height: calc(56px * var(--scale));
    box-shadow: 0 3.33333px 0 #56171f,
      inset 0 1.66667px 0 rgba(255, 255, 255, 0.25);
    border-radius: 20px;
    transition: transform 0.1s ease;
    transform-origin: center center;
    margin: 10px;

    // position: absolute;
    // bottom: -7%;
    // left: 50%;
    transform: translateX(-50%);

    &:hover {
      filter: brightness(105%);
      transform: scale(1.05) translateX(-48%);
    }

    &:active {
      box-shadow: none;
      transform: translate(-50%, 2px);
    }

    &-wrapper {
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: absolute;
      bottom: -7%;
      left: 50%;
      transform: translateX(-26.5%);
      flex-wrap: wrap;

      @media (max-width: 650px) {
        transform: translateX(-17.5%);
      }

      @media (max-width: 475px) {
        transform: translateX(-12.5%);
      }
    }
  }
}
.container {
  max-width: 1440px;
  padding: 0 !important;
}
.carousel-container {
  position: relative;
}
.carousel {
  @r: .carousel;

  max-height: 100vh;

  img {
    max-height: 85vh;
  }

  &_mobile {
    @{r}__arrow {
      top: 74%;

      &_prev {
        left: 38%;
      }

      &_next {
        right: 38%;
      }
    }
  }

  &__arrow {
    width: calc(61px * var(--scale));
    height: calc(71px * var(--scale));
    z-index: 10;
    transform: translate(0, -50%);
    &:hover {
      filter: brightness(105%);
    }
    &:active {
      transform: translate(0, calc(-50% + 2px));
    }
    transition: translate 0.05s ease;

    &_next {
      right: 5%;
    }

    &_prev {
      left: 5%;
    }
  }

  .slide {
    width: auto;

    &__content {
      max-height: 100%;
      margin-left: auto;
      margin-right: auto;

      img {
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
}
</style>
