import {fakePromise} from '@/domains/api'

import {transactionMocks} from './mocks'
import {Transaction} from './entity'

export async function getList(): Promise<Transaction[]> {
  return fakePromise(transactionMocks)
}
