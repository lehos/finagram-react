import {currencyStore} from '@/domains/currency'
import {accountStore} from '@/domains/account'
import {classifierStore} from '@/domains/classifier'
import {classifierDataStore} from '@/domains/classifierData'

export async function initStores() {
  await Promise.all([
    currencyStore.init(),
    accountStore.init(),
    classifierStore.init(),
    classifierDataStore.init()
  ])
}
