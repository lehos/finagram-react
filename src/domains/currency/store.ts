import {store} from 'react-easy-state'

import {Currency} from '.'
import * as Api from './api'
import {arrayToMap} from '@/utils'

// base data structure - array
// computed data structure - map

export const currencyStore = store({
  currencyList: [] as Currency[],

  get currencyMap(): Record<string, Currency> {
    return arrayToMap(currencyStore.currencyList)
  },

  async init() {
    currencyStore.currencyList = await Api.getList()
  }
})
