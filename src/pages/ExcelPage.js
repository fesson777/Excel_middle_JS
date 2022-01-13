import { Excel } from '../components/excel/Excel'
import { Formula } from '../components/formula/Formula'
import { Header } from '../components/header/Header'
import { normalizeInitialState } from '../components/redux/initialState'
import { rootReducer } from '../components/redux/rootReducer'
import { Table } from '../components/table/Table'
import { Toolbar } from '../components/toolbar/Toolbar'
import { createStore } from '../core/createStore'
import { Page } from '../core/Page'
import { StateProcessor } from '../core/routes/StateProcessor'
import { LocalStorageClient } from '../core/routes/LocalStorageClient'

export class ExcelPage extends Page {
  constructor(params) {
    super(params)
    this.storeSub = null
    this.processor = new StateProcessor(new LocalStorageClient(this.params))
  }

  async getRoot() {
    const stateLS = await this.processor.get()
    const store = createStore(rootReducer, normalizeInitialState(stateLS))

    this.storeSub = store.subscribe(this.processor.listen)

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
    this.storeSub.unsubscribe()
  }
}
