<template>
  <section class="start-page">
    <NuxtLink
      @click.native="playBtnClick"
      class="start-page__btn"
      to="/comics"
    />
    <section class="preload">
      <nuxt-img :src="`/bgs/house-bg2.png`" />
      <nuxt-img :src="`/bgs/btn-bg.png`" />
      <nuxt-img :src="`/bgs/start-bg-3.png`" />
      <template v-for="i in 10">
        <nuxt-img :key="i" :src="`/btns/btn${i}-text.png`" />
      </template>
      <nuxt-img :src="`/btns/close.png`" />
      <nuxt-img :src="`/btns/notice.png`" />
      <template v-for="i in 6">
        <nuxt-img :key="i + 10" :src="`/floors/floor${i}.png`" />
        <nuxt-img :key="i + 70" :src="`/floors/floor${i}christmas.png`" />
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
      <template v-for="i in 5">
        <nuxt-img :key="i + 80" :src="`/tops/top${i}christmas.png`" />
      </template>
      <template v-for="i in 6">
        <nuxt-img :key="i + 60" :src="`/comics/frame${i}.svg`" />
      </template>
      <nuxt-img :src="`/house2.png`" />
      <nuxt-img :src="`/popup-rules.png`" />
      <nuxt-img :src="`/popup-magic.png`" />
      <nuxt-img :src="`/popup-treasure.png`" />
      <nuxt-img :src="`/tops/top1state2.png`" />
      <nuxt-img :src="`/tops/top2state2.png`" />
      <nuxt-img :src="`/tops/top3state2.png`" />
      <nuxt-img :src="`/tops/top3state3.png`" />
      <nuxt-img :src="`/tops/top123.png`" />
      <nuxt-img :src="`/tops/top124.png`" />
      <nuxt-img :src="`/tops/topall.png`" />
      <audio src="/sounds/button_common.mp3" />
      <audio src="/sounds/pageTurn.mp3" />
    </section>
  </section>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      audio: null,
      audioBtn: null,
    }
  },
  methods: {
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
  },
  mounted() {
    if (!this.audio) this.playBackgroundSound()
  },
  beforeDestroy() {
    if (this.audio) this.audio.pause()
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
.start-page {
  background: url('~static/bgs/snechok_8.gif'),
    url('~static/bgs/start-bg-3.png') no-repeat center 30% #fff;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  overflow: auto;

  @media (max-width: 500px) {
    background-size: 236vw 100vh;
  }

  &__btn {
    background: #1d9a89 url('~static/btns/btn8-text.png') no-repeat;
    background-size: contain;
    display: block;
    width: 238.33px;
    height: 75px;
    max-width: 238.33px;
    max-height: 75px;
    box-shadow: 0 3.33333px 0 #56171f,
      inset 0 1.66667px 0 rgba(255, 255, 255, 0.25);
    border-radius: 20px;
    margin-bottom: max(15px, 2%);
    transition: transform 0.1s ease;
    transform: translateX(5%);

    @media (max-width: 500px) {
      margin-bottom: max(50px, 15%);
    }

    &:hover {
      filter: brightness(105%);
      transform: scale(1.05) translateX(5%);
    }

    &:active {
      box-shadow: none;
      transform: translate(5%, 2px);
    }
  }
}
</style>
