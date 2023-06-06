export function isObjectEmpty(objectName) {
  return Object.keys(objectName).length === 0
}
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
