<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTrademark">×</i></li>
            <li class="with-x" v-for="(attr,index) in searchParams.props" :key="index">
              {{attr.split(":")[1]}}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector 分类部分-->
        <SearchSelector :trademark='trademark' :attrsList='attrsList' @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details  详情 商品-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合<span v-if="isOne" class="iconfont" :class="{'icon-pullup':isAsc,'icon-pulldown':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格<span v-if="isTwo" class="iconfont" :class="{'icon-pullup':isAsc,'icon-pulldown':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="good in goodsList"
                :key="good.index">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="searchlist.total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from "@/components/Pagination"
export default {
  name: "MySearch", 
  components: {
    SearchSelector,
    Pagination
  },
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        // 排序
        // 1:desc 综合降序 1:esc 综合升序 2:desc 价格降序 2:esc 价格升序
        order: "1:desc",
        pageNo: 1,
        pageSize: 5,
        trademark: "",
      },
    };
  },
  // 获取vuex里的getter数据
  computed: {
    ...mapGetters("mysearch", ["goodsList", "trademark", "attrsList"]),
    ...mapState("mysearch",["searchlist"]),
    isOne(){
      return this.searchParams.order.indexOf('1')!=-1
    },
    isTwo(){
      return this.searchParams.order.indexOf('2')!=-1
    },
    isAsc(){
      return this.searchParams.order.indexOf('asc')!=-1
    },
    isDesc(){
      return this.searchParams.order.indexOf('desc')!=-1
    },
  },
  methods: {
    // 请求vuex里的action方法 请求api接口传递参数获取search结果
    getData() {
      this.$store.dispatch("mysearch/getSearchInfo", this.searchParams);
    },
    // 面包屑关闭 删除面包屑 重新发送请求 再跳转一次路由
    removeCategoryName(){
      // 清除标题一二三 标题名 
      this.searchParams.categoryName=undefined;
      this.searchParams.category1Id=undefined;
      this.searchParams.category2Id=undefined;
      this.searchParams.category3Id=undefined;
      // 重新获取数据
      this.getData()
      // 地址栏跳转 进行路由跳转
      if(this.$route.params){
        this.$router.push({name:'HeaderSearch',params:this.$route.params})
      }
    },
    removeKeyword(){
      // 置空搜索关键字
      this.searchParams.keyword=undefined;
      // 重新获取数据
      this.getData()
      if(this.$route.query){
        this.$router.push({name:'HeaderSearch',query:this.$route.query})
        console.log(this.$route.query);
      }
      this.$bus.$emit('cleanKeyword');
    },
    // 点击品牌 在SearchSelector组件中调用该函数 传递参数到父组件
    trademarkInfo(tm){
      this.searchParams.trademark=`${tm.tmId}:${tm.tmName}`
      this.getData()
    },
    removeTrademark(){
      // 将品牌对象置空
      this.searchParams.trademark=undefined
      this.getData()
    },  
    // 点击分类
    attrInfo(attr,attrValue){
      let props =  `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重
      if(this.searchParams.props.indexOf(props)==-1){
        this.searchParams.props.push(props)
      }
      this.getData()
    },
    removeAttr(index){
      this.searchParams.props.splice(index,1)
      this.getData()
    },
    // 改变顺序
    changeOrder(flag){
      let Sort = this.searchParams.order.split(':')[1];
      if(this.searchParams.order.indexOf('1')+1==flag){
        this.searchParams.order=`${flag}:${Sort=="desc"?"asc":"desc"}`
      }else{
        this.searchParams.order=`${flag}:${Sort=="desc"?"asc":"desc"}`
      }
      this.getData()
    },
    getPageNo(PageNo){
      this.searchParams.pageNo=PageNo;
      this.getData()
    },
    
  },
  // 搜索后在mounted发送请求之前准备好数据
  beforeMount(){
    // 将传递searchParams里的参数定义成对应的数据
    // 完整写法
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyword;
    // 简写
    // 将this.$route和this.route.query整合到this.searchParams 
    Object.assign(this.searchParams,this.$route.params,this.$route.query)
  },
  // 在进图搜索界面之后 渲染界面之前发送请求 获取数据
  mounted() {
    this.getData();
  },
  // 进入不同的部分 都再一次发送请求
  // 监听组件实例身上的属性的属性值变化
  // 计算属性  监听属性 没有this
  watch:{
    $route(){
      //  每次发请求之前都要整合一遍数据 
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
      this.getData()
      // 每一次请求完毕  应该把相应的1.2.3级分类的id置空 接收下一次的分级id
      this.searchParams.category1Id=undefined;
      this.searchParams.category2Id=undefined;
      this.searchParams.category3Id=undefined;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
