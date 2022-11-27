import Vue from 'vue'
import App from './App.vue'

// 三级联动组件 轮播图  分页器----全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mockServe.js-----mock数据
import './mock/mockServe'
// 引入轮播图样式
import "swiper/css/swiper.css"

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册仓库   组件实例的身上会多一个属性$store
  store,
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')
