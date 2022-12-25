<template>
  <section class="comics">
    <div class="container">
      <template v-for="i in 6">
        <ComicsFrame :key="i" :class="`comics-frame_${i}`" :num="i" />
      </template>
      <div class="comics-frame_7">
        <NuxtLink class="comics__btn" to="/house" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Comics',
}
</script>

<style scoped lang="less">
.comics {
  background-color: #1b1b1b;
  color: #fff;
  overflow-x: hidden;
  padding: 50px;

  &__btn {
    background: url('~static/btns/btn2-text.png') #1d9a89 no-repeat;
    background-size: contain;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 281px;
    height: 81px;
    box-shadow: 0 3.60389px 0 #56171f,
      inset 0 1.80194px 0 rgba(255, 255, 255, 0.25);
    border-radius: 20px;
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

.comics-frame {
  width: 100%;

  &_2 {
    position: relative;
    left: -35px;
    top: -40px;
  }

  &_3 {
    position: relative;
    left: -140px;
    top: -25px;
  }

  &_4 {
    position: relative;
    left: 30px;
    top: -230px;
  }

  &_5 {
    position: relative;
    top: -250px;
    left: -60px;
  }

  &_6 {
    position: relative;
    top: -150px;
    left: 10px;
  }

  &_7 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 139px;
    background: url('~static/bgs/btn-bg.png') no-repeat center center;
  }
}

.bubble {
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid white;
  width: 1032px;
  height: 612px;

  shape-outside: polygon(0 0, 100% 0, 100% 100%, 30% 100%);
}
</style>
