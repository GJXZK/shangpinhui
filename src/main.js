import Vue from 'vue'
import { Button, Select,MessageBox } from 'element-ui';
import App from './App.vue'
// 三级联动组件 轮播图  分页器----全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
// element-ui 按需引入
Vue.component(Button.name,Button);
// ElementUI注册组件的时候还有一种新的写法 挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mockServe.js-----mock数据
import './mock/mockServe'
// 引入轮播图样式
import "swiper/css/swiper.css"
// 引入api
import * as API from '@/API';
// 引入插件 vue-lazyload 懒加载
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/1.webp'
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:loading
});
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册仓库   组件实例的身上会多一个属性$store
  store,
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  }
}).$mount('#app')
