<template>
  <div class="comics-frame">
    <component :is="componentInstance" />
  </div>
</template>

<script>
export default {
  name: 'ComicsFrame',
  props: {
    num: {
      type: Number,
      required: true,
    },
  },
  computed: {
    componentInstance() {
      const name = `frame${this.num}`
      return () => import(`@/assets/comics/${name}.svg`)
    },
  },
}
</script>

<style scoped lang="less">
.comics-frame {
  width: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
