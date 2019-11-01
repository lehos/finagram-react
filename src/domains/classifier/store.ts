import { store } from 'react-easy-state'
import nanoid from 'nanoid'

import { arrayToMap, removeElemImm } from '@/utils'
import { categoryStore } from '@/domains/category'

import { Classifier } from '.'
import * as Api from './api'

export const classifierStore = store({
  classifierList: [] as Classifier[],

  // computed
  classifierMap: {} as Record<string, Classifier>,

  init() {
    return this.getList()
  },

  async getList() {
    this.classifierList = await Api.getList()
    this._compute()
  },

  async create(cl: Omit<Classifier, 'id'>) {
    const id = nanoid()
    const classifier = {
      id,
      ...cl,
      namePlural: cl.namePlural || cl.name
    }

    await Api.create(classifier)

    this.classifierList.push(classifier)
    this._compute()

    await categoryStore.createClCategory(classifier)
  },

  async update(cl: Classifier) {
    await Api.update(cl)
    this.classifierList = this.classifierList.map(el => (el.id === cl.id ? cl : el))
    this._compute()
  },

  async remove(cl: Classifier) {
    await Api.remove(cl.id)
    this.classifierList = removeElemImm(this.classifierList, cl)
    this._compute()
  },

  _compute() {
    this.classifierMap = arrayToMap(this.classifierList)
  }
})