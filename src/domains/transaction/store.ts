import { store } from 'react-easy-state'

import { Dict } from '@/domains/entity'

import * as T from './entity'
import * as A from './api'

export const transactionStore = store({
  transactionMap: {} as Dict<T.Transaction>,
  transactionList: [] as T.Transaction[],

  init() {
    return this.search()
  },

  async search() {
    this.transactionMap = await A.search()
    this._compute()
  },

  async update(transaction: T.Transaction) {
    await A.search()
    this.transactionMap[transaction.id] = transaction
    this._compute()
  },

  async clearCategory(classifierId: string, categoryId: string) {
    await A.clearCategory(classifierId, categoryId)

    Object.values(this.transactionMap).forEach(el => {
      if (el.type !== 'balance' && el.categories![classifierId]) {
        delete el.categories![classifierId]
      }
    })

    this._compute()
  },

  _compute() {
    this.transactionList = Object.values(this.transactionMap)
  }
})
