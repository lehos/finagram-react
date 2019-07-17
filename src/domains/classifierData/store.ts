import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {Classifier} from '@/domains/classifier'

import {ClassifierData, ClassifierDataItem} from '.'
import * as A from './api'

function getCDIStub(name: string, parentId: string): ClassifierDataItem {
  return {
    id: nanoid(),
    parentId,
    name,
    description: '',
    children: []
  }
}

function populateClassifierData(classifier: Classifier): ClassifierData {
  const id = nanoid()
  const classifierData: ClassifierData = {
    classifierId: classifier.id,
    id,
    children: []
  }

  if (!classifier.split) {
    classifierData.children.push(getCDIStub(classifier.namePlural, id))
  } else {
    classifierData.children.push(
      getCDIStub(`Все ${classifier.namePlural} расхода`, id),
      getCDIStub(`Все ${classifier.namePlural} прихода`, id)
    )

    if (classifier.useInTransfer) {
      classifierData.children.push(
        getCDIStub(`Все ${classifier.namePlural} перевода`, id)
      )
    }
  }
  return classifierData
}

export const classifierDataStore = store({
  classifierDataList: [] as ClassifierData[],

  getClassifierData(classifierId: string) {
    return classifierDataStore.classifierDataList.find(
      el => el.classifierId === classifierId
    )
  },

  async init() {
    classifierDataStore.classifierDataList = await A.getList()
  },

  async createClassifierData(classifier: Classifier) {
    const classifierData = populateClassifierData(classifier)

    await A.createClassifierData(classifierData)

    classifierDataStore.classifierDataList.push(classifierData)
  }
})
