import { req } from '@/services/http'
import { Dict } from '@/domains/entity'

import * as M from './mocks'
import { Transaction } from './entity'

export async function search(): Promise<Dict<Transaction>> {
  return req({ mock: M.transactions })
}

export async function clearCategory(
  classifierId: string,
  categoryId: string
): Promise<null> {
  return req({ mock: null })
}
