import { reqShopCart } from "@/API";
const state = {
    ShopCartList:[]
}
const mutations={
    GETSHOPCARTLIST(state,value){
        state.ShopCartList=value
    }
}
const actions={
    async getShopCartList({commit}){
        let result=await reqShopCart()
        if(result.code==200){
            commit('GETSHOPCARTLIST',result.data)
        }
    }
}
const getters={
    cartList(state){
        let carlist=state.ShopCartList[0] || {}
        return carlist
    }
}
export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}