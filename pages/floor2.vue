<template>
    <div>
        <NuxtLink to="/">Back</NuxtLink>
        <PhaserGame :createGame="createGame" v-if="createGame" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PhaserGame from 'nuxtjs-phaser/dist/phaserGame.vue'

const getGame = async (config = {}) => {
    const { default: createGame } = await import('../games/game2.js')
    return createGame
}

declare interface IndexPageData {
    createGame?: () => Phaser.Game
}

const setPhaserFocus = () => {
    const phaser = document.getElementById('phaser')
    if (phaser) phaser.focus()
}

export default Vue.extend({
    name: 'Floor2',
    components: { PhaserGame },
    data(): IndexPageData {
        return {
            createGame: undefined,
        }
    },
    methods: {
        emitPhaserEvent(eventName: string) {
            this.$phaser!.eventEmitter!.emit(eventName, 'default')
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
    async mounted() {
        this.createGame = await getGame()
        this.$nextTick(() => setPhaserFocus())
    },
})
</script>

<style scoped></style>
