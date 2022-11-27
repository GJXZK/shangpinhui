<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button :class="{active:pageNo==1}" v-show="pageNo>3" @click="$emit('getPageNo',1)">1</button>
    <button v-show="pageNo>4">...</button>
    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" 
            v-show="page>=startNumAndEndNum.start" 
            :class="{active:pageNo==page}"
            @click="$emit('getPageNo',page)">
            {{page}}
    </button>
    <button v-show="pageNo<totalPage-3">...</button>
    <button :class="{active:pageNo==totalPage}" 
            v-show="pageNo<totalPage-2" 
            @click="$emit('getPageNo',totalPage)">
            {{ totalPage }}
    </button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "myPagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总共有多少页
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码的起始数据与结束数据，连续的数据 至少五个
    // 不正常相信 总页数没有连续页码多
    startNumAndEndNum() {
      let start = 0,end = 0;
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      }else{
        // 正常现象 连续页码5个以上
        start = this.pageNo- parseInt(this.continues/2);
        end = this.pageNo + parseInt(this.continues/2);
        if(start < 1){
            start = 1;
            end = this.continues;
        }
        if(end > this.totalPage){
            end = this.totalPage;
        }
      }
      return {start,end}
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
