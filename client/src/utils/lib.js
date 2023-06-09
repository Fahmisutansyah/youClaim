export function isObjectEmpty(objectName) {
  return Object.keys(objectName).length === 0
}
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function camelCaseToWords(str) {
  return str
    .match(/^[a-z]+|[A-Z][a-z]*/g)
    .map(function (x) {
      return x[0].toUpperCase() + x.substr(1).toLowerCase()
    })
    .join(' ')
}
