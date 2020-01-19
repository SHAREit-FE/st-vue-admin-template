<!-- 图片预览 -->
<template>
  <div>
    <img :src="imgSrc" class="small-img" @click="bigShow = true">
    <transition name="fade">
      <div v-if="bigShow" class="img-view" @click="bigShow = false">
        <!-- 遮罩层 -->
        <div class="img-layer"></div>
        <div class="img">
          <img :src="bigSrc || imgSrc">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BigImg',
  props: {
    // 默认链接
    imgSrc: {
      type: String,
      default: ''
    },
    // 大图链接  不传默认使用imgSrc
    bigSrc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      bigShow: false
    };
  }
};

</script>
<style lang='scss' rel="stylesheet/sass" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
  opacity: 1;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.small-img {
  width: 60px;
  height: 60px;
  cursor: zoom-in;
  display: block;
  margin: auto;
  cursor: pointer;
}
.img-view {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10000;
  left: 0;
  top: 0;
  cursor: zoom-out;
  .img-layer {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .img img {
    width: auto;
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
