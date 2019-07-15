import {store} from 'react-easy-state'

import {Currency} from './currency'
import * as Api from './api'
import {arrayToMap} from '@/utils'

export const currencyStore = store({
  currencies: {} as Record<string, Currency>,

  get currenciesArr(): Currency[] {
    return Object.values(currencyStore.currencies)
  },

  async init() {
    currencyStore.currencies = arrayToMap(await Api.getList())
  }
})
