import Vue from 'vue'
import App from './App.vue'
import i18n from './common/plugins/vue-i18n';
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
Vue.prototype.$axios = axios;//全局注册，使用方法为:this.$axios
import Multiselect from 'vue-multiselect'  //select
Vue.component('multiselect', Multiselect);
import Loading from 'vue-loading-overlay';    //loading
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading, {
    color:'#007bff',
    loader:'spinner',
    //container:this.$refs.loadingContainer,
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    opacity: 0.75,
    zIndex: 999999,
});
// this.$Loading.show({});
// this.$Loading.hide({});
Vue.config.productionTip = false;

//axios拦截器
//定义一个请求拦截器
// axios.interceptors.request.use(
//     config =>{
//         store.state.isShow = true;
//         return config
//     },
//     error => {
//      return Promise.reject(error);
//    }
// );
// //定义一个响应拦截器
// axios.interceptors.response.use(
//     config =>{
//        store.state.isShow = false;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );


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
});

Vue.component('vue-custom-scrollbar', VueCustomScrollbar)
Vue.component('apexchart', VueApexCharts)
Vue.component('date-range-picker', DateRangePicker)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.component('vue-color-picker', VueColorPicker)
Vue.component('vue-masked-input', VueMaskedInput)
Vue.component(VueCountdown.name, VueCountdown);

App.mpType = 'app';
Vue.prototype._i18n = i18n;

const router = new VueRouter({
	routes
})

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
