<template>
    <NuxtLink :to="to" class="btn">
        <slot />
    </NuxtLink>
</template>

<script>
export default {
    name: 'Btn',
    props: ['to'],
}
</script>

<style scoped lang="less">
.btn {
    border: 2px solid black;

    background: #a52838;
    box-shadow: 0 1px 0 #000000;
    border-radius: 8px;
    color: #fff;
    display: flex;

    font-style: normal;
    font-weight: 700;
    font-size: 11.4558px;
    line-height: 16px;

    align-items: center;
    justify-content: center;

    height: 25px;
    width: 50%;

    text-decoration: none;
    text-transform: uppercase;

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
