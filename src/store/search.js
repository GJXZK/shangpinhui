import { reqGetSearchInfo } from "@/API";
const state = {
    searchlist:{}
};
const mutations = {
    GETSEARCHLIST(state,searchlist){
        state.searchlist=searchlist
    }
};
const actions = {
    // 获取search模块数据
    async getSearchInfo({commit},params={}){
        let result=await reqGetSearchInfo(params)
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
};
// getter  为简化数据而生
const getters = {
    goodsList(state){
       return state.searchlist.goodsList || []
    },
    trademark(state){
        return state.searchlist.trademarkList || []
    },
    attrsList(state){
        return state.searchlist.attrsList || []
    }
};
export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}