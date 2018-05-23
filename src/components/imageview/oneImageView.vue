<template>
  <div class="swiper-container" v-show="showFlag" @click="imageViewHide">
    <div class="dialog_close" @click="imageViewHide">×</div>
    <!-- swiper -->
    <swiper :options="swiperOption">
      <swiper-slide>
        <div class="swiper-zoom-container">
          <img :src="swiperSlide|sourceImgUrl">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showFlag: false,
        swiperSlide: '',
        swiperOption: {
          zoom: true
        }
      }
    },
    methods: {
      showImgView (items) {
        if (items && items !== '') {
          this.swiperSlide = items
          this.showFlag = true
        }
      },
      imageViewHide () {
        this.showFlag = false
        this.swiperSlide = ''
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss" scoped>
  .dialog_close {
    position: absolute;
    z-index: 6101;
    right: 20px;
    top: 15px;
    color: #fff;
    font-size: 3em;
    cursor: pointer;
  }
  .swiper-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 6100;
    background: rgba(0, 0, 0, 0.3);
  }
</style>
