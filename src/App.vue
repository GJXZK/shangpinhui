<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted(){
    // 调用vuex myhome里的 categoryList方法
    this.$store.dispatch('myhome/categoryList')
  }
}
</script>

<style>
  body{
    overflow: hidden;
    padding-right: 0 !important;    
  }
</style>
