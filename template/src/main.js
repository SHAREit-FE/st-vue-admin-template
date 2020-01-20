import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'; // global css
{{#useVideo}}
import 'video.js/dist/video-js.css';
import '@/styles/video.scss';
{{/useVideo}}

import App from './App';
import store from './store';
import router from './router';
import i18n from './lang';

import '@/icons'; // icon
import '@/permission'; // permission control
import '@/components/index';
{{#useVideo}}
import VueYoutube from 'vue-youtube';
Vue.use(VueYoutube);
{{/useVideo}}
import * as filters from '@/filters/index';
import * as utils from '@/utils/index';

Vue.prototype.$utils = utils;
// 注册filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// set ElementUI lang to EN
Vue.use(ElementUI, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});
