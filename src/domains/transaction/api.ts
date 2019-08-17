import {req} from '@/services/http'

import {transactionMock} from './mocks'
import {Transaction} from './entity'

export async function getList(): Promise<Transaction[]> {
  return req({mock: transactionMock})
}
