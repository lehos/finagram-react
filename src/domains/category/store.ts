import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {arrayToMap, arrayToMapDeep, removeElemById} from '@/utils'

import {Classifier} from '@/domains/classifier'
import {transactionStore} from '@/domains/transaction'

import * as E from './entity'
import * as A from './api'

function makeCategory(name: string, type: E.CategoryType = 'default'): E.Category {
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
    category.children.push(makeCategory(name))
  } else {
    category.children.push(
      makeCategory(`Все ${name} расхода`, 'expense'),
      makeCategory(`Все ${name} прихода`, 'income')
    )

    if (classifier.useInTransfer) {
      category.children.push(makeCategory(`Все ${name} перевода`, 'transfer'))
    }
  }

  return category
}

function calcClfCategoryMap(list: E.ClassifierCategory[]) {
  return arrayToMap(list, 'classifierId')
}

function calcCategoryMap(list: E.ClassifierCategory[]) {
  return list.reduce((acc, cur) => {
    return {...acc, ...arrayToMapDeep(cur.children)}
  }, {})
}

type CategoryMapByClassifier = Record<string, Record<string, E.Category>>

function calcCategoryByClf(list: E.ClassifierCategory[]) {
  return list.reduce(
    (acc, cur) => {
      acc[cur.classifierId] = arrayToMapDeep(cur.children)
      return acc
    },
    {} as CategoryMapByClassifier
  )
}

export const categoryStore = store({
  clfCategoryList: [] as E.ClassifierCategory[],

  // indexed by classifierId
  clfCategoryMap: {} as Record<string, E.ClassifierCategory>,
  categoryMap: {} as Record<string, E.Category>,
  categoryMapByClf: {} as CategoryMapByClassifier,

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
    parentId: string | null
  ) {
    const localParentId =
      parentId || this.clfCategoryMap[classifierId].children[0].id

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
    this._compute()
  },

  async update(category: E.Category) {
    await A.update(category)

    const obj = this.categoryMap[category.id]
    Object.assign(obj, category)
  },

  // по идее, id классификатора можно вычислить, чтоб не передавать
  async deleteCategory(categoryId: string, classifierId: string) {
    const clfCategory = this.clfCategoryMap[classifierId]

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
    this.categoryMapByClf = calcCategoryByClf(list)
  }
})
