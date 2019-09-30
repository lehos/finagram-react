import { store } from 'react-easy-state'
import nanoid from 'nanoid'

import * as U from '@/utils'

import { Classifier } from '@/domains/classifier'
import { transactionStore } from '@/domains/transaction'

import * as E from './entity'
import * as A from './api'

function makeRootCategory(
  name: string,
  type: E.CategoryType = 'default'
): E.Category {
  return {
    id: nanoid(),
    name,
    type,
    description: '',
    parentId: null,
    children: []
  }
}

function makeClCategory(classifier: Classifier): E.ClassifierCategory {
  const id = nanoid()
  const category: E.ClassifierCategory = {
    classifierId: classifier.id,
    id,
    children: []
  }

  const name = classifier.namePlural

  if (!classifier.split) {
    category.children.push(makeRootCategory(name))
  } else {
    category.children.push(
      makeRootCategory(`Все ${name} расхода`, 'expense'),
      makeRootCategory(`Все ${name} прихода`, 'income')
    )

    if (classifier.useInTransfer) {
      category.children.push(makeRootCategory(`Все ${name} перевода`, 'transfer'))
    }
  }

  return category
}

function calcClCategoryMap(list: E.ClassifierCategory[]) {
  return U.arrayToMap(list, 'classifierId')
}

function calcCategoryMap(list: E.ClassifierCategory[]) {
  return list.reduce((acc, cur) => {
    return { ...acc, ...U.arrayToMapDeep(cur.children) }
  }, {})
}

type CategoryMapByClassifier = Record<string, Record<string, E.Category>>

function calcCategoryByCl(list: E.ClassifierCategory[]) {
  return list.reduce(
    (acc, cur) => {
      acc[cur.classifierId] = U.arrayToMapDeep(cur.children)
      return acc
    },
    {} as CategoryMapByClassifier
  )
}

export const categoryStore = store({
  clCategoryList: [] as E.ClassifierCategory[],

  // indexed by classifierId
  clCategoryMap: {} as Record<string, E.ClassifierCategory>,
  categoryMap: {} as Record<string, E.Category>,
  categoryMapByCl: {} as CategoryMapByClassifier,

  async init() {
    this.clCategoryList = await A.getList()
    this._compute()
  },

  async createClCategory(classifier: Classifier) {
    const clCategory = makeClCategory(classifier)
    await A.createClCategory(clCategory)
    this.clCategoryList.push(clCategory)
  },

  async create(categoryStub: E.CategoryStub) {
    await A.create(categoryStub)

    const parent = this.categoryMap[categoryStub.parentId!]

    if (!parent.children) {
      parent.children = []
    }

    const category: E.Category = {
      id: nanoid(),
      ...categoryStub
    }

    parent.children.push(category)

    this._upList()
    this._compute()
  },

  async update(category: E.Category) {
    await A.update(category)

    const obj = this.categoryMap[category.id]

    // изменился родитель
    if (obj.parentId !== category.parentId && category.parentId != null) {
      this._move(obj, category.parentId)
    }

    Object.assign(obj, category)
  },

  // по идее, id классификатора можно вычислить, чтоб не передавать
  async deleteCategory(categoryId: string, classifierId: string) {
    const clCategory = this.clCategoryMap[classifierId]

    // удалять сущность нужно после закрытия формы
    // todo переделать с таймаута на колбэк или что-то такое
    setTimeout(() => {
      U.removeElemById(clCategory.children, categoryId)
      this._compute()
      transactionStore.clearCategory(categoryId)
    }, 0)
  },

  _move(category: E.Category, newId: string) {
    const oldParent = this.categoryMap[category.parentId!]
    U.removeElem(oldParent.children!, { el: category })

    if (oldParent.children!.length === 0) {
      delete oldParent.children
    }

    const newParent = this.categoryMap[newId]

    if (!newParent.children) {
      newParent.children = []
    }

    newParent.children.push(category)
    this._upList()
    this._compute()
  },

  _upList() {
    this.clCategoryList = [...this.clCategoryList]
  },

  _compute() {
    const list = this.clCategoryList
    this.clCategoryMap = calcClCategoryMap(list)
    this.categoryMap = calcCategoryMap(list)
    this.categoryMapByCl = calcCategoryByCl(list)
  }
})
