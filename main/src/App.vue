<template>
  <div id="app">
    <div class="layout-header">
      <div class="logo">飞象企服 管理员：{{ userName }}<button @click="acceptUser">获取管理员</button></div>
      <ul class="sub-apps">
        <li v-for="item in microApps" :class="{active: item.activeRule === current}" :key="item.name" @click="goto(item)">{{ item.name }}</li>
      </ul>
    </div>
    <div id="subapp-viewport"></div>
  </div>
</template>

<script>
import microApps from './micro-app'
import store from './store'

export default {
  name: 'App',
  data () {
    return {
      microApps,
      current: '/#/micrApp/sub-vue'
    }
  },
  methods: {
    goto (item) {
      console.log(item)
      this.current = item.activeRule
      history.pushState(null, item.activeRule, item.activeRule) // 没引入路由，所以不能用路由切换
    },
    acceptUser () {
      let userName = 'jiapandong'
      store.setGlobalState({userName})
    }
  },
  computed: {
    userName () {
      return store.getGlobalState('userName')
    }
  },
  created() {
    const path = window.location.pathname
    if (this.microApps.findIndex(item => item.activeRule === path) >= 0) {
      this.current = path
    }
  },
}
</script>

<style>
html, body{
  margin: 0 !important;
  padding: 0;
}
.layout-header{
  height: 50px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 50px;
  position: relative;
}
.logo {
  float: left;
  margin: 0 50px;
}
.sub-apps {
  list-style: none;
  margin: 0;
  overflow: hidden;
}
.sub-apps li{
  list-style: none;
  padding: 0 20px;
  cursor: pointer;
  float: left;
}
.sub-apps li.active {
  color: #42b983;
  text-decoration: underline;
}
</style>