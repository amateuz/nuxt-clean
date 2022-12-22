<template>
  <div>
    <NuxtLink to="/">Back</NuxtLink>
    <PhaserGame v-if="createGame" :create-game="createGame" />
  </div>
</template>

<script>
import Vue from 'vue'
import PhaserGame from 'nuxtjs-phaser/dist/phaserGame.vue'

const getGame = async (config = {}) => {
  const { default: createGame } = await import('../games/game4.js')
  return createGame
}

const setPhaserFocus = () => {
  const phaser = document.getElementById('phaser')
  if (phaser) phaser.focus()
}

export default Vue.extend({
  name: 'Floor4',
  components: { PhaserGame },
  data() {
    return {
      createGame: undefined,
    }
  },
  async mounted() {
    this.createGame = await getGame()
    this.$nextTick(() => setPhaserFocus())
  },
  methods: {
    emitPhaserEvent(eventName) {
      this.$phaser.eventEmitter.emit(eventName, 'default')
    },
    jump() {
      this.emitPhaserEvent('jump')
    },
    walkLeft() {
      this.emitPhaserEvent('walkLeft')
    },
    walkRight() {
      this.emitPhaserEvent('walkRight')
    },
    pause() {
      this.emitPhaserEvent('pause')
    },
    resume() {
      this.emitPhaserEvent('resume')
    },
  },
})
</script>

<style scoped></style>
