import { store } from 'react-easy-state'

import * as T from './entity'
import * as A from './api'

import { removeElem } from '@/utils/array'

export const transactionStore = store({
  transactionList: [] as T.Transaction[],

  async init() {
    this.transactionList = await A.getList()
  },

  async update(transaction: T.Transaction, values: Partial<T.Transaction>) {
    Object.assign(transaction, values)
    this._upList()
  },

  async clearCategory(categoryId: string) {
    await A.clearCategory(categoryId)

    this.transactionList.forEach(el => {
      if (el.kind !== 'balance') {
        removeElem(el.categories!, { clb: c => c.categoryId === categoryId })
      }
    })
  },

  // todo get rid of this hack.
  //  should pass cloned array to ant table
  _upList() {
    this.transactionList = [...this.transactionList]
  }
})
