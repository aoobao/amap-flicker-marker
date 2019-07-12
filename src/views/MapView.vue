<template>
  <div class="home">
    <MapView ref="mapView" />
    <div class="control">
      <input type="text" v-model.number="number">
      <button style="margin-left:10px;" @click="update">刷新</button>
    </div>
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
  },
  data () {
    return {
      number: 100
    }
  },
  methods: {
    update () {
      this.$refs.mapView.setRandList(this.number)
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .control {
    position: absolute;
    left: 20px;
    top: 20px;
  }
}
</style>
