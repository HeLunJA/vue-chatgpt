function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true // 是微信端
  } else {
    return false
  }
}
const scrollTop = (number = 0, time) => {
  if (!time) {
    document.body.scrollTop = document.documentElement.scrollTop = number
    return number
  }
  const spacingTime = 20 // 设置循环的间隔时间  值越小消耗性能越高
  let spacingInex = time / spacingTime // 计算循环的次数
  let nowTop = document.body.scrollTop + document.documentElement.scrollTop // 获取当前滚动条位置
  let everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离
  let scrollTimer = setInterval(() => {
    if (spacingInex > 0) {
      spacingInex--
      scrollTop((nowTop += everTop))
    } else {
      clearInterval(scrollTimer) // 清除计时器
    }
  }, spacingTime)
}
//获取min和max之间的一个随机整数[5,100];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

//打乱数组
function shuffle(arr) {
  if (arr.length) {
    let _arr = arr.slice() //slice不会影响原来的数组，但是splice就会影响原来的arr数组
    for (let i = 0; i < _arr.length; i++) {
      let j = getRandomInt(0, i)
      let t = _arr[i]
      _arr[i] = _arr[j]
      _arr[j] = t
    }
    return _arr
  } else {
    return []
  }
}

function isMobile() {
  let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  return flag
}

export { isWeiXin, scrollTop, getRandomInt, shuffle, isMobile }
