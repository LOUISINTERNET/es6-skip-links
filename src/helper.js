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

export { hyphenToCamelCase, camelCaseToHyphen }
