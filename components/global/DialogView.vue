<template>
  <div
    v-click-outside="closeDialog"
    class="dialog"
    :class="{
      dialog_absolute: absolute,
      dialog_hidden: !isVisible || isDisabled || disabled,
      [`origin_${dialogOrigin}`]: true,
    }"
    :style="getStyle"
  >
    <div
      class="dialog__content"
      :class="{ dialog__content_play: hasPlayButton }"
    >
      <Btn
        v-if="hasPlayButton"
        class="dialog__play-btn"
        @click="$emit('play')"
      />
      <div class="dialog__text" v-html="dialogText" />
      <Btn
        v-if="hasButton"
        class="dialog__btn"
        bg="5"
        :to="getButtonLink"
        @click="getClickEnabled && emitClick()"
      >
        {{ getButtonText }}
      </Btn>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import vClickOutside from 'v-click-outside'

export default {
  name: 'DialogView',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    id: {
      type: Number,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    absolute: {
      type: Boolean,
      default: true,
    },
    w: {
      type: String,
      required: false,
    },
    h: {
      type: String,
      required: false,
    },
    top: {
      type: String,
      required: false,
    },
    bottom: {
      type: String,
      required: false,
    },
    left: {
      type: String,
      required: false,
    },
    right: {
      type: String,
      required: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    dialogs: {
      type: Array,
      required: true,
    },
    dialogNum: {
      type: Number,
      default: 0,
    },
    dialogOrigin: {
      type: String,
      default: 'left-bottom',
    },
    visibilityTimeout: {
      type: [Number, Array],
      default: 0,
    },
    hidingTimeout: {
      type: Number,
      default: 0,
    },
    bubbleDuration: {
      type: Number,
      default: 300,
    },
    auto: {
      type: Boolean,
      default: false,
    },
    dialogTimeout: {
      type: [Number, Array],
      default: 3000,
    },
    infinite: {
      type: Boolean,
      default: false,
    },
    dontHideLast: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDisabled: false,
      dialogNumberTimeouted: this.dialogNum,
      dialogNumber: this.dialogNum,
      dialogText: this.dialogs[0].text,
      isVisible: this.visible,
      dialogTimeoutData: this.dialogTimeout,
      interval: null,
    }
  },
  created() {
    // console.log(`created ${this.id}`)
    // console.log(`dtd: ${this.dialogTimeoutData}`)
    // console.log(`isArray: ${Array.isArray(this.dialogTimeoutData)}`)

    if (this.visibilityTimeout > 0) {
      this.isDisabled = true
      setTimeout(() => {
        this.isDisabled = false
      }, this.visibilityTimeout)
    }

    const wasNumber = typeof this.dialogTimeoutData === 'number'
    if (wasNumber) {
      this.dialogTimeoutData = []
      for (let i = 0; i < this.dialogs.length; i++) {
        this.dialogTimeoutData.push(this.dialogTimeout)
      }
    }

    if (this.dialogs.length > 1 && this.auto) {
      const times = this.dialogs.length - 1
      let timesDone = 1
      const isInfinite = this.infinite
      const callback = function (curDialogNum) {
        const dn = curDialogNum
        setTimeout(() => {
          if (timesDone < times) callback.bind(this).call(dn)
          if (!isInfinite) timesDone++
          this.dialogNumber++
        }, this.getDialogTimeout(dn))
      }

      setTimeout(
        callback.bind(this),
        this.getDialogTimeout(this.dialogNumber) + this.visibilityTimeout
      )

      /* setTimeout(() => {
        this.emitDialogEnd()
      }, this.getDialogEndTimeout) */
    } else if (this.hidingTimeout > 0) {
      setTimeout(() => {
        this.isDisabled = true
        setTimeout(() => {
          // console.log('before emit 1')
          this.emitDialogEnd()
        }, this.bubbleDuration)
      }, this.hidingTimeout)
    }
  },
  mounted() {},
  computed: {
    getDialogNum() {
      if (this.dialogNumber < 0) return 0
      if (this.dialogNumber + 1 >= this.dialogs.length)
        return this.dialogNumber % this.dialogs.length
      return this.dialogNumber
    },
    getDialogNumTimeouted() {
      if (this.dialogNumberTimeouted < 0) return 0
      if (this.dialogNumberTimeouted + 1 >= this.dialogs.length)
        return this.dialogNumberTimeouted % this.dialogs.length
      return this.dialogNumberTimeouted
    },
    getStyle() {
      let sStyle = ''

      if (this.w) sStyle += `width: ${this.w};`
      if (this.h) sStyle += `height: ${this.h};`
      if (this.top) sStyle += `top: ${this.top};`
      if (this.bottom) sStyle += `bottom: ${this.bottom};`
      if (this.left) sStyle += `left: ${this.left};`
      if (this.right) sStyle += `right: ${this.right};`

      return sStyle
    },
    getText() {
      return this.dialogs[this.getDialogNum].text
    },
    hasButton() {
      return this.dialogs[this.getDialogNumTimeouted].button !== undefined
    },
    hasPlayButton() {
      return this.dialogs[this.getDialogNumTimeouted].playButton !== undefined
    },
    getButtonText() {
      return this.dialogs[this.getDialogNum].button?.text
    },
    getButtonLink() {
      const buttonLink = this.dialogs[this.getDialogNum].button?.link
      if (buttonLink === 'modal') return null
      return buttonLink
    },
    getClickEnabled() {
      return !(this.to && this.to !== 'modal')
    },
    getDialogEndTimeout() {
      const isArray = Array.isArray(this.dialogTimeoutData)
      let result = 0
      if (isArray) {
        result +=
          this.dialogTimeoutData.reduce((acc, item) => acc + item) +
          this.bubbleDuration * (this.dialogs.length - 1) * 2
      } else {
        result += this.hidingTimeout + this.bubbleDuration
      }

      return result
    },
  },
  watch: {
    dialogNum() {
      this.dialogNumber = this.dialogNum
      setTimeout(
        () => {
          this.dialogNumberTimeouted = this.dialogNum
        },
        this.isVisible ? this.bubbleDuration : 0
      )
    },
    dialogNumber() {
      // console.log(`dialog id:${this.id}\n, dialog num: ${this.dialogNumber}\n`)
      // console.log(this.dialogs)
      setTimeout(
        () => {
          this.dialogText = this.getText
          this.isVisible = true
          this.dialogNumberTimeouted = this.dialogNumber
          /* console.log(
            `id ${this.id}, num ${
              this.dialogNumber
            }, timeout ${this.getDialogTimeout(this.dialogNumber)}`
          ) */
          if (this.dialogNumber === this.dialogs.length - 1 && this.auto) {
            setTimeout(() => {
              if (!this.dontHideLast) this.isVisible = false
              // console.log('before emit 2')
              this.emitDialogEnd()
            }, this.getDialogTimeout(this.dialogNumber))
          }
        },
        this.isVisible ? this.bubbleDuration : 0
      )

      this.isVisible = false
    },
  },
  methods: {
    closeDialog(event) {
      if (!this.id) return
      if (!event.target.classList.contains(`top-${this.id}`)) {
        this.isVisible = false
      }
    },
    emitClick() {
      this.$emit('click')
    },
    emitDialogEnd() {
      // console.log(`end dialog ${this.id}`)
      this.$emit('end')
    },
    getDialogTimeout(dialogNum = 0) {
      // console.log(`id ${this.id}, dn ${dialogNum}`)
      // console.log(this.dialogTimeoutData)
      if (Array.isArray(this.dialogTimeoutData)) {
        if (this.dialogTimeoutData.length > dialogNum)
          return this.dialogTimeoutData[dialogNum]
        return this.dialogTimeoutData[0]
      }

      return this.dialogTimeoutData
    },
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval)
  },
}
</script>

<style scoped lang="less">
.dialog {
  background-color: #fff;
  border-radius: 12.2196px;
  //border: 2px solid black;
  color: #333f48;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -0.03em;
  line-height: 18px;
  filter: drop-shadow(0px 3px 0px #310032);

  padding: 12px;
  width: auto;
  white-space: nowrap;

  transition: all 0.2s ease-in;
  transform: scale(1);
  transform-origin: right bottom;

  z-index: 50;

  &_absolute {
    position: absolute;
  }

  &_hidden {
    transform: scale(0);
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;

    &_play {
      flex-direction: row;

      .dialog__play-btn {
        flex-basis: 30%;
      }
      .dialog__text {
        flex-basis: 70%;
      }
    }
  }

  &__btn {
    background-size: cover;
    min-width: 105px;
    min-height: 28px;
    margin-top: 10px;
    padding: 2px 5px;
  }

  &__play-btn {
    background: url('@/static/btns/play.png') no-repeat center center;
    background-size: cover;
    border-radius: 35px;
    height: 35px;
    width: 35px;
    margin-right: 8px;
  }

  &__text {
    text-align: center;
    width: 100%;
  }

  //&:before {
  //    content: ' ';
  //    width: 20px;
  //    height: 40px;
  //    border: 1px solid red;
  //    background-color: #fff;
  //    display: block;
  //    position: absolute;
  //    bottom: -20px;
  //    right: 20px;
  //    border-radius: 50px;
  //    box-shadow: 5px 0 0 0 #888;
  //}
}
.origin {
  &_left-top {
    transform-origin: left top;
  }
  &_left-bottom {
    transform-origin: left bottom;
  }
  &_right-top {
    transform-origin: right top;
  }
  &_right-bottom {
    transform-origin: right bottom;
  }
  &_center-bottom {
    transform-origin: center bottom;
  }
  &_center-center {
    transform-origin: center center;
  }
}
</style>
