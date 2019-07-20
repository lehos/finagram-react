import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {arrayToMap} from '@/utils'

import {categoryStore} from '@/domains/category'

import {Classifier, ClassifierStub} from '.'
import * as Api from './api'

export const classifierStore = store({
  classifierList: [] as Classifier[],
  classifierMap: {} as Record<string, Classifier>,

  init() {
    return classifierStore.getList()
  },

  async getList() {
    const list = await Api.getList()
    classifierStore.classifierList = list
    classifierStore.classifierMap = arrayToMap(list)
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

    await Api.create(classifier)

    classifierStore.classifierMap[id] = classifier
    classifierStore.classifierList.push(classifier)

    await categoryStore.createCategory(classifier)
  },

  async update(classifierStub: Required<ClassifierStub> & {id: string}) {
    await Api.update(classifierStub)

    const obj = classifierStore.classifierMap[classifierStub.id]
    Object.assign(obj, classifierStub)

    // hacky way to tell subscribed view to re-render
    classifierStore.classifierList = [...classifierStore.classifierList]
  },

  async remove(id: string) {
    await Api.remove(id)

    const {classifierMap, classifierList} = classifierStore

    setTimeout(() => {
      delete classifierMap[id]
      classifierList.splice(classifierList.findIndex(el => el.id === id), 1)
    }, 0)
  }
})
