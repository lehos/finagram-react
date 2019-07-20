import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {arrayToMap} from '@/utils'

import {categoryStore} from '@/domains/category'

import {Classifier, ClassifierStub} from '.'
import * as A from './api'

// base data structure - map
// computed data structure - array

export const classifierStore = store({
  classifierMap: {} as Record<string, Classifier>,

  get classifierList(): Classifier[] {
    return Object.values(classifierStore.classifierMap)
  },

  init() {
    return classifierStore.getList()
  },

  async getList() {
    classifierStore.classifierMap = arrayToMap(await A.getList())
  },

  async create(classifierStub: ClassifierStub) {
    const id = nanoid()
    const {name, namePlural, split, useInTransfer} = classifierStub
    const classifier = {
      id,
      name,
      namePlural: namePlural || name,
      split: !!split,
      useInTransfer: !!useInTransfer
    }

    await A.create(classifier)

    classifierStore.classifierMap[id] = classifier

    await categoryStore.createCategory(classifier)
  },

  async update(classifierStub: Required<ClassifierStub> & {id: string}) {
    await A.update(classifierStub)

    classifierStore.classifierMap[classifierStub.id] = {
      ...classifierStore.classifierMap[classifierStub.id],
      ...classifierStub
    }
  },

  async remove(id: string) {
    await A.remove(id)

    setTimeout(() => {
      delete classifierStore.classifierMap[id]
    }, 0)
  }
})
