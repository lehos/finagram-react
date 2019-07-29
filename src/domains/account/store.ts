import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {arrayToMap} from '@/utils'

import {Account} from './entity'
import * as A from './api'

export const accountStore = store({
  accountsMap: {} as Record<string, Account>,

  // todo (maybe) for perf it should be cached or moved to state
  get accountsList(): Account[] {
    return Object.values(accountStore.accountsMap)
  },

  init() {
    return accountStore.getList()
  },

  async getList() {
    accountStore.accountsMap = arrayToMap(await A.getList())
  },

  async create(acc: Omit<Account, 'id'>) {
    const id = nanoid()

    const newAcc = {id, ...acc}
    await A.create(newAcc)

    accountStore.accountsMap[id] = newAcc
  },

  async update(acc: Account) {
    await A.update(acc)

    accountStore.accountsMap[acc.id] = {
      ...accountStore.accountsMap[acc.id],
      ...acc
    }
  },

  async remove(id: string) {
    await A.remove(id)

    setTimeout(() => {
      delete accountStore.accountsMap[id]
    }, 0)
  }
})
