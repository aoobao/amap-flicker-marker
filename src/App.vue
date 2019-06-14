<template>
  <div id="app">
    <Header />
    <div class="app-body">

      <router-view/>
    </div>
  </div>
</template>
<script>
import '@/assets/rem'
import Header from '@/views/Header'
export default {
  components: { Header }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 0.16rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  .app-body {
    width: 100%;
    height: 100%;
    display: flex;
  }
}
</style>
