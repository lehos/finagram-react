import { req } from '@/services/http'

import { currencyMocks } from './mocks'
import { Currency } from './entity'

export async function getList(): Promise<Currency[]> {
  return req({ mock: currencyMocks })
}
