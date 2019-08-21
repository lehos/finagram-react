import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {arrayToMap, arrayToMapDeep, removeElemById} from '@/utils'

import {Classifier} from '@/domains/classifier'
import {transactionStore} from '@/domains/transaction'

import * as E from './entity'
import * as A from './api'

function makeStub(name: string, type: E.CategoryType = 'default'): E.Category {
  return {
    id: nanoid(),
    name,
    type,
    description: '',
    children: []
  }
}

function makeClfCategory(classifier: Classifier): E.ClassifierCategory {
  const id = nanoid()
  const category: E.ClassifierCategory = {
    classifierId: classifier.id,
    id,
    children: []
  }

  const name = classifier.namePlural

  if (!classifier.split) {
    category.children.push(makeStub(name))
  } else {
    category.children.push(
      makeStub(`Все ${name} расхода`, 'expense'),
      makeStub(`Все ${name} прихода`, 'income')
    )

    if (classifier.useInTransfer) {
      category.children.push(makeStub(`Все ${name} перевода`, 'transfer'))
    }
  }

  return category
}

function calcClfCategoryMap(list: E.ClassifierCategory[]) {
  return list.reduce(
    (acc, cur) => {
      acc[cur.classifierId] = arrayToMapDeep(cur.children)
      return acc
    },
    {} as ClassifierCategoryMap
  )
}

function calcCategoryMap(list: E.ClassifierCategory[]) {
  return list.reduce((acc, cur) => {
    return {...acc, ...arrayToMapDeep(cur.children)}
  }, {})
}

type ClassifierCategoryMap = Record<string, Record<string, E.Category>>

export const categoryStore = store({
  clfCategoryList: [] as E.ClassifierCategory[],

  // computed from list

  // todo remake
  clfCategoryMap: {} as ClassifierCategoryMap,
  categoryMap: {} as Record<string, E.Category>,

  getCategory(id: string) {
    return this.clfCategoryList.find(el => el.classifierId === id)
  },

  async init() {
    this.clfCategoryList = await A.getList()
    this._compute()
  },

  async createClfCategory(classifier: Classifier) {
    const clfCategory = makeClfCategory(classifier)
    await A.createClfCategory(clfCategory)
    this.clfCategoryList.push(clfCategory)
  },

  async create(
    categoryStub: E.CategoryStub,
    classifierId: string,
    parentId?: string
  ) {
    const localParentId = parentId || this._getFirstCategoryId(classifierId)

    await A.create(categoryStub, localParentId)

    const parent = this.categoryMap[localParentId]

    if (!parent.children) {
      parent.children = []
    }

    const category: E.Category = {
      id: nanoid(),
      parentId: localParentId,
      ...categoryStub
    }

    parent.children.push(category)

    this._upList()
  },

  async update(category: E.Category) {
    await A.update(category)

    const obj = this.categoryMap[category.id]
    Object.assign(obj, category)
  },

  // по идее, id классификатора я могу и так узнать
  async deleteCategory(categoryId: string, classifierId: string) {
    const clfCategory = this.clfCategoryList.find(
      el => el.classifierId === classifierId
    )

    // not found
    if (!clfCategory) return

    // удалять сущность нужно после закрытия формы
    // todo переделать с таймаута на колбэк или что-то такое
    setTimeout(() => {
      removeElemById(clfCategory.children, categoryId)
      this._compute()
      transactionStore.clearCategory(categoryId)
    }, 0)
  },

  _upList() {
    this.clfCategoryList = [...this.clfCategoryList]
  },

  _compute() {
    const list = this.clfCategoryList
    this.clfCategoryMap = calcClfCategoryMap(list)
    this.categoryMap = calcCategoryMap(list)
  },

  _getFirstCategoryId(classifierId: string): string {
    const clfCategory = this.clfCategoryList.find(
      el => el.classifierId === classifierId
    )

    return clfCategory!.children[0].id
  }
})
