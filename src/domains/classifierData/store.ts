import {store} from 'react-easy-state'

import {ClassifierData} from './entity'
import * as Api from './api'

export const classifierDataStore = store({
  classifierDataList: [] as ClassifierData[],

  getClassifierData(id: string) {
    return classifierDataStore.classifierDataList.find(el => el.id === id)
  },

  async init() {
    classifierDataStore.classifierDataList = await Api.getList()
  }
})
