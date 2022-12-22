<template>
    <div
        class="dialog"
        :class="{ dialog_absolute: absolute, dialog_hidden: !isVisible }"
        :style="this.getStyle"
        v-click-outside="closeDialog"
    >
        <div class="dialog__content">
            <div class="dialog__text">
                {{ dialogText }}
            </div>
            <Btn class="dialog__btn" v-if="hasButton" :to="getButtonLink">
                {{ getButtonText }}
            </Btn>
        </div>
    </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
    name: 'Dialog',
    props: {
        id: {
            type: Number,
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
    },
    directives: {
        clickOutside: vClickOutside.directive,
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
            return this.dialogs[this.getDialogNum].button.text
        },
        getButtonLink() {
            return this.dialogs[this.getDialogNum].button.link
        },
    },
    methods: {
        closeDialog(event) {
            if (!event.target.classList.contains(`top-${this.id}`)) {
                this.isVisible = false
            }
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
}
</script>

<style scoped lang="less">
.dialog {
    background-color: #fff;
    border-radius: 18.9239px;
    border: 2px solid black;
    color: #333f48;
    font-weight: 600;
    //font-size: 18px;
    font-size: 12px;
    letter-spacing: 0.5px;
    //line-height: 26px;
    line-height: 14px;

    height: 70px;
    width: 320px;
    padding: 5px 10px;

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
        margin: 5px;
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
.origin_left-bottom {
    transform-origin: left bottom;
}
</style>
