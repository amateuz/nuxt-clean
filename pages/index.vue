<template>
  <section class="start-page">
    <NuxtLink class="start-page__btn" to="/comics" />
    <section class="preload">
      <nuxt-img :src="`/bgs/house-bg.png`" />
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
      <nuxt-img :src="`/house.png`" />
      <nuxt-img :src="`/popup-rules.png`" />
    </section>
  </section>
</template>

<script>
export default {
  name: 'Index',
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
    url('~static/bgs/start-bg-1.png') no-repeat center 75% #fff;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  overflow: auto;

  &__btn {
    background: #1d9a89 url('~static/btns/btn1-text.png');
    background-size: contain;
    display: block;
    width: 238.33px;
    height: 75px;
    box-shadow: 0 3.33333px 0 #56171f,
      inset 0 1.66667px 0 rgba(255, 255, 255, 0.25);
    border-radius: 20px;
    margin-bottom: 100px;
    transition: transform 0.05s ease;

    &:hover {
      filter: brightness(110%);
    }

    &:active {
      box-shadow: none;
      transform: translate(0, 2px);
    }
  }
}
</style>
