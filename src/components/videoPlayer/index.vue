<template>
  <div
    :style="videoWrapStyle"
    class="playerWrap"
    @mousedown="mousedown"
  >
    <div
      v-show="show"
      ref="moveTarget"
      :style="{width: width + 'px', height: height + 'px'}"
      class="playerContainer"
    >
      <span v-if="position === 'fixed'" class="playerCloseIcon" @click="closePlayer">X</span>
      <div v-show="isYoutube && show">
        <youtube ref="youtube" :width="width" :height="height" :video-id="videoId" :player-vars="playerVars" />
      </div>
      <div v-show="!isYoutube && show">
        <video
          id="streamVideoDOM"
          :width="width"
          :height="height"
          class="video-js vjs-default-skin"
          controls
          autoplay
          preload="auto"
        />
      </div>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js/dist/video.min.js';
import 'videojs-contrib-hls';
import { getParams } from '@/utils/index';

export default {
  name: 'VideoPlayer',
  props: {
    preview: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '360'
    },
    width: {
      type: String,
      default: '630'
    },
    position: {
      type: String,
      default: 'relative'
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      playerVars: {
        autoplay: 1,
        iv_load_policy: 3,
        showinfo: 0,
        rel: 0
      },
      youtubePlayer: null,
      youtubePlayerReady: false,
      streamPlayer: null,
      isDown: false
    };
  },
  computed: {
    isYoutube() {
      return /youtube/.test((this.preview || '').toLowerCase());
    },
    videoType() {
      return this.getVideoType(this.preview) || '';
    },
    videoId() {
      return this.getVideoId(this.preview) || '';
    },
    isFixed() {
      return this.position === 'fixed';
    },
    videoWrapStyle() {
      const position = this.position;
      const left = this.isFixed ? 'calc(100vw - 650px)' : '0';
      const paddingTop = this.isFixed ? '20px' : '0';
      const backgroundColor = this.isFixed ? '#333' : 'none';
      const top = this.isFixed ? '80px' : '0';
      return { position, left, paddingTop, backgroundColor, top };
    }
  },
  watch: {
    // 监听 preview 当有值的时候给videojs option赋值
    preview(newVal, oldVal) {
    //   // 判断上一次播放的视频是youtube 还是其他 控制暂停播放
      if (oldVal && this.getVideoId(oldVal)) {
        // youtube
        this.$refs.youtube.player.pauseVideo();
        // this.streamPlayer.play();
      } else if (oldVal && !this.getVideoId(oldVal)) {
      // 其他
        if (this.streamPlayer) {
          this.streamPlayer.pause();
        }
        this.$refs.youtube.player.playVideo();
      }
      //   console.log('is not uto2');
      if (!this.isYoutube && this.preview) {
        this.$refs.youtube.player.pauseVideo();
        if (!this.streamPlayer) {
          this.streamPlayer = videojs('streamVideoDOM');
        }
        this.streamPlayer.src({ src: newVal, type: this.videoType });
        // this.streamPlayer.play();
      }
    }
  },
  mounted() {
    if (this.preview) {
      this.streamPlayer = videojs('streamVideoDOM');
      this.streamPlayer.src({ src: this.preview, type: this.videoType });
    }
    // this.streamPlayer.play();
  },
  beforeDestroy() {
    if (this.streamPlayer) {
      this.streamPlayer.dispose();
    }
  },
  methods: {
    // 获取视频信息
    getVideoType(url) {
      if (!url) {
        return false;
      }
      let Suffix = '';
      if (url.indexOf('.') > -1) {
        Suffix = url.substring(url.lastIndexOf('.') + 1);
      }

      const type = (Suffix === 'mp4') ? 'video/mp4' : 'application/x-mpegURL';
      return type;
    },
    getVideoId(url) {
      if (!url) {
        return false;
      }
      return getParams(url, 'v');
    },
    mousedown(event) {
      if (!this.isFixed);

      event = event || window.event;
      const windowH = window.innerHeight;
      const windowW = window.innerWidth;
      const target = event.target;
      var disX = event.clientX - target.offsetLeft;
      var disY = event.clientY - target.offsetTop;
      this.isDown = true;
      const that = this;
      document.onmousemove = function(e) {
        if (that.isDown) {
          var left = e.clientX - disX;
          var top = e.clientY - disY;

          if (left < 0) left = 0;
          if (top < 0) top = 0;
          if (left > windowW - target.offsetWidth) left = windowW - target.offsetWidth;
          if (top > windowH - target.offsetHeight) top = windowH - target.offsetHeight;
          if (target.className !== 'playerCloseIcon') {
            target.style.left = left + 'px';
            target.style.top = top + 'px';
          }
        }
      };
      document.onmouseup = function() {
        that.isDown = false;
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    changeTarget() {
      // 暂停的时候播放
      if (this.isYoutube) {
        this.$refs.youtube.player.playVideo();
      } else {
        // TODO: 播放非YouTube视频
        // this.streamPlayer.play();
      }
    },
    pause() {
      // 暂停
      if (this.player && this.isYoutube) {
        this.player.pauseVideo();
      } else {
        // TODO: 暂停非YouTube视频
        this.streamPlayer.pause();
      }
    },
    closePlayer() {
      console.log('in close');
      this.$emit('closeVideo');
      this.$refs.youtube.player.pauseVideo();
      if (this.streamPlayer) {
        this.streamPlayer.pause();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.playerWrap {
  display: block;
  overflow: visible;
  z-index: 20;
  /*&:hover {*/
    cursor: move;
  /*}*/
  .playerContainer {
    position: relative;
    display: block;
    /* margin: 0 auto; */
    .playerCloseIcon {
      position: absolute;
      right: 0px;
      top: -20px;
      display: inline-block;
      width: 25px;
      height: 25px;
      line-height: 25px;
      border-radius: 50%;
      text-align: center;
      font-size: 18px;
      background: rgba(0, 0, 0, 0.3);
      color: red;
      opacity: 0;
      /*&:hover {*/
        opacity: 1;
        cursor: pointer;
        transition: opacity 0.3s;
      /*}*/
    }
  }
}
</style>
