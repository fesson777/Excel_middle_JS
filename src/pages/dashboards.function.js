import { storage } from '../core/utils'

function toHTML(key) {
  const model = storage(key)

  return `
    <li class="db__record">
        <a href="#${parseKey(key)}"> ${model.title} </a>
        <strong>
        ${new Date(model.dateCreate).toLocaleDateString()}
        ${new Date(model.dateCreate).toLocaleTimeString()}
        </strong>
    </li>
    `
}

function parseKey(key) {
  const temp = key.split(': ').join('/')
  return temp.charAt(0).toLowerCase() + temp.slice(1)
}

function getAllKeys() {
  let keys = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if (!key.includes('Excel')) {
      continue
    }
    keys.push(key)
  }

  return keys
}

export function createsRecordsTable() {
  const keys = getAllKeys()

  if (!keys.length) {
    return `<p>Записей пока что нет.</p>`
  }

  return `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>

    <ul class="db__list">
       ${keys.map(toHTML).join('')} 
    </ul>
    `
}
