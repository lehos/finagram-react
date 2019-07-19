import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {arrayToMap} from '@/utils'

import {categoryStore} from '@/domains/category'

import {Classifier, ClassifierStub} from '.'
import * as A from './api'

export const classifierStore = store({
  classifiers: {} as Record<string, Classifier>,

  // todo (maybe) for perf it should be cached or moved to state
  get classifiersArr(): Classifier[] {
    return Object.values(classifierStore.classifiers)
  },

  get classifierList(): Classifier[] {
    return Object.values(classifierStore.classifiers)
  },

  init() {
    return classifierStore.getList()
  },

  async getList() {
    classifierStore.classifiers = arrayToMap(await A.getList())
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

    classifierStore.classifiers[id] = classifier

    await categoryStore.createCategory(classifier)
  },

  async update(classifierStub: Required<ClassifierStub> & {id: string}) {
    await A.update(classifierStub)

    classifierStore.classifiers[classifierStub.id] = {
      ...classifierStore.classifiers[classifierStub.id],
      ...classifierStub
    }
  },

  async remove(id: string) {
    await A.remove(id)

    setTimeout(() => {
      delete classifierStore.classifiers[id]
    }, 0)
  }
})
