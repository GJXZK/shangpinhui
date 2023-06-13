import { reqUserAddress,reqUserTrade,reqSubmitOrder} from "@/API";
const state={
    userAddressList:{},
    userTrade:{}
}
const mutations={
    USERADDRESS(state,value){
        state.userAddressList=value
    },
    USERTRADE(state,value){
        state.userTrade=value
    }
}
const actions={
    async UserAddress({commit}){
        let result = await reqUserAddress();
        if(result.code==200){
            commit("USERADDRESS",result.data)
            return "ok"
         }else{
             return Promise.reject(new Error('faile'))
         }
    },
    async UserTrade({commit}){
        let result =await reqUserTrade();
        if(result.code==200){
            commit("USERTRADE",result.data)
            console.log(result);
        }
    }
}
const getters={

}
export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}