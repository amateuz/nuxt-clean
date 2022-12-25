<template>
  <div
    v-click-outside="closeDialog"
    class="dialog"
    :class="{
      dialog_absolute: absolute,
      dialog_hidden: !isVisible || disabled,
      [`origin_${dialogOrigin}`]: true,
    }"
    :style="getStyle"
  >
    <div class="dialog__content">
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
  },
  data() {
    return {
      isFirstOpen: true,
      dialogNumber: this.dialogNum,
      dialogText: this.dialogs[0].text,
      isVisible: this.visible,
    }
  },
  computed: {
    getDialogNum() {
      if (this.dialogNumber < 0) return 0
      if (this.dialogNumber + 1 >= this.dialogs.length)
        return this.dialogNumber % this.dialogs.length
      return this.dialogNumber
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
      return this.dialogs[this.getDialogNum].button !== undefined
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
  },
  watch: {
    dialogNum() {
      setTimeout(
        () => {
          this.dialogNumber = this.dialogNum
          this.dialogText = this.getText
          this.isVisible = true
        },
        this.isVisible ? 300 : 0
      )
      this.isVisible = false
    },
  },
  methods: {
    emitClick() {
      this.$emit('click')
    },
    closeDialog(event) {
      if (!event.target.classList.contains(`top-${this.id}`)) {
        this.isVisible = false
      }
    },
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
  font-size: 12px;
  letter-spacing: -0.03em;
  line-height: 15px;
  filter: drop-shadow(0px 3px 0px #310032);

  padding: 12px;
  width: auto;
  white-space: nowrap;

  transition: all 0.2s ease-in;
  transform: scale(1);
  transform-origin: right bottom;

  z-index: 2;

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
  }

  &__btn {
    background-size: cover;
    min-width: 105px;
    min-height: 28px;
    margin-top: 10px;
    padding: 2px 5px;
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
}
</style>