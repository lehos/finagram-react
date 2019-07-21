import {fakePromise} from '@/domains/api'

import {currencyMocks} from './mocks'
import {Currency} from '.'

export async function getList(): Promise<Currency[]> {
  return fakePromise(currencyMocks, 1000)
}