import Vue from 'vue'
import App from './App.vue'
import i18n from './common/plugins/vue-i18n'
import routes from './config/AppRoutes'
import store from './components/store/index';
// plugins
import VueRouter from 'vue-router'
import VueBootstrap from 'bootstrap-vue'
import VueInsProgressBar from 'vue-ins-progress-bar'
import VueCustomScrollbar from 'vue-custom-scrollbar'
import VueApexCharts from 'vue-apexcharts'
import VueHljs from 'vue-hljs'
import DateRangePicker from 'vue2-daterange-picker'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import VueColorPicker from '@caohenghu/vue-colorpicker'
import VueCountdown from '@chenfengyuan/vue-countdown'
import VueMaskedInput from 'vue-maskedinput'
import wysiwyg from "vue-wysiwyg"

// VueStudio SCSS
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'
import '@fullcalendar/bootstrap/main.css'
import 'vue-hljs/dist/vue-hljs.min.css'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import './scss/styles.scss'

import axios from 'axios';
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios

Vue.config.productionTip = false

Vue.use(wysiwyg, { maxHeight: '300px'})
Vue.use(VueRouter)
Vue.use(VueBootstrap)
Vue.use(VueHljs)
Vue.use(VueInsProgressBar, {
  position: 'fixed',
  show: true,
  height: '3px'
})
Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'places'
  }
})

Vue.component('vue-custom-scrollbar', VueCustomScrollbar)
Vue.component('apexchart', VueApexCharts)
Vue.component('date-range-picker', DateRangePicker)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.component('vue-color-picker', VueColorPicker)
Vue.component('vue-masked-input', VueMaskedInput)
Vue.component(VueCountdown.name, VueCountdown);

const router = new VueRouter({
	routes
})

new Vue({
    i18n,
  render: h => h(App),
  router,
    store
}).$mount('#app')
