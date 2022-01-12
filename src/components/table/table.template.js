import { defaultStyle } from '../../constants'
import { parse, toInlineStyles } from '../../core/utils'

const CODES = { A: 65, Z: 90 }
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
  //createCell
  return function (_, col) {
    const width = getWidth(state.colState, col)
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyle,
      ...state.stylesState[id],
    })

    return `
    <div class="cell"
     contenteditable=""
       data-col="${col}"
       data-id="${id}"
       data-type="cell"
       data-value="${data || ''}"
      style="${styles};width: ${width}"> ${parse(data) || ''}     
    </div>
    `
  }
}

function toColumn({ letter, index, width }) {
  return `
     <div
      class="column"
      data-type="resizable"
      data-col="${index}"
      style = "width: ${width}">
        ${letter}       
        <div class="col-resize" data-resize="col"></div>
     </div>
    `
}

function createRow(index, content, state) {
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
  const height = getHeight(state, index)
  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height:${height}">
        <div class="row-info">
        ${index}
        ${resize}
        </div>
        <div class="row-data">
            ${content}
        </div>
    </div>    
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index) //get letter
}

function withWidthFrom(state) {
  return function (letter, index) {
    return {
      letter,
      index,
      width: getWidth(state.colState, index),
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1 // для буквы Z
  const rows = []
  //вычисляем буквы из их кода
  const colsLetter = new Array(colsCount)
    .fill('')
    .map(toChar) // замена.map((_, index) => String.fromCha...
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('') // в итоге это ячейки строки для row-data

  //первая строка, техническая с буквами в row-data
  rows.push(createRow('', colsLetter, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(toCell(state, row)).join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
