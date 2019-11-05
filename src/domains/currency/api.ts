import { req } from '@/services/http'

import * as M from './mocks'
import { Currency } from './entity'

export async function getList(): Promise<Record<string, Currency>> {
  return req({ mock: M.currencies })
}
