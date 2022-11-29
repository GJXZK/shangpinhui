// 引入vue   引入vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 引入路由
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

//重写push replace方法
//先把VueRouter原型对象的push 先保存一遍
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 第一个参数：location参数 往哪跳
// 第二个参数：成功回调
// 第三个参数：失败回调
// let originPush = VueRouter.prototype.push;
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

// 配置路由
const router=new VueRouter({
    // 配置路由
    routes:[
        {
            path:'/home',
            component:Home,
            meta:{show:true}
        },
        {
            path:"/login",
            component:Login,
            meta:{show:false}
        },
        {
            path:"/register",
            component:Register,
            meta:{show:false}
        },
        {
            name:'HeaderSearch',
            path:"/search/:keyword?",
            component:Search,
            props(route){
                return {
                  categoryName:route.query.categoryName,
                  category1Id:route.query.categoryId,
                }
            },
            meta:{show:true}
        },
        {
            path:"/addcartsuccess",
            name:'addcartsuccess',
            component:AddCartSuccess,
            meta:{show:true}
        },
        {
            path:'/shopcart',
            name:'shopcart',
            component:ShopCart,
            meta:{show:true}
        },
        {
            // params传参
            path:'/detail/:skuid',
            component:Detail,
            meta:{show:true}
        },
        // 重定向  在项目跑起来的时候，访问/,立马让他定向回到首页
        {
            path:'*',
            redirect:'/home'
        }

    ],
    // 进入一个新的界面  把界面的y轴调为零  即回到顶部
    scrollBehavior(){
        return {y:0}
    }
})
export default router;