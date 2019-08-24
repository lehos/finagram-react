import {store} from 'react-easy-state'

import * as T from './entity'
import * as A from './api'

import {removeElem} from '@/utils'

export const transactionStore = store({
  transactionList: [] as T.Transaction[],

  async init() {
    transactionStore.transactionList = await A.getList()
  },

  async update() {
    //
  },

  async clearCategory(categoryId: string) {
    await A.clearCategory(categoryId)

    transactionStore.transactionList.forEach(el => {
      if (el.kind !== 'balance') {
        removeElem(el.categories, {clb: c => c.categoryId === categoryId})
      }
    })
  }
})
