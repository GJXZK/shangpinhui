// 登录与注册模块   
import { getCode,reqUserRegister,reqUserLogin,reqUserInfo,reqUserLogout} from "@/API"
import { setToken,removeToken } from "@/utils/token"
const state={
   codeValue:'',
   userInfo:{}
}
const mutations={
    GETCODE(state,value){
        state.codeValue=value
    },
    GETUSERINFO(state,value){
        state.userInfo=value
    },
    USERLOGOUT(state){
        state.userInfo={}
        removeToken()
    }
}
const actions={
    async getCode({commit},phone){
        let result = await getCode(phone)
        if (result.code==200){
            commit('GETCODE',result.data)
            console.log(result);
            return result.data
        }
    },
    async register({commit},user){
        console.log("调用注册接口");
        console.log(user);
        let result=await reqUserRegister(user)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    async UserLogin({commit},user){
        let result=await reqUserLogin(user)
        if(result.code==200){
            setToken(result.data.token);
            return 'ok'
        }else{
            return Promise.reject(new Error('error'))
        }
        
    },
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code==200){
            commit("GETUSERINFO",result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async UserLogout({commit}){
        let result = await reqUserLogout();
        if(result.code==200){
           commit("USERLOGOUT")
           return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
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