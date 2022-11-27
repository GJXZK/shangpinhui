<template>
  <div>
    <TypeNav></TypeNav>
    <ListContiner></ListContiner>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <like></like>
    <Floor v-for="(floor) in floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
  import ListContiner from '@/pages/Home/ListContainer'
  import TodayRecommend from '@/pages/Home/TodayRecommend'
  import Rank from '@/pages/Home/Rank'
  import Like from '@/pages/Home/Like'
  import Floor from '@/pages/Home/Floor'
  import Brand from '@/pages/Home/Brand'
  import {mapState } from 'vuex'
  import Swiper from 'swiper'
  export default {
    name:'MyHome',
    components:{
      ListContiner,
      TodayRecommend,
      Rank,
      Like,
      Floor,
      Brand,
    },
    computed:{
      ...mapState('myhome',['floorList'])
    },
    watch: {
      floorList: {
        handler() {
          //在加载swiper之前一定要确定  数据已经请求回来  且v-for加载完毕  然后再加载swiper
          this.$nextTick(() => {
            new Swiper(".swiper-container", {
              autoplay: true,
              loop: true, // 循环模式选项
              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                clickable:'true'
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
    mounted(){
      this.$store.dispatch("myhome/getFloorList")
    }
  }
</script>

<style>

</style>