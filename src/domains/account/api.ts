import {fakePromise} from '@/domains/api'

import {Account} from '.'
import {accountsMock} from './mocks'

export function getList(): Promise<Account[]> {
  return fakePromise(accountsMock)
}

export function create(acc: Account): Promise<null> {
  return fakePromise(null)
}

export function update(acc: Account): Promise<null> {
  return fakePromise(null)
}

export function remove(id: string): Promise<null> {
  return fakePromise(null)
}
