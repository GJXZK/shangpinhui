<!--
  轮播图
-->
<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "MyCarousel",
  props: ['list'],
  // 数据监听
  watch: {
    list: {
      immediate:true,
      handler() {
        //在加载swiper之前一定要确定  数据已经请求回来  且v-for加载完毕  然后再加载swiper
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            autoplay: true,
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: "true",
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            slidesPerView: 1, // 显示几个
          });
        });
      },
    },
  },
};
</script>

<style></style>
