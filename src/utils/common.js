//是否为NULL
function isNull(value) {
  return value == null || typeof (value) == 'undefined';
}

//是否为空(包括空字符串、空格、null,{})
export function isEmpty (strings) {
  if (!isNull(strings)) { // 先判断是否为null，返回true ，判断是否为空字符串，返回true
    // 空对象
    if (strings instanceof Object) {
      if (JSON.stringify(strings) === '{}') {
        return true
      }
    }
    if ((strings + '').replace(/(^\s*)|(\s*$)/g, '').length === 0) { //已修正bug[当strings为数字时，会报strings.replace is not a function]
      return true
    }
  } else {
    return true
  }
  // 不为空返回false
  return false
}