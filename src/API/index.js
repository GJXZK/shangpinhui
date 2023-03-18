// 当前这个模块  API进行统一管理
import requests from "./request";
import mockRequest from "./mockAjax"

// 三级联动接口
// /api/product/getBaseCategoryList   发请求返回Promise对象
// export const reqCategoryList = () => requests(
//     { 
//         url: '/product/getBaseCategoryList',
//         method:'get'
//     });
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList');

// 获取banner(Home首页轮播图接口)
export const reqBannerList = () => mockRequest.get('/banner');
// 获取floor
export const reqFloorList = ()=>mockRequest.get('/floor')
// 获取搜索模块数据
export const reqGetSearchInfo = (params)=>requests({
    url:"/list",
    method:'post',
    data:params
})
// 获取产品信息的接口  
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})     
// 添加购物车信息
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
// 获取购物车信息
export const reqShopCart = ()=>requests({url:`/cart/cartList`,method:'get'})
// /api/cart/checkCart/{skuID}/{isChecked}
// 修改购物车选中状态
export const changeShopCartChecked =(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
//删除购物车接口
export const deleteShopCartItem =(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
// 获取验证码
export const getCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
// 注册接口 /api/user/passport/register
export const reqUserRegister=(data)=>requests({url:`/user/passport/register`,data,method:'post'})
// 登录接口
export const reqUserLogin=(data)=>requests({url:`/user/passport/login`,data,method:'post'})
// 登录后 用token获取用户信息
export const reqUserInfo=()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'})
// 退出登录
export const reqUserLogout=()=>requests({url:'/user/passport/logout',method:'get'})
// /api/user/userAddress/auth/findUserAddressList
// 获取地址信息
export const reqUserAddress=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
//  获取订单交易信息
export const reqUserTrade=()=>requests({url:'/order/auth/trade',method:'get'})
//  提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const  reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
// 支付信息
export const reqPayOrderInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
// 查询支付状态
export const reqPayState=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
// 获取个人中心的数据
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});