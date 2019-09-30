import { req } from '@/services/http'

import { Account } from '.'
import { accountsMock } from './mocks'

export function getList(): Promise<Account[]> {
  return req({ mock: accountsMock })
}

export function create(acc: Account): Promise<null> {
  return req({ mock: null })
}

export function update(acc: Account): Promise<null> {
  return req({ mock: null })
}

export function remove(id: string): Promise<null> {
  return req({ mock: null })
}
