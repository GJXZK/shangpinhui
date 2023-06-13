import { reqGoodsInfo,reqAddOrUpdateShopCart} from "@/API"
// 封装游客身份得模块
import {getUUID} from '@/utils/uuid_token'
const state={
    goodinfo:{},
    uuid_token:getUUID()
}
const mutations={
    GETGOODINFO(state,value){
        state.goodinfo=value
    }
}
const actions={
    // 获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result=await reqGoodsInfo(skuId);
        if(result.code==200){
            commit('GETGOODINFO',result.data);
        }
    },
    //获取购物车信息
    async addOrUpdateShopCart({commit},{skuId,skuNum}){

        let result=await reqAddOrUpdateShopCart(skuId,skuNum);
        if(result.code==200){
            return 'ok'
        }else{
            // 代表购物车加入失败
            return Promise.reject(new Error('faile'))  
        }      
    } 

}
const getters={
    categoryView(state){
        return state.goodinfo.categoryView || {};
    },
    skuInfo(state){
        return state.goodinfo.skuInfo || {};
    }

}
export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}