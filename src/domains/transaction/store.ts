import {store} from 'react-easy-state'

import * as T from './entity'
import * as A from './api'

export const transactionStore = store({
  transactionList: [] as T.Transaction[],

  async init() {
    transactionStore.transactionList = await A.getList()
  }
})
