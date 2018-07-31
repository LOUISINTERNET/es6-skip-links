function throttle(fn, threshhold = 250, scope, args = []) {
  let last, deferTimer
  return function() {
    const context = scope || this
    const now = +new Date()
    const eventArgs = arguments

    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function() {
        last = now
        fn.apply(context, [...eventArgs, ...args])
      }, threshhold)
    } else {
      last = now
      fn.apply(context, [...eventArgs, ...args])
    }
  }
}

function hyphenToCamelCase(string) {
  return string.replace('data-', '').replace(/-([a-z])/g, string => {
    return string[1].toUpperCase()
  })
}

function camelCaseToHyphen(string) {
  return `data-${string.replace(/([A-Z])/g, string => {
    return `-${string.toLowerCase()}`
  })}`
}

export { throttle, hyphenToCamelCase, camelCaseToHyphen }
