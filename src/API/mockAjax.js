// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nProgress from "nprogress";
import 'nprogress/nprogress.css'

// 1:利用axios对象的方法create，去创建一个axios实例
// 2：request 就是axios 只不过稍微配置一下
const requests=axios.create({
    // 配置对象
    // 基础路径
    baseURL:'/mock',
    // 代表请求超时的时间
    timeout:5000,
})
// 请求拦截器  在发出请求之前，请求检测可以检测到，可以在请求之前做一些事情
// interceptors 拦截器  config  配置对象 重要对象heards请求头
requests.interceptors.request.use((config)=>{
    // 进度条开始
    nProgress.start();
    return config;
},function(error){
    return Promise.reject(error)
})
// 响应拦截器  在服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nProgress.done()
    return res.data;
},(error)=>{
    // 响应失败的回调函数
    console.log(error);
    return Promise.reject(new Error('faile'));
});

// 对外暴露
export default requests;
