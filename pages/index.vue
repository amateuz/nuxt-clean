<template>
  <div>
    <section class="preload">
      <nuxt-img :src="`/bgs/house-bg2.png`" />
      <nuxt-img :src="`/bgs/btn-bg.png`" />
      <nuxt-img :src="`/bgs/start-bg-1.png`" />
      <nuxt-img :src="`/bgs/start-bg-2.png`" />
      <template v-for="i in 6">
        <nuxt-img :key="i" :src="`/btns/btn${i}-text.png`" />
      </template>
      <nuxt-img :src="`/btns/close.png`" />
      <nuxt-img :src="`/btns/notice.png`" />
      <template v-for="i in 5">
        <nuxt-img :key="i + 10" :src="`/floors/floor${i}.png`" />
      </template>
      <nuxt-img :src="`/floors/floor1christmas.png`" />
      <template v-for="i in 5">
        <nuxt-img :key="i + 20" :src="`/game1/items/item${i}.png`" />
        <nuxt-img :key="i + 30" :src="`/game1/items/item${i}out.png`" />
      </template>
      <template v-for="i in 5">
        <nuxt-img :key="i + 40" :src="`/game1/tracker${i}.png`" />
      </template>
      <nuxt-img :src="`/game1/game1-finish.png`" />
      <nuxt-img :src="`/game1/game1-start.png`" />
      <template v-for="i in 6">
        <nuxt-img :key="i + 50" :src="`/tops/top${i}.png`" />
      </template>
      <template v-for="i in 6">
        <nuxt-img :key="i + 60" :src="`/comics/frame${i}.svg`" />
      </template>
      <nuxt-img :src="`/house2.png`" />
      <nuxt-img :src="`/popup-rules.png`" />
      <audio src="/sounds/button_common.mp3" />
      <audio src="/sounds/pageTurn.mp3" />
    </section>
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
                  <nuxt-img src="/carousel/slide0.png" />
                </div>
              </div>
              <div class="carousel__slide slide">
                <div class="slide__content">
                  <nuxt-img src="/carousel/slide1.png" />
                </div>
              </div>
              <div class="carousel__slide slide">
                <div class="slide__content">
                  <nuxt-img src="/carousel/slide2.png" />
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
                  <nuxt-img src="/carousel/mobile/slide0.png" />
                </div>
              </div>
              <div class="carousel__slide slide">
                <div class="slide__content">
                  <nuxt-img src="/carousel/mobile/slide1.png" />
                </div>
              </div>
              <div class="carousel__slide slide">
                <div class="slide__content">
                  <nuxt-img src="/carousel/mobile/slide2.png" />
                </div>
              </div>
              <div class="carousel__slide slide">
                <div class="slide__content">
                  <nuxt-img src="/carousel/mobile/slide3.png" />
                </div>
              </div>
              <div class="carousel__slide slide">
                <div class="slide__content">
                  <nuxt-img src="/carousel/mobile/slide4.png" />
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
            <NuxtLink
              @click.native="playBtnClick"
              class="carousel-section__btn"
              :class="[
                { 'carousel-section__btn_green': btnGreen },
                {
                  'carousel-section__btn_red': !btnGreen,
                },
              ]"
              to="/house"
            />
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
  name: 'MyComponent',
  components: { VueSlickCarousel },
  data() {
    return {
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
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.btnGreen = newSlideIndex !== 2
      } else if (this.$vuetify.breakpoint.smAndDown) {
        this.btnGreen = newSlideIndex !== 4
      }
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
    playTurnSound() {
      const audio = new Audio('/sounds/pageTurn.mp3')
      audio.play()
    },
    playBtnClick() {
      const audio = new Audio('/sounds/button_common.mp3')
      audio.play()
    },
  },
  mounted() {
    if (!this.audio) this.playBackgroundSound()
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
  background: url('@/static/bgs/comics-bg.png') no-repeat center center;
  background-size: cover;
  position: relative;
  min-height: 100vh;

  --scale: 1;

  @media (max-width: 1600px) {
    --scale: 1;
  }

  @media (max-width: 1280px) {
    --scale: 0.75;
  }

  @media (max-width: 900px) {
    --scale: 0.75;
  }

  @media (max-width: 500px) {
    --scale: 0.6;
  }
  &__btn {
    &_green {
      background-image: url('~static/btns/btn1-text.png');
    }
    &_red {
      background-image: url('~static/btns/btn7-text.png');
    }

    background: no-repeat center;
    background-size: cover;
    display: block;
    width: calc(238.33px * var(--scale));
    height: calc(75px * var(--scale));
    box-shadow: 0 3.33333px 0 #56171f,
      inset 0 1.66667px 0 rgba(255, 255, 255, 0.25);
    border-radius: 20px;
    transition: transform 0.05s ease;

    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);

    &:hover {
      filter: brightness(105%);
    }

    &:active {
      box-shadow: none;
      transform: translate(-50%, 2px);
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
        margin-left: auto;
        margin-right: auto;
        max-height: 100%;
      }

      &_page {
        background: url('@/static/carousel/page.png') no-repeat center center;
        background-size: cover;
        width: 390px;
      }
    }
  }
}
</style>
