import {
  AMAP_KEY,
  AMAP_VERSION,
  AMAP_PLUGIN
} from '@/assets/setting'
let _callback = []

window.__AMAP_CALLBACK = function () {
  // console.log('加载高德地图成功')
  let callback = _callback.shift()
  if (typeof callback === 'function') {
    callback()
    window.__AMAP_CALLBACK()
  }
  // typeof _callback === 'function' && _callback()
}

let isLoad = false

export default function requireAMap(callback) {
  // _callback = callback
  if (typeof callback === 'function') {
    _callback.push(callback)
  }
  if (!isLoad) {
    isLoad = true
    let url = `https://webapi.amap.com/maps?v=${AMAP_VERSION}&key=${AMAP_KEY}&plugin=${AMAP_PLUGIN}&callback=__AMAP_CALLBACK`

    let jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;

    document.head.appendChild(jsapi);
  } else {
    window.__AMAP_CALLBACK()
  }

}
