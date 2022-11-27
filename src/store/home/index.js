import { reqCategoryList,reqBannerList,reqFloorList} from "@/API";
const state={
    categoryList:[],
    // 轮播图数据
    bannerList:[],
    // Floor数据
    floorList:[]
};
// mutations:修改state的唯一方法
const mutations={
    CATEGORY(state,value){
        state.categoryList=value
    },
    BANNER(state,value){
        state.bannerList=value
    },
    FLOOR(state,value){
        state.floorList=value
    }
    
}
// action 响应组件用户的动作 可以书写自己的业务逻辑，也可以处理异步
const actions={
    // 调用 API里的方法  获取一个promise对象 用asyns await 获取数据  
    async categoryList({commit}){
        let result=await reqCategoryList()
        if(result.code == 200){
            commit('CATEGORY',result.data)
        }
    },

    async getBannerList({commit}){
        let result = await reqBannerList()
        if(result.code == 200){
            commit('BANNER',result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code == 200){
            commit('FLOOR',result.data)
        }
    }
}
// getters:理解为计算属性,用于简化仓库数据，让组件获取仓库数据更方便
const getters={}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}