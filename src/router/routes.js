// 配置路由
let routes=[
    {
        path:'/home',
        component:()=>import('@/pages/Home'),
        meta:{show:true}
    },
    {
        path:"/login",
        component:()=>import('@/pages/Login'),
        meta:{show:false}
    },
    {
        path:"/register",
        component:()=>import('@/pages/Register'),
        meta:{show:false}
    },
    {
        name:'HeaderSearch',
        path:"/search/:keyword?",
        component:()=>import('@/pages/Search'),
        props(route){
            return {
              categoryName:route.query.categoryName,
              category1Id:route.query.categoryId,
            }
        },
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        name:'addcartsuccess',
        component:()=>import('@/pages/AddCartSuccess'),
        meta:{show:true}
    },
    {
        path:'/shopcart',
        name:'shopcart',
        component:()=>import('@/pages/ShopCart'),
        meta:{show:true}
    },
    {
        // params传参
        path:'/detail/:skuid',
        component:()=>import('@/pages/Detail'),
        meta:{show:true}
    },
    {
        path:'/trade',
        component:()=>import('@/pages/Trade'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            // 路由独享守卫
            if(from.path=='/shopcart'|| from.path=='/'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/pay',
        component:()=>import('@/pages/Pay'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            // 路由独享守卫
            if(from.path=='/trade'|| from.path=='/'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        component:()=>import('@/pages/PaySuccess'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            // 只有从支付界面才能跳转到支付成功界面
            if(from.path=='/pay' || from.path=='/'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/center',
        component:()=>import('@/pages/Center'),
        meta:{show:true},
        children:[
            {
                path:'myorder',
                component:()=>import('@/pages/Center/myOrder')
            },
            {
                path:'grouporder',
                component:()=>import('@/pages/Center/groupOrder')
            },
            {
                // 重定向 在进入个人中心后 直接展示myorder的内容
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    // 重定向  在项目跑起来的时候，访问/,立马让他定向回到首页
    {
        path:'*',
        redirect:'/home'
    }
]
export default routes;