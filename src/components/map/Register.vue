<script>
// 高德地图注册事件(所有地图组件mixins)
// 所有地图组件实现init 方法,初始化结束后会自动调用init
// 组件销毁时会自动调用destroy方法,
// 如果实例下绑定有$object(this.$object),会在地图中移除
export default {
  render () { return null },
  inject: ['amap'],
  created () {
    let map = this.getMap()
    typeof this.init === 'function' && this.init(map)
  },
  beforeDestroy () {
    typeof this.destroy === 'function' && this.destroy()
    this.destroyObject()
  },
  methods: {
    // 通用方法 TODO
    getObject () {
      return this.$object || null
    },
    setObject (object) {
      this.destroyObject()
      this.$object = object
    },
    getMap () {
      return this.amap.$map || null
    },
    destroyObject () {
      if (this.$object) {
        if (typeof this.$object === 'object') {
          if (typeof this.$object.setMap === 'function') {
            this.$object.setMap(null)
          }
          if (typeof this.$object.destroy === 'function') {
            this.$object.destroy()
          }
          this.$object = null
        } else {
          console.warn('$object is not object')
        }
      }
    }
  }
}
</script>
