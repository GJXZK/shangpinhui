<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 购物车里的商品展示 -->
        <ul class="cart-list" v-for="(item) in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :Checked=item.isChecked @click="changeChecked(item,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src=item.imgUrl>
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,item)">-</a>
            <input autocomplete="off" type="text" :value=item.skuNum minnum="1" class="itxt" @click="handler('change',$event.target.value,item)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',+1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuPrice * item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteShopCartItem(item)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked=isAllCheck >
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="DeleteAllChecked()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedSum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalsum}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import throttle from 'lodash/throttle';
  import {mapGetters} from 'vuex';
  export default {
    name: 'ShopCart',
    computed:{
      ...mapGetters('shopcart',['cartList']),
      cartInfoList(){
        return this.cartList.cartInfoList || []
      },
      totalsum(){
        let arry=this.cartInfoList.filter(item => {return item.isChecked==1})
        let sum=0;
        arry.forEach(item=>{
          sum+=item.skuNum*item.skuPrice
        })
        return sum;
      },
      isAllCheck(){
        return this.cartInfoList.every(item=>item.isChecked=="1")
      },
      checkedSum(){
        let arry=this.cartInfoList.filter(item => {return item.isChecked==1})
        return arry.length;
      }
    },
    methods:{
      // 获取购物车数据
      getData(){
        this.$store.dispatch("shopcart/getShopCartList")
      },
      // 是否勾选  向后台发数据
      changeChecked(item,event){
        let flag=event.target.checked?"0":"1"
        console.log(flag);
        console.log(item.skuId);
        this.$store.dispatch("shopcart/changeShopCartChecked",{skuId:item.skuId,isChecked:flag})
        this.getData()
      },
      // 处理购物车商品的数量  向后台发数据
      changeIndex:throttle(function(index){
        this.currentIndex=index
      },500),
      // 改变 购物车数量
      handler:throttle(async function(status,disNum,item){
        switch(status){
          case 'add':
            disNum = 1
            break;
          case 'minus':
            disNum = item.skuNum>1?-1:0;
            break;
          case 'change':
            if(isNaN(disNum)||disNum<1){
              disNum=0
            }else{
              disNum = parseInt(disNum)- item.skuNum
            }
            break;
        }
        try{
          await this.$store.dispatch('detail/addOrUpdateShopCart',{skuId:item.skuId,skuNum:disNum})
          this.getData()
        } catch(error){
          console.log(error.message);
        }
        console.log(disNum);
      },1000),
      // 删除购物车商品
      deleteShopCartItem:throttle(async function(item){
        try {
          await this.$store.dispatch('shopcart/deleteShopCartItem',item.skuId)
          this.getData()
        } catch (error) {
          alert(error.message) 
        }
      },500),
      // 删除所有选中的
      DeleteAllChecked(){
        console.log(this.cartInfoList);
        this.cartInfoList.forEach(item=>{
          if(item.isChecked){
            this.deleteShopCartItem(item)
          }
        })
        this.getData()
      },
      // 全选
      // AllChecked(event){
      //   let flag=event.target.checked?"1":"0"
      //   console.log(flag);
      //   this.cartInfoList.forEach(item=>{
      //     if(item.isChecked!=flag){
      //       this.$store.dispatch("shopcart/changeShopCartChecked",{skuId:item.skuId,isChecked:flag})
      //     }
      //   })
      //   this.getData()
      // }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>