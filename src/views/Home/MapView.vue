<template>
  <a-map :opts="opts" ref="map" @created="setRandList(100)">
    <FilckerPoints :data="data" />
  </a-map>
</template>
<script>
import AMap from '@/components/map/AMap'
import FilckerPoints from '@/components/map/FilckerPoints'
export default {
  components: { AMap, FilckerPoints },
  data () {
    return {
      opts: {
        zoom: 10,
        center: [120.672913, 27.980921]
      },
      data: []
    }
  },
  methods: {
    setRandList (number = 100) {

      let map = this.$refs.map.getMap()
      let bound = map.getBounds()
      let southWesh = bound.getSouthWest()  // 最小经纬度
      let northEast = bound.getNorthEast()
      let minX = southWesh.getLng()
      let minY = southWesh.getLat()
      let maxX = northEast.getLng()
      let maxY = northEast.getLat()

      let list = []
      for (let i = 0; i < number; i++) {
        let longitude = getRandNumber(minX, maxX)
        let latitude = getRandNumber(minY, maxY)
        list.push({
          position: [longitude, latitude],
          level: ~~(Math.random() * 3) + 1
        })
      }
      this.data = list
    }
  }
}

function getRandNumber (minNumber, maxNumber) {
  return minNumber + Math.random() * (maxNumber - minNumber)
}
</script>
