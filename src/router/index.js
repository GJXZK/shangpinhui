// 引入vue   引入vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
// 使用插件
Vue.use(VueRouter)
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
    routes,
    // 进入一个新的界面  把界面的y轴调为零  即回到顶部
    scrollBehavior(){
        return {y:0}
    }
});
// 路由导航  全局前置守卫
router.beforeEach(async (to,from,next)=>{
    // 首先获取token  如果登录了就会有token
    let token=window.localStorage.getItem('TOKEN')
    if(token){
        // 如果token存在就不能再跳转到登陆界面
        if(to.path=='/login'){
            next('/')
        }else{
            // 有用户信息就放行
            if(store.state.user.userInfo.name){
                next()
            }else{
                // 如果没有 获取用户信息
                try {
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (error) {
                    // 有token但是获取不到信息说明token失效了  要重新登录
                    await store.dispatch('user/UserLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 没有token  未登录 
        let toPath=to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }
})
export default router;