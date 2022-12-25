<template>
  <component
    :is="getComponent"
    :to="getTo"
    :style="getStyle"
    class="btn"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Btn',
  props: {
    to: {
      type: String,
      default: undefined,
    },
    h: {
      type: [String, Number],
      default: undefined,
    },
    maxW: {
      type: [String, Number],
      default: undefined,
    },
    maxH: {
      type: [String, Number],
      default: undefined,
    },
    w: {
      type: [String, Number],
      default: undefined,
    },
    bg: {
      type: [String, Number],
      default: undefined,
    },
    br: {
      type: [String, Number],
      default: undefined,
    },
  },
  computed: {
    getStyle() {
      let sStyle = ''
      if (this.w) sStyle += `width:${this.w};`
      if (this.h) sStyle += `height:${this.h};`
      if (this.maxW) sStyle += `max-width:${this.maxW};`
      if (this.maxH) sStyle += `max-height:${this.maxH};`
      if (this.bg)
        sStyle += `background-image:url('/btns/btn${this.bg}-text.png');`
      if (this.br) sStyle += `border-radius:${this.br}px`

      return sStyle
    },
    getComponent() {
      if (this.to) return 'nuxt-link'
      return 'button'
    },
    getTo() {
      return this.to ? this.to : null
    },
  },
}
</script>

<style scoped lang="less">
.btn {
  background-color: #1d9a89;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 1px 0 #000000;
  border-radius: 8px;
  color: #fff;
  display: flex;

  font-style: normal;
  font-weight: 700;
  font-size: 11.4558px;
  line-height: 16px;
  width: auto;
  height: 25px;

  align-items: center;
  justify-content: center;

  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    cursor: pointer;
  }

  &:active,
  &:link,
  &:visited {
    text-decoration: none;
  }

  &:active {
    box-shadow: none;
    transform: translate(0, 2px);
  }
}
</style>
