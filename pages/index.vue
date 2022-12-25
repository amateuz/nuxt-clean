<template>
  <section class="start-page">
    <NuxtLink class="start-page__btn" to="/comics" />
  </section>
</template>

<script>
export default {
  name: 'Index',
}
</script>

<style scoped lang="less">
.start-page {
  background: url('~static/bgs/start-bg-1.png') no-repeat center 75% #662947;
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
