import { Excel } from '../components/excel/Excel'
import { Formula } from '../components/formula/Formula'
import { Header } from '../components/header/Header'
import { normalizeInitialState } from '../components/redux/initialState'
import { rootReducer } from '../components/redux/rootReducer'
import { Table } from '../components/table/Table'
import { Toolbar } from '../components/toolbar/Toolbar'
import { createStore } from '../core/createStore'
import { debounce, storage } from '../core/utils'
import { Page } from '../core/Page'

function storageName(params) {
  return `Excel: ${params}`
}

export class ExcelPage extends Page {
  getRoot() {
    const stateLS = storage(storageName(this.params))
    const store = createStore(rootReducer, normalizeInitialState(stateLS))

    const stateListener = debounce((state) => {
      console.log('State from Excel', state)
      storage(storageName(this.params), state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })
    return this.excel.getRoot()
  }

  afterRender() {
    //после рендера добавляем слушателей в Excel
    this.excel.init()
  }
  destroy() {
    this.excel.destroy()
  }
}
