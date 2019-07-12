import AMapUtils from 'amap-utils'
import FlickerPoint from './FlickerPoint'

const DEFALUT_LEVEL = {
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

export default class FlickerCanvasLayer extends AMapUtils.Overlays {
  constructor(opt) {
    super(opt)
    this._loop = this._loop.bind(this)
    this._initialize(opt || {})
  }

  _initialize() {
    let map = this.getMap()
    map.on('moveend', this.clearPixel, this)
    map.on('resize', this.resizeCanvasSize, this)
    this._createCustomLayer()
    this._loop()
  }
  _createCustomLayer() {
    let canvas = this._canvas = document.createElement('canvas')
    this._ctx = canvas.getContext('2d')
    let cus = new AMap.CustomLayer(canvas, {
      zIndex: this.getzIndex()
    })
    cus.render = null
    this.setOverlays(cus)
  }

  _loop() {
    this._draw()
    this._timer = requestAnimationFrame(this._loop)
  }

  _draw() {
    this._clearCanvas()
    this._drawCanvas()
  }

  _clearCanvas() {

  }

  _drawCanvas() {

  }

  setData(list) {

  }

  destroy() {
    let map = this.getMap()
    if (this._timer) {
      cancelAnimationFrame(this._timer)
      this._timer = null
    }
    map.off('moveend', this.clearPixel, this)
    map.off('resize', this.resizeCanvasSize, this)
    super.destroy()
  }

  resizeCanvasSize() {
    let map = this.getMap()
    let size = map.getSize()
    let canvas = this._canvas
    canvas.width = this._width = size.width
    canvas.height = this._height = size.height

  }
  // 清除坐标点对应像素点位置
  clearPixel() {

  }
}
