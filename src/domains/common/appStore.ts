import { store } from 'react-easy-state'

import { currencyStore } from '@/domains/currency'
import { accountStore } from '@/domains/account'
import { classifierStore } from '@/domains/classifier'
import { categoryStore } from '@/domains/category'

// todo это не является структурными данными,
//  может стоит это грузить при переходе на соотв. страницу
import { transactionStore } from '@/domains/transaction'

export const appStore = store({
  isInitialized: false,

  currency: currencyStore,
  account: accountStore,

  async initStores() {
    await Promise.all([
      currencyStore.init(),
      accountStore.init(),
      classifierStore.init(),
      categoryStore.init(),
      transactionStore.init()
    ])
    appStore.isInitialized = true
  }
})

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.stores = {
    appStore,
    currencyStore,
    accountStore,
    classifierStore,
    categoryStore,
    transactionStore
  }
}
