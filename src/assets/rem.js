import {
  SCREEN_WIDTH,
  SIZE
} from '@/assets/setting'


window.onresize = function () {
  resizeScale()
}

var resizeScale = () => {
  var width = document.body.offsetWidth
  let rem = width * SIZE / SCREEN_WIDTH

  document.documentElement.style.fontSize = rem + 'px'

  // return rem + 'px'
  // var height = document.body.offsetHeight
  // var wScale = width / SCREEN_WIDTH
  // var hScale = height / SCREEN_HEIGHT
  // window.WIDTH_SCALE = wScale
  // window.HEIGHT_SCALE = hScale
  // let $app = document.getElementById('app')
  // //   debugger
  // if (!$app) {
  //   setTimeout(() => {
  //     resizeScale()
  //   }, 50)
  // } else {
  //   $app.style.transform = 'scale(' + wScale + ',' + hScale + ')'
  // }
}

resizeScale()
