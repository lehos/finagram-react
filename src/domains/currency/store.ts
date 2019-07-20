import {store} from 'react-easy-state'

import {Currency} from '.'
import * as Api from './api'
import {arrayToMap} from '@/utils'

export const currencyStore = store({
  currencyList: [] as Currency[],
  currencyMap: {} as Record<string, Currency>,

  async init() {
    const list = await Api.getList()
    currencyStore.currencyList = list
    currencyStore.currencyMap = arrayToMap(list)
  }
})
