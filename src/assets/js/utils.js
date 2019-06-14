import store from 'store'

export function setItem(key, value) {
  // let time = new Date()  过期策略后面具体到项目考虑

  return store.set(key, value)
}

export function getItem(key) {
  return store.get(key)
}

export function getPointValue(st) {
  const temp = st.split('|')
  let ar = []
  temp.forEach(str => {
    if (str) {
      let arr = []
      const mat = str.match(/\d+(\.\d+)?/g)
      for (var i = 1; i < mat.length; i += 2) {
        var x = parseFloat(mat[i - 1])
        var y = parseFloat(mat[i])
        arr.push([x, y])
      }
      if (arr.length >= 3) ar.push(arr)
    }
  })
  return ar
}

export function getBounds(arr) {
  let minX, minY, maxX, maxY
  arr.forEach(re => {
    re.forEach(item => {
      if (!minX || minX > getXY(item, 0)) minX = getXY(item, 0)
      if (!minY || minY > getXY(item, 1)) minY = getXY(item, 1)
      if (!maxX || maxX < getXY(item, 0)) maxX = getXY(item, 0)
      if (!maxY || maxY < getXY(item, 1)) maxY = getXY(item, 1)
    })
  })
  return {
    minX,
    minY,
    maxX,
    maxY
  }
}

export function errMessage(msg) {
  alert(msg)
}

function getXY(item, index) {
  if (Array.isArray(item)) {
    return item[index]
  } else {
    if (index === 0) return item.getLng()
    else return item.getLat()
  }
}

export default {
  setItem,
  getItem,
  getPointValue,
  getBounds,
  errMessage
}
