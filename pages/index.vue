<template>
  <section ref="body">
    <div class="house">
      <div class="container">
        <template v-for="floorNum in floorCount">
          <div :key="floorNum" class="floor floor-link floor-img">
            <img
              class="floor__img"
              :src="`/floor${floorCount - floorNum + 1}.png`"
              alt="floor img"
            />
            <template v-if="floorNum === 1">
              <Dialog
                :id="floorNum"
                w="10%"
                h="20%"
                top="30%"
                right="50%"
                :dialogs="dialogs[floorNum - 1].content"
                :dialog-num="dialogs[floorNum - 1].timesClicked"
                class="origin_left-bottom"
              />
              <img
                :class="`top top-${floorNum}`"
                src="/floor4/top1.png"
                @click.prevent="runDialog($event, floorNum - 1)"
              />
            </template>
            <template v-if="floorNum === 2">
              <Dialog
                :id="floorNum"
                w="10%"
                h="20%"
                top="22%"
                right="38%"
                :dialogs="dialogs[floorNum - 1].content"
                :dialog-num="dialogs[floorNum - 1].timesClicked"
              />
              <img
                :class="`top top-${floorNum}`"
                src="/floor4/top1.png"
                alt=""
                @click.prevent="runDialog($event, floorNum - 1)"
              />
            </template>
            <template v-if="floorNum === 3">
              <Dialog
                :id="floorNum"
                w="10%"
                h="20%"
                top="15%"
                right="55%"
                :dialogs="dialogs[floorNum - 1].content"
                :dialog-num="dialogs[floorNum - 1].timesClicked"
              />
              <img
                :class="`top top-${floorNum}`"
                src="/floor4/top1.png"
                alt=""
                @click.prevent="runDialog($event, floorNum - 1)"
              />
            </template>
            <template v-if="floorNum === 4">
              <Dialog
                :id="floorNum"
                w="10%"
                h="20%"
                top="15%"
                right="80%"
                :dialogs="dialogs[floorNum - 1].content"
                :dialog-num="dialogs[floorNum - 1].timesClicked"
              />
              <img
                :class="`top top-${floorNum}`"
                src="/floor4/top1.png"
                alt=""
                @click.prevent="runDialog($event, floorNum - 1)"
              />
            </template>
            <template v-if="floorNum === 5">
              <Dialog
                :id="floorNum"
                w="10%"
                h="20%"
                top="15%"
                right="13%"
                :dialogs="dialogs[floorNum - 1].content"
                :dialog-num="dialogs[floorNum - 1].timesClicked"
                class="origin_left-bottom"
              />
              <img
                :class="`top top-${floorNum}`"
                src="/floor4/top1.png"
                alt=""
                @click.prevent="runDialog($event, floorNum - 1)"
              />
            </template>
            <template v-if="floorNum === 6">
              <Dialog
                :id="floorNum"
                w="10%"
                h="20%"
                top="15%"
                right="55%"
                :dialogs="dialogs[floorNum - 1].content"
                :dialog-num="dialogs[floorNum - 1].timesClicked"
              />
              <img
                :class="`top top-${floorNum}`"
                src="/floor4/top1.png"
                alt=""
                @click.prevent="runDialog($event, floorNum - 1)"
              />
            </template>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import dataDialogs from '~/data/dialogs'
export default {
  name: 'Index2',
  data() {
    return {
      dialogs: dataDialogs,

      floorCount: 6,

      floorCookieValue: 0,
      floorCookieName: 'floor',
      floorCookieOptions: {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      },
    }
  },
  watch: {
    floorCookieValue(newValue) {
      this.setFloorCookie(newValue)
    },
  },
  created() {
    this.floorCookieValue = +this.getFloorCookie(this.floorCookieName)
  },
  methods: {
    animateHero(fromHero, toHero) {
      const clone = fromHero.cloneNode(true)

      const from = this.calculatePosition(fromHero)
      const to = this.calculatePosition(toHero)

      this.$gsap.set([fromHero, toHero], { visibility: 'hidden' })
      this.$gsap.set(clone, { position: 'absolute', margin: 0 })

      this.$refs.body.$el.appendChild(clone)

      const style = {
        x: to.left - from.left,
        y: to.top - from.top,
        width: to.width,
        height: to.height,
        autoRound: false,
        ease: 'power1.easeOut',
        onComplete,
      }

      function onComplete() {
        this.$gsap.set(toHero, { visibility: 'visible' })
        this.$refs.body.$el.removeChild(clone)
      }

      this.$gsap.set(clone, from)
      this.$gsap.to(clone, 0.3, style)
    },
    calculatePosition(element) {
      const rect = element.getBoundingClientRect()

      const scrollTop = window.pageYOffset || this.$root.scrollTop || 0
      const scrollLeft = window.pageXOffset || this.$root.scrollLeft || 0

      const clientTop = this.$root.clientTop || 0
      const clientLeft = this.$root.clientLeft || 0

      return {
        top: Math.round(rect.top + scrollTop - clientTop),
        left: Math.round(rect.left + scrollLeft - clientLeft),
        height: rect.height,
        width: rect.width,
      }
    },
    runDialog(event, dialogNum) {
      // let elem = event.target
      // if (elem.tagName !== 'a') elem = elem.parentElement
      // elem.classList.toggle('bordered')
      // return
      // console.log(this.$refs)
      // this.animateHero(event.target, this.$refs.body.$el)
      this.dialogs[dialogNum].timesClicked += 1
      if (
        this.dialogs[dialogNum].timesClicked >=
        this.dialogs[dialogNum].content.length
      )
        this.dialogs[dialogNum].timesClicked = 0
    },
    closeDialog() {},
    getFloorCookie() {
      return this.$cookies.get(this.floorCookieName)
    },
    setFloorCookie(value) {
      this.$cookies.set(this.floorCookieName, value, this.floorCookieOptions)
    },
    floorClicked(event, isIncreased) {
      if (isIncreased) this.floorCookieValue++
      else if (this.floorCookieValue > 1) this.floorCookieValue--
    },
  },
}
</script>

<style scoped lang="less">
a {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.building {
  max-width: 100%;
}

.top {
  position: absolute;

  &:hover {
    cursor: pointer;
    transition: transform 0.2s ease;
    transform: scale(1.05);
    transform-origin: center bottom;

    filter: drop-shadow(0 0 45px rgb(82, 216, 215));
  }

  &-1 {
    left: 33%;
    bottom: 0;
    width: auto;
    height: 45%;
    transform: rotateY(180deg);

    &:hover {
      transform: scale(1.05) rotateY(180deg);
    }
  }

  &-2 {
    right: 33%;
    bottom: -1%;
    width: auto;
    height: 55%;
  }

  &-3 {
    right: 50%;
    bottom: 5%;
    width: auto;
    height: 55%;
  }

  &-4 {
    right: 75%;
    bottom: 5%;
    width: auto;
    height: 55%;

    transform: rotateY(180deg);

    &:hover {
      transform: scale(1.05) rotateY(180deg);
    }
  }

  &-5 {
    right: 25%;
    bottom: 5%;
    width: auto;
    height: 55%;
  }

  &-6 {
    right: 50%;
    bottom: 5%;
    width: auto;
    height: 55%;

    transform: rotateY(180deg);

    &:hover {
      transform: scale(1.05) rotateY(180deg);
    }
  }
}

.floor {
  position: relative;
  user-select: none;

  &_disabled {
    pointer-events: none;
    &:hover {
      transform: none !important;
    }
  }

  &-link {
    width: auto;
    height: auto;
    &:hover {
      //cursor: pointer;
      //transform: scale(1.1);
      //transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
  }

  &__img {
    display: block;
    margin: 0;
    max-width: 100%;
  }
}

.bordered {
  outline: 4px solid yellow;
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
</style>
