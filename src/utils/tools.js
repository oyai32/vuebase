// 重写setItem事件，当使用setItem的时候，触发，window.dispatchEvent派发事件
export const dispatchEventStroage = () => {
  const signSetItem = localStorage.setItem
  localStorage.setItem = function (key, val) {
    let setEvent = new Event('setItemEvent')
    setEvent.key = key
    setEvent.newValue = val
    window.dispatchEvent(setEvent)
    signSetItem.apply(this, arguments)
  }
}
