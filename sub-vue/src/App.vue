<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    {{userName}}
    <HelloWorld v-if="userName" msg="Welcome to Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  props:["getGlobalState"],
  components: {
    HelloWorld
  },
  data() {
    return{
      userName: ''
    }
  },
  mounted() {
    this.userName = this.getGlobalState("userName");
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
