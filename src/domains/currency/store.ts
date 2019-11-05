import { store } from 'react-easy-state'

import { Currency } from '.'
import * as Api from './api'

export const currencyStore = store({
  currencyMap: {} as Record<string, Currency>,
  currencyList: [] as Currency[],

  async init() {
    const list = await Api.getList()
    currencyStore.currencyMap = list
    currencyStore.currencyList = Object.values(list)
  }
})
