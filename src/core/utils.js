//Pure function
export function getNameMethod(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return `on${string.charAt(0).toUpperCase() + string.slice(1)}`
}

export function range(start, end) {
  if (start > end) {
    ;[end, start] = [start, end]
  }
  return new Array(end - start + 1).fill('').map((_, i) => {
    return start + i
  })
}

export function matrixPosition($target, $current) {
  const target = $target.id(true) // to cells for multisel
  const current = $current.id(true) // from cells for multisel
  const cols = range(current.col, target.col) //get arr from id colums
  const rows = range(current.row, target.row) //get arr from id
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, { col, row }) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = --col < MIN_VALUE ? MIN_VALUE : col--
      break
    case 'ArrowUp':
      row = --row < MIN_VALUE ? MIN_VALUE : row--
      break
  }

  return `[data-id="${row}:${col}"]`
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function storageName(params) {
  return `Excel: ${params}`
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}:${styles[key]}`)
    .join(';')
}

export function debounce(fn, wait) {
  let timeout
  return function (...args) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
      // fn(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function parse(value = '') {
  try {
    if (value.startsWith('=')) {
      return eval(value.slice(1))
    }
  } catch (e) {
    console.log('here error')
  }
  return value
}
