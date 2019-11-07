import { store } from 'react-easy-state'

import * as U from '@/utils'
import { Classifier } from '@/domains/classifier'
import { Dict } from '@/domains/entity'

import * as E from './entity'
import * as A from './api'

// not pure, mutates given param clCategory
function addRootCategory(clCategory: E.ClassifierCategory, classifierId: string) {
  return (name: string, type: E.CategoryType = 'default') => {
    const id = U.makeId()
    const rootCategory: E.Category = {
      description: '',
      parentId: null,
      classifierId,
      name,
      type,
      id
    }

    clCategory.roots[id] = true
    clCategory.categories[id] = rootCategory
  }
}

function makeClCategory(classifier: Classifier): E.ClassifierCategory {
  const { id, namePlural } = classifier
  const clCategory: E.ClassifierCategory = {
    roots: {},
    categories: {}
  }
  const addRoot = addRootCategory(clCategory, id)

  if (!classifier.splitable) {
    addRoot(namePlural)
  } else {
    addRoot(`Все ${namePlural} прихода`, 'income')
    addRoot(`Все ${namePlural} расхода`, 'expense')

    if (classifier.useInTransfer) {
      addRoot(`Все ${namePlural} перевода`, 'transfer')
    }
  }

  return clCategory
}

export const categoryStore = store({
  clCategoryMap: {} as Dict<E.ClassifierCategory>,

  // computed
  // by classifierId
  categoryTreeMap: {} as Dict<E.CategoryTree>,

  async init() {
    this.clCategoryMap = await A.search()
    this._compute()
  },

  async createClCategory(classifier: Classifier) {
    const clCategory = makeClCategory(classifier)
    await A.createClCategory(clCategory)
    this.clCategoryMap[classifier.id] = clCategory
    this._compute()
  },

  async create(stub: E.CategoryStub) {
    await A.create(stub)

    const id = U.makeId()

    if (stub.parentId === null) {
      this.clCategoryMap[stub.classifierId].roots[id] = true
    }

    this.clCategoryMap[stub.classifierId].categories[id] = {
      id,
      ...stub
    }

    this._compute()
  },

  get(classifierId: string, categoryId: string) {
    return this.clCategoryMap[classifierId].categories[categoryId]
  },

  getCategoryTree(classifierId: string) {
    return this.categoryTreeMap[classifierId]
  },

  async update(category: E.Category) {
    await A.update(category)

    this.clCategoryMap[category.classifierId].categories[category.id] = category

    this._compute()
  },

  // todo запретить удаление корневых разделенных категорий
  // todo очищать удаленные категории в операциях
  async remove(category: E.Category) {
    this._removeItem(category)
    this._compute()
  },

  _removeItem(category: E.Category) {
    const { classifierId, id, parentId } = category
    if (parentId === null) {
      delete this.clCategoryMap[classifierId].roots[id]
    }
    delete this.clCategoryMap[classifierId].categories[id]
    this._removeSubTree(category)
  },

  _removeSubTree(category: E.Category) {
    const { classifierId, id } = category
    Object.values(this.clCategoryMap[classifierId].categories)
      .filter(el => el.parentId === id)
      .forEach(el => {
        this._removeItem(el)
      })
  },

  _compute() {
    Object.keys(this.clCategoryMap).forEach(id => {
      this.categoryTreeMap[id] = U.makeTreeFromMap(this.clCategoryMap[id].categories)
    })
  }
})
