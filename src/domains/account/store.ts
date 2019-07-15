import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {arrayToMap} from '@/utils'

import {Account} from './account'
import * as A from './api'

export const accountStore = store({
  accounts: {} as Record<string, Account>,

  // todo (maybe) for perf it should be cached or moved to state
  get accountsArr(): Account[] {
    return Object.values(accountStore.accounts)
  },

  init() {
    return accountStore.getList()
  },

  async getList() {
    accountStore.accounts = arrayToMap(await A.getList())
  },

  async create(acc: Omit<Account, 'id'>) {
    const id = nanoid()

    const newAcc = {id, ...acc}
    await A.create(newAcc)

    accountStore.accounts[id] = newAcc
  },

  async update(acc: Account) {
    await A.update(acc)

    accountStore.accounts[acc.id] = {
      ...accountStore.accounts[acc.id],
      ...acc
    }
  },

  async remove(id: string) {
    await A.remove(id)

    setTimeout(() => {
      delete accountStore.accounts[id]
    }, 0)
  }
})
