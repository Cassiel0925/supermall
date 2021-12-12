<template>
  <div id="app">

    <!-- 保持Home的状态 不让Home 随意销毁掉 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
  
}
</script>
    

<style>
@import "assets/css/style.css";
  @import "assets/css/base.css";
</style>
