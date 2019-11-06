import { store } from 'react-easy-state'
import nanoid from 'nanoid'

import { categoryStore } from '@/domains/category'

import { Classifier } from '.'
import * as Api from './api'

export const classifierStore = store({
  classifierMap: {} as Record<string, Classifier>,

  // computed
  classifierList: [] as Classifier[],

  init() {
    return this.search()
  },

  async search() {
    this.classifierMap = await Api.search()
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

    this.classifierMap[id] = classifier
    this._compute()

    await categoryStore.createClCategory(classifier)
  },

  async update(cl: Classifier) {
    await Api.update(cl)
    this.classifierMap[cl.id] = cl
    this._compute()
  },

  async remove(cl: Classifier) {
    await Api.remove(cl.id)
    delete this.classifierMap[cl.id]
    this._compute()
  },

  get(id: string) {
    return this.classifierMap[id]
  },

  _compute() {
    this.classifierList = Object.values(this.classifierMap)
  }
})
