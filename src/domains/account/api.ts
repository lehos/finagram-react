import { req } from '@/services/http'

import { Account } from '.'
import * as M from './mocks'

export function search(): Promise<Record<string, Account>> {
  return req({ mock: M.accounts })
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
