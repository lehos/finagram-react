import {sleep} from '@/utils'

import {Account} from './account'
import {accountsMock} from './mocks'

export function getAccounts(): Promise<Account[]> {
  return new Promise(async resolve => {
    await sleep()
    resolve(accountsMock)
  })
}

export function createAccount(acc: Account): Promise<null> {
  return new Promise(async resolve => {
    await sleep()

    resolve(null)
  })
}

export function updateAccount(acc: Account): Promise<null> {
  return new Promise(async resolve => {
    await sleep()

    resolve(null)
  })
}

export function deleteAccount(id: string): Promise<null> {
  return new Promise(async resolve => {
    await sleep()

    resolve(null)
  })
}
