<script>
import register from '@/components/map/Register'
import FlickerLayer from '@/assets/js/amap/FlickerLayer'
// import { mapGetters } from 'vuex'
// import { getDateString } from '@/assets/js/utils'
// import AMapUtils from 'amap-utils'
export default {
  mixins: [register],
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  methods: {
    // 组件入口 不需要写在create中
    init (map) {
      // 默认level
      let level = {
        1: {
          speed: 0.5,
          color: '#f8a036',
          radius: 10
        },
        2: {
          speed: 1,
          color: '#fb5447',
          radius: 15
        },
        3: {
          speed: 1.5,
          color: '#f0176e',
          radius: 20
        }
      }

      let layer = new FlickerLayer({
        map,
        zIndex: 150,
        level
      })
      this.setObject(layer)
      this.initData()
    },
    initData () {
      let layer = this.getObject()
      layer.setData(this.data)
    },
    // 销毁组件调用.
    destroy () {

    }
  },
  watch: {
    data () {
      this.initData()
    }
  }
}
</script>
