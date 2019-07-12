/**
 * 闪烁点配置
 * opts
 * position 经纬度 [longitude,latitude]
 * color '#f8a036'
 * delay 延迟时间 默认随机 错开不同点.
 * radius 30  // 半径
 * speed 1  // 速度 1表示 1秒钟循环1次.值越高闪烁越快
 * circleRadius 2 // 中间小圆大小
 */
export default class FlickerPoint {
  constructor(opt) {
    this._initialize(opt || {})
  }
  _initialize(opt) {
    this._position = opt.position
    this._speed = opt.speed || 1
    this._color = opt.color || '#f8a036'
    // 延迟启动时间 保证同时加入的点不是相同频率闪烁
    this._delay = opt.delay || ~~(Math.random() * 1000)
    this._radius = opt.radius || 30
    this._circleRadius = opt.circleRadius || 2
    this._time = new Date().getTime()
  }

  // 返回当前点位状态
  getStatus() {
    let time = new Date().getTime()
    let diffTime = time - this._time - this._delay
    // let extData = this.getExtData() || {}
    if (diffTime <= 0) {
      return {
        position: this._position,
        color: this._color,
        circleRadius: this._circleRadius,
        radius: 1,
        alpha: 0.8,
        // ...extData
      }
    }
    let useTime = ~~(1000 / this._speed)
    let tick = diffTime % useTime
    let num = tick / useTime
    let alpha = 1 - num
    let radius = this._radius * num
    return {
      position: this._position,
      color: this._color,
      circleRadius: this._circleRadius,
      radius,
      alpha,
      // ...extData
    }
  }

  getPosition() {
    return this._position
  }

  setExtData(data) {
    this._extData = data
  }

  getExtData() {
    return this._extData || null
  }

}
