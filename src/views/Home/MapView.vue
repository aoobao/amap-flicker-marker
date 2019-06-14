<template>
  <a-map :opts="opts">

  </a-map>
</template>
<script>
import AMap from '@/components/map/AMap'
export default {
  components: { AMap },
  data () {
    return {
      opts: {
        zoom: 10,
        center: [120.672913, 27.980921]
      }
    }
  }
}
</script>
