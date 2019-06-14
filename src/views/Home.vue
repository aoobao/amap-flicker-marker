<template>
  <div class="home-router">
    <Header />
    <div class="home-router-body">
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from '@/views/Header'
export default {
  components: { Header }
}
</script>

<style lang="scss" scoped>
.home-router {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .home-router-body {
    width: 100%;
    height: 100%;
    display: flex;
  }
}
</style>
