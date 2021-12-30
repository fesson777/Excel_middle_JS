const CODES = { A: 65, Z: 90 }
const DEFAULT_WIDTH = 120

function toCell(state, row) {
  //createCell
  return function (_, col) {
    const width = getWidth(state.colState, col)
    return `
    <div class="cell"
     contenteditable=""
      data-col="${col}"
       data-id="${row}:${col}"
        data-type="cell"
        style="width: ${width}">     
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

function createRow(index, content) {
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
    <div class="row" data-type="resizable">
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

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
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
  rows.push(createRow('', colsLetter))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(toCell(state, row)).join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}

// //`
// <div class="row">
// <div class="row-info"></div>
// <div class="row-data">
//   <div class="column">A</div>
//   <div class="column">B</div>
//   <div class="column">C</div>
// </div>
// </div>
// <div class="row">
// <div class="row-info">1</div>
// <div class="row-data">
//   <div class="cell selected" contenteditable="">A1</div>
//   <div class="cell" contenteditable="">B1</div>
//   <div class="cell" contenteditable="">C1</div>
// </div>
// </div>
// `
