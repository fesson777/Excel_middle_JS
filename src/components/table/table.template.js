const CODES = {
  A: 65,
  Z: 90,
}

function toCell(data = '') {
  //createCell
  return `
    <div class="cell" contenteditable="">
      ${data}
    </div>
    `
}

function toColumn(letter) {
  // createCol
  return `
     <div class="column">${letter}</div>
    `
}

function createRow(index, content) {
  return `
    <div class="row">
        <div class="row-info">${index}</div>
        <div class="row-data">
            ${content}
        </div>
    </div>    
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index) //get letter
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1 // для буквы Z
  const rows = []
  //вычисляем буквы из их кода
  const colsLetter = new Array(colsCount)
    .fill('')
    .map(toChar) // замена.map((_, index) => String.fromCha...
    .map(toColumn) // замена .map((letter) => createCol(letter))
    .join('') // в итоге это ячейки строки для row-data

  //первая строка, техническая с буквами в row-data
  rows.push(createRow('', colsLetter))

  const colsData = new Array(colsCount).fill('').map(toCell).join('')

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, colsData))
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
