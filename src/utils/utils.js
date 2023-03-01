function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true // 是微信端
  } else {
    return false
  }
}
export { isWeiXin }
