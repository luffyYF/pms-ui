<template>
  <div class="swiper-container" v-show="showFlag">
    <div class="dialog_close" @click="imageViewHide">×</div>
    <!-- swiper -->
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="slide in swiperSlides" :key="slide">
        <div class="swiper-zoom-container">
          <img :src="slide|sourceImgUrl">
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showFlag: false,
        swiperOption: {
          zoom: true,
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            el: '.swiper-pagination'
          }
        },
        swiperSlides: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      showListImgView (items) {
        if (items && items !== '') {
          this.swiperSlides = items.split(',')
          this.toSlide(0)
          this.showFlag = true
        }
      },
      showImgViewByObject (index, items, attr) {
        if (typeof items === 'object' && typeof index === 'number' && Array.isArray(items) && typeof attr === 'string') {
          let array = []
          let tempIndex = 0
          for (let i = 0; i < items.length; i++) {
            if (items[i][attr] && items[i][attr] !== '') {
              array[tempIndex++] = items[i][attr]
            } else {
              index--
            }
          }
          this.toSlide(index)
          this.swiperSlides = array
          this.showFlag = true
        }
      },
      showImgViewByArray (index, items) {
        if (typeof items === 'object' && typeof index === 'number' && Array.isArray(items)) {
          this.swiperSlides = items
          this.toSlide(index)
          this.showFlag = true
        }
      },
      imageViewHide () {
        this.showFlag = false
        this.swiperSlides = []
      },
      toSlide (i) {
        this.$refs.mySwiper.swiper.slideTo(i, 0)
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
