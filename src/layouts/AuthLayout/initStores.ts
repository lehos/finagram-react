import {currencyStore} from '@/domains/currency'
import {accountStore} from '@/domains/account'
import {classifierStore} from '@/domains/classifier'
import {categoryStore} from '@/domains/category'

// todo это не является структурными данными,
//  может стоит это грузить при переходе на соотв. страницу
import {transactionStore} from '@/domains/transaction'

export async function initStores() {
  await Promise.all([
    currencyStore.init(),
    accountStore.init(),
    classifierStore.init(),
    categoryStore.init(),
    transactionStore.init()
  ])
}
