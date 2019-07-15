import {currencyStore} from '@/domains/currency'
import {accountStore} from '@/domains/account'
import {classifierStore} from '@/domains/classifier'

export async function initStore() {
  await Promise.all([currencyStore.init(), accountStore.init(), classifierStore.init()])
}
