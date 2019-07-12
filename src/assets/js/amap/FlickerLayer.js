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

/**
 * opt
 * level : 参考DEFAULT_LEVEL 格式 key值在setData中对应传入 默认key值(1,2,3)
 */
export default class FlickerCanvasLayer extends AMapUtils.Overlays {
  constructor(opt) {
    super(opt)
    this._loop = this._loop.bind(this)
    this._initialize(opt || {})
  }

  _initialize(opt) {
    this._level = opt.level || DEFALUT_LEVEL
    let map = this.getMap()
    map.on('moveend', this.clearPixel, this)
    map.on('resize', this.resizeCanvasSize, this)
    this._createCustomLayer()
    this._loop()
  }
  _createCustomLayer() {
    let canvas = this._canvas = document.createElement('canvas')
    this.resizeCanvasSize()
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
    this._ctx.clearRect(0, 0, this._width, this._height)
  }

  _drawCanvas() {
    if (!this._points || this._points.length === 0) return
    let list = this._points
    let ctx = this._ctx
    ctx.save()
    for (let i = 0; i < list.length; i++) {
      const point = list[i];
      let pixel = this.getPixelByPoint(point)
      let x = pixel.getX()
      let y = pixel.getY()
      if (x > 0 && y > 0 && x < this._width && y < this._height) {
        let opt = point.getStatus()
        ctx.fillStyle = opt.color
        // 画扩散圆
        ctx.globalAlpha = opt.alpha
        ctx.beginPath()
        ctx.arc(x, y, opt.radius, 0, 2 * Math.PI)
        ctx.fill()

        // 画中间一个小圆
        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.arc(x, y, opt.circleRadius, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
    ctx.restore()
  }

  /**
   *
   * @param {Array} list
   * position : [x:float,y:float]
   * level: 对应level中的key值 不传默认key=1
   */
  setData(list) {
    if (!list) {
      this._points = null
      return
    }
    let points = list.map(t => {
      let level = this._level[t.level || 1]
      let point = new FlickerPoint({
        ...level,
        position: t.position
      })
      return point
    })
    this._points = points
  }

  /**
   * 追加点
   * @param {Array|Object} list
   * position : [x:float,y:float]
   * level: 对应level中的key值 不传默认key=1
   */
  addData(list) {
    if (!Array.isArray(list)) list = [list]
    let points = list.map(t => {
      let level = this._level[t.level || 1]
      let point = new FlickerPoint({
        ...level,
        position: t.position
      })
      return point
    })
    if (!this._points) this._points = []
    this._points.push(...points)
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
    if (this._points && this._points.length > 0) {
      this._points.forEach(p => {
        p.setExtData(null)
      })
    }
  }

  getPixelByPoint(point) {
    let pixel = point.getExtData()
    if (!pixel) {
      let map = this.getMap()
      let position = point.getPosition()
      pixel = map.lngLatToContainer(position)
      point.setExtData(pixel)
    }
    return pixel
  }

}
