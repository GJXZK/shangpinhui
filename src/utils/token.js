// 储存token
export const setToken=(token)=>{
    localStorage.setItem('TOKEN',token);
}
// 获取token
export const getToken=()=>{
    localStorage.getItem('TOKEN');
}
// 清理本地储存
export const removeToken=()=>{
    localStorage.removeItem('TOKEN');
}