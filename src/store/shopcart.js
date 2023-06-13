import { reqShopCart, changeShopCartChecked,deleteShopCartItem} from "@/API";
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
    },
    async changeShopCartChecked({commit},{skuId,isChecked}){
        let result=await changeShopCartChecked(skuId,isChecked)
        console.log(result);
    },
    
    async deleteShopCartItem({commit},skuId){
        let result=await deleteShopCartItem(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
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