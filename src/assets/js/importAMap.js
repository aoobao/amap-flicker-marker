import {
  AMAP_KEY,
  AMAP_VERSION
} from '@/assets/setting'
let _callback = null

window.__AMAP_CALLBACK = function () {
  // console.log('加载高德地图成功')
  typeof _callback === 'function' && _callback()
}

let isLoad = false

export default function requireAMap(callback) {
  _callback = callback
  if (!isLoad) {
    isLoad = true
    let url = `https://webapi.amap.com/maps?v=${AMAP_VERSION}&key=${AMAP_KEY}&callback=__AMAP_CALLBACK`;

    let jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;

    document.head.appendChild(jsapi);
  } else {
    // 暂时直接回调
    window.__AMAP_CALLBACK()
  }

}
