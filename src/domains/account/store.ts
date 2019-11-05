import { store } from 'react-easy-state'
import nanoid from 'nanoid'

import { Account } from './entity'
import * as Api from './api'

export const accountStore = store({
  accountsMap: {} as Record<string, Account>,

  // computed
  // computing should be lazy
  accountsList: [] as Account[],

  init() {
    return this.search()
  },

  async search() {
    this.accountsMap = await Api.search()
    this._compute()
  },

  async create(stub: Omit<Account, 'id'>) {
    const id = nanoid()
    const newAccount = { id, ...stub }

    await Api.create(newAccount)
    this.accountsMap[id] = newAccount
    this._compute()
  },

  async update(account: Account) {
    await Api.update(account)
    this.accountsMap[account.id] = account
    this._compute()
  },

  async remove(account: Account) {
    await Api.remove(account.id)
    delete this.accountsMap[account.id]
    this._compute()
  },

  _compute() {
    this.accountsList = Object.values(this.accountsMap)
  }
})
