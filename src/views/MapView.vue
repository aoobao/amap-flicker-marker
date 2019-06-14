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
  position: relative;
  .left-context {
    width: 5rem;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .right-context {
    width: 5rem;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
