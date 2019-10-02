import { store } from 'react-easy-state'
import nanoid from 'nanoid'

import { arrayToMap, removeElemImm } from '@/utils'

import { Account } from './entity'
import * as Api from './api'

export const accountStore = store({
  accountsList: [] as Account[],

  // computed
  accountsMap: {} as Record<string, Account>,

  init() {
    return this.getList()
  },

  async getList() {
    this.accountsList = await Api.getList()
    this.compute()
  },

  async create(acc: Omit<Account, 'id'>) {
    const id = nanoid()
    const newAcc = { id, ...acc }

    await Api.create(newAcc)
    this.accountsList.push(newAcc)
    this.compute()
  },

  async update(acc: Account) {
    await Api.update(acc)
    this.accountsList = this.accountsList.map(el => {
      return el.id === acc.id ? acc : el
    })
    this.compute()
  },

  async remove(acc: Account) {
    await Api.remove(acc.id)
    this.accountsList = removeElemImm(this.accountsList, acc)
    this.compute()
  },

  compute() {
    this.accountsMap = arrayToMap(this.accountsList)
  }
})
