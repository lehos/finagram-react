import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {arrayToMap} from '@/utils'

import {Classifier, ClassifierStub} from './classifier'
import * as A from './api'

export const classifierStore = store({
  classifiers: {} as Record<string, Classifier>,

  get classifiersIds(): string[] {
    return Object.keys(classifierStore.classifiers)
  },

  // todo (maybe) for perf it should be cached or moved to state
  get classifiersArr(): Classifier[] {
    return Object.values(classifierStore.classifiers)
  },

  async fetchClassifiers() {
    classifierStore.classifiers = arrayToMap(await A.getClassifiers())
  },

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

    classifierStore.classifiers[id] = classifier
  },

  async update(classifierStub: Required<ClassifierStub> & {id: string}) {
    await A.updateClassifier(classifierStub)

    classifierStore.classifiers[classifierStub.id] = {
      ...classifierStore.classifiers[classifierStub.id],
      ...classifierStub
    }
  },

  async delete(id: string) {
    await A.deleteClassifier(id)

    setTimeout(() => {
      delete classifierStore.classifiers[id]
    }, 0)
  }
})
