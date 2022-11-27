import Vue from 'vue'
import Vuex from 'vuex'
// 需要使用插件一次
Vue.use(Vuex)

// 引入小仓库
import myhome from './home'
import mysearch from './search'
import detail from './detail'
import shopcart from './shopcart'
// 对外暴露的store类的一个实例
export default new Vuex.Store({
    modules:{
        myhome,
        mysearch,
        detail,
        shopcart,
    }
})