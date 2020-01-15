import Vue from 'vue';
import VueI18n from 'vue-i18n';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';// element-ui lang
import Cookies from 'js-cookie';
import { en, zh } from './languages';

Vue.use(VueI18n);

const messages = {
  en: {
    ...elementEnLocale,
    ...en
  },
  zh: {
    ...elementZhLocale,
    ...zh
  }
};

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en', // set locale
  messages // set locale messages
});

export default i18n;
