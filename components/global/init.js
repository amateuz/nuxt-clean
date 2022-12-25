import Vue from 'vue'
import Btn from './Btn.vue'
import ComicsFrame from './ComicsFrame.vue'
import DialogView from './DialogView.vue'

export default (context, inject, ...args) => {
  // eslint-disable-next-line vue/multi-word-component-names
  Vue.component('Btn', Btn)
  Vue.component('ComicsFrame', ComicsFrame)
  Vue.component('DialogView', DialogView)
}
