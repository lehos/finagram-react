import { store } from 'react-easy-state'
import nanoid from 'nanoid'

import { arrayToMap } from '@/utils'

import { Account } from './entity'
import * as A from './api'

export const accountStore = store({
  accountsMap: {} as Record<string, Account>,

  // todo (maybe) for perf it should be cached or moved to state
  get accountsList(): Account[] {
    return Object.values(this.accountsMap)
  },

  init() {
    return this.getList()
  },

  async getList() {
    this.accountsMap = arrayToMap(await A.getList())
  },

  async create(acc: Omit<Account, 'id'>) {
    const id = nanoid()

    const newAcc = { id, ...acc }
    await A.create(newAcc)

    this.accountsMap[id] = newAcc
  },

  async update(acc: Account) {
    await A.update(acc)

    this.accountsMap[acc.id] = {
      ...this.accountsMap[acc.id],
      ...acc
    }
  },

  async delete(id: string) {
    await A.remove(id)

    // todo get rid of this dirty hack
    setTimeout(() => {
      delete this.accountsMap[id]
    }, 0)
  }
})
