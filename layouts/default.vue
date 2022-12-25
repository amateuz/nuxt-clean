<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowHeight: 0,
      windowWidth: 0,
    }
  },

  mounted() {
    this.$nextTick(() => {
      // this.onResize()
      // window.addEventListener('resize', this.onResize)
    })
  },

  beforeDestroy() {
    // window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize() {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
    },
  },
}
</script>

<style lang="less">
.screen-size {
  width: 70px;
  height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  border: 2px solid green;
  background-color: antiquewhite;
}
</style>
