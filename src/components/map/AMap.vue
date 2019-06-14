<template>
  <div class="map" ref="map">
    <slot></slot>
  </div>
</template>
<script>
import requireMap from '@/assets/js/importAMap'
export default {
  props: {
    // 地图初始化参数
    opts: {
      type: Object,
      default () {
        return {
          zoom: 8,//级别
          viewMode: '2D'//使用3D视图
        }
      }
    }
  },
  data () {
    let amap = {}
    return {
      amap
    }
  },
  provide () {
    return {
      amap: this.amap
    }
  },
  mounted () {
    requireMap(this.initMap)
  },
  beforeDestroy () {
    if (this.amap.$map) {
      this.amap.$map.destroy()
      delete this.amap.$map
    }
  },
  methods: {
    initMap () {

      // this.$store.commit('setMobile', AMap.Browser.mobile)
      // emit before map create (change opts)
      this.$emit('beforeCreate')
      this.amap.$map = new AMap.Map(this.$refs.map, {
        ...this.opts
      })
      setTimeout(() => {
        this.$emit('created')
      }, 1);
    },
    getMap () {
      return this.amap.$map || null
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
