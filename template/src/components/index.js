import Vue from 'vue';
import bigImg from './bigImg';

Vue.component('bigImg', bigImg);
{{#useVideo}}
import videoPlayer from './videoPlayer';
Vue.component('videoPlayer', videoPlayer);
{{/useVideo}}
