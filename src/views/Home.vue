<template>
  <div class="home">
    <MapView />
  </div>
</template>

<script>
// @ is an alias to /src
// import AMap from '@/components/map/AMap'
import MapView from './Home/MapView'
export default {
  name: 'home',
  components: {
    MapView
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
