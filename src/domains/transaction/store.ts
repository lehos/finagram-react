import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import * as T from './entity'
import * as A from './api'

export const transactionStore = store({
  transactions: [] as T.Transaction[],

  async init() {
    transactionStore.transactions = await A.getList()
  }
})
