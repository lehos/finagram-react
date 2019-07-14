import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {arrayToMap} from '@/utils'

import {Classifier, ClassifierStub} from './classifier'
import * as A from './api'

export const classifierStore = store({
  classifiers: [] as Classifier[],

  get classifiersMap(): Record<string, Classifier> {
    return arrayToMap(classifierStore.classifiers)
  },

  async getClassifiers() {
    classifierStore.classifiers = await A.getClassifiers()
  },

  // todo this should be blocked unless classifiers are loaded
  async create(classifierStub: ClassifierStub) {
    const id = nanoid()
    const {name, namePlural, split, useInTransfer} = classifierStub
    const classifier = {
      id,
      data: null,
      name,
      namePlural: namePlural || name,
      split: !!split,
      useInTransfer: !!useInTransfer
    }

    await A.createClassifier(classifier)

    classifierStore.classifiers.push(classifier)
  },

  // todo this should be blocked unless classifiers are loaded
  async update(classifierStub: Required<ClassifierStub> & {id: string}) {
    const {name, namePlural, split, useInTransfer} = classifierStub

    const classifier = classifierStore.classifiersMap[classifierStub.id]

    // mutating classifier fields to preserve link to its object
    // TODO: think about is, maybe it's not the best idea
    // other option is to have classifiersMap directly in store (not in getter)
    classifier.name = name
    classifier.namePlural = namePlural
    classifier.split = split
    classifier.useInTransfer = useInTransfer

    await A.updateClassifier()
  },

  // todo this should be blocked unless classifiers are loaded
  async delete(id: string) {
    const {classifiers} = classifierStore
    await A.deleteClassifier(id)
    classifiers.splice(classifiers.findIndex(item => item.id === id), 1)
  }
})
