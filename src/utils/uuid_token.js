// 生成游客身份得随机字符串 且每次执行不会变化
import {v4 as uuidv4} from 'uuid'
export const getUUID = ()=>{
    // 先从本地存储获取uuid （看一下本地有没有）
    let uuid_token = localStorage.getItem('uuid_token')
    if(!uuid_token){
        uuid_token=uuidv4()
        window.localStorage.setItem('uuid_token',uuid_token)
    }
    return uuid_token
}