/* eslint-disable no-useless-escape */
export function isObjectEmpty(objectName) {
  if (!objectName) {
    return true
  }
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

export function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export function debounce(fn, wait) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer) // clear any pre-existing timer
    }
    const context = this // get the current context
    timer = setTimeout(() => {
      fn.apply(context, args) // call the function if time expires
    }, wait)
  }
}
