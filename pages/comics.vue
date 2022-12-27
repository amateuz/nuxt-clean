<template>
  <section class="comics">
    <div class="frameIntro">
      <div class="captionWrapper">
        <span class="caption">{{`Свет гирлянд сверкает всюду,\nЗакружился хоровод,\nГород радуется чуду.\nВ Сбер приходит Новый год!`}}</span>
      </div>

      <div class="imgWrapper imgWrapperElkaZoom">
        <nuxt-img class="img imgElkaZoom" src="comics1/elka-zoom.png" />
      </div>
      <div class="imgWrapper imgWrapperElka">
        <nuxt-img class="img imgElka" src="comics1/elka.gif" />
      </div>
    </div>

    <div class="frameSadParty">
      <div class="imgLayout">
        <div class="imgWrapper">
          <nuxt-img class="img" src="comics1/sad-party.gif" />
        </div>
      </div>

      <span class="caption">{{`Но не слышно там веселья,\nСмеха, праздных голосов.\nВ вихре снеговой метели\nВсе забыли про него!`}}</span>
    </div>

    <div class="frameCrampus">
      <span class="caption">{{`Но откуда наважденье?\nЧьих же дело это рук?\nПортит людям настроение —\nКрампус — лиходейный дух.`}}</span>

      <div class="imgLayout">
        <div class="imgWrapper">
          <nuxt-img class="img" src="comics1/crampus.gif" />
        </div>
      </div>
    </div>

    <div class="frameHero">
      <nuxt-img class="img" src="comics1/hero.gif" />

      <span class="caption">{{`Эту подлую затею\nЖдет безрадостный исход.\nВместе мы спугнем злодея\nИ вернем в Сбер Новый год!`}}</span>
    </div>

    <div class="startGame">
      <NuxtLink class="startGameBtn" to="/house" />
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
  --scale: 1;

  position: relative;
  z-index: 0;
  display: grid;
  justify-content: center;
  justify-items: center;
  padding: calc(50px * var(--scale));
  overflow-x: hidden;
  background-color: #000;
  color: #fff;

  @media (max-width: 1600px) {
    --scale: 0.85;
  }

  @media (max-width: 1280px) {
    --scale: 0.6;
  }

  @media (max-width: 900px) {
    --scale: 0.28;
  }
}

.caption {
  font-size: calc(34px * var(--scale));
  font-weight: 600;
  line-height: calc(44px * var(--scale));
  letter-spacing: -0.02em;
  white-space: pre-wrap;

  @media (max-width: 900px) {
    font-size: 16px;
    line-height: 21px;
  }
}

.frameIntro {
  --img-bottom-offset: 45px;

  position: relative;
  z-index: 0;
  display: grid;
  grid-template-rows: 1fr calc((712px - var(--img-bottom-offset)) * var(--scale));
  align-items: center;
  justify-items: center;
  width: max-content;

  .captionWrapper {
    position: relative;
    z-index: 1;
    display: grid;
    align-items: center;
    justify-items: center;
    width: calc(1037px * var(--scale));
    height: calc(612px * var(--scale));
    grid-row: 1;
    grid-column: 1/3;
    background: url('~static/comics1/intro.png') no-repeat center center;
    background-size: 100% 100%;
  }

  .caption {
    font-size: calc(40px * var(--scale));
    line-height: calc(51px * var(--scale));
    text-align: center;
  }

  .imgWrapper {
    position: relative;
    height: 100%;
  }

  .imgWrapperElka {
    width: calc(496px * var(--scale));
  }

  .imgWrapperElkaZoom {
    width: calc(594px * var(--scale));
  }

  .img {
    position: absolute;
  }

  .imgElka {
    bottom: 0;
    height: calc(712px * var(--scale));
  }

  .imgElkaZoom {
    bottom: calc(5px * var(--scale));
    height: calc(678px * var(--scale));
  }

  @media (max-width: 900px) {
    .caption {
      font-size: 16px;
      line-height: 21px;
    }
  }
}

.frameSadParty {
  position: relative;
  z-index: 0;
  display: grid;
  grid-template-columns: 1fr max-content;
  column-gap: calc(40px * var(--scale));
  width: calc(1124px * var(--scale));
  height: calc(672px * var(--scale));
  margin-top: calc(27px * var(--scale));

  .imgLayout {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .imgWrapper {
    position: absolute;
    right: 0;
    width: calc(768px * var(--scale));
    height: 100%;
  }

  .img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .caption {
    margin-top: calc(180px * var(--scale));
    text-align: left;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    column-gap: 0;
    width: 100%;
    height: max-content;
    margin-top: 40px;

    .caption {
      grid-row: 1;
      margin: 0;
      margin-bottom: 40px;
      text-align: center;
    }

    .imgLayout {
      position: static;
      width: 306px;
      height: 241px;
    }

    .imgWrapper {
      position: static;
      width: 100%;
      height: 100%;
    }

    .img {
      width: 100%;
      height: 100%;
    }
  }
}

.frameCrampus {
  position: relative;
  z-index: 0;
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: calc(90px * var(--scale));
  width: calc(1224px * var(--scale));
  height: calc(630px * var(--scale));

  .imgLayout {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .imgWrapper {
    position: absolute;
    left: 0;
    top: calc(-110px * var(--scale));
    width: calc(569px * var(--scale));
    height: calc(739px * var(--scale));
  }

  .img {
    width: 100%;
    height: 100%;
  }

  .caption {
    margin-top: calc(150px * var(--scale));
    text-align: left;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    column-gap: 0;
    justify-items: center;
    width: 100%;
    height: max-content;
    margin-bottom: 40px;

    .imgLayout {
      position: static;
      width: 228px;
      height: 273px;
    }

    .imgWrapper {
      position: static;
      width: 100%;
      height: 100%;
    }

    .caption {
      margin: 40px 0;
      text-align: center;
    }
  }
}

.frameHero {
  display: grid;
  align-items: center;

  .img {
    width: calc(1140px * var(--scale));
    height: calc(656px * var(--scale));
  }

  .caption {
    margin-top: calc(86px * var(--scale));
    text-align: center;
  }

  @media (max-width: 900px) {
    .caption {
      grid-row: 1;
      margin-bottom: 40px;
      text-align: center;
    }

    .img {
      width: 320px;
      height: 184px;
    }
  }
}

.startGame {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(540px * var(--scale));
  height: calc(232px * var(--scale));
  margin-top: calc(36px * var(--scale));
  background: url('~static/comics1/start-game.png') no-repeat center center;
  background-size: contain;

  
  @media (max-width: 900px) {
    width: 267px;
    height: 114px;
    margin-top: 40px;
  }
}

.startGameBtn {
  background: url('~static/btns/btn2-text.png') #1d9a89 no-repeat;
  background-size: contain;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: calc(281px * var(--scale));
  height: calc(81px * var(--scale));
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

  @media (max-width: 900px) {
    width: 139px;
    height: 40px;
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
