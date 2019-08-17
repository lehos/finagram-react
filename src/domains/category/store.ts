import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {arrayToMapDeep} from '@/utils'

import {Classifier} from '@/domains/classifier'

import * as T from './entity'
import * as Api from './api'

function makeStub(name: string, type: T.CategoryType = 'default'): T.Category {
  return {
    id: nanoid(),
    name,
    type,
    description: '',
    children: []
  }
}

function makeClfCategory(classifier: Classifier): T.ClassifierCategory {
  const id = nanoid()
  const category: T.ClassifierCategory = {
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

function calcClfCategoryMap(list: T.ClassifierCategory[]) {
  return list.reduce(
    (acc, cur) => {
      acc[cur.classifierId] = arrayToMapDeep(cur.children)
      return acc
    },
    {} as ClassifierCategoryMap
  )
}

function calcCategoryMap(list: T.ClassifierCategory[]) {
  return list.reduce((acc, cur) => {
    return {...acc, ...arrayToMapDeep(cur.children)}
  }, {})
}

type ClassifierCategoryMap = Record<string, Record<string, T.Category>>

export const categoryStore = store({
  // todo очень длинно, может назвать как-то типа clfCategoryList
  classifierCategoryList: [] as T.ClassifierCategory[],

  // computed from list
  classifierCategoryMap: {} as ClassifierCategoryMap,
  categoryMap: {} as Record<string, T.Category>,

  getCategory(id: string) {
    return categoryStore.classifierCategoryList.find(el => el.classifierId === id)
  },

  async init() {
    categoryStore.classifierCategoryList = await Api.getList()
    categoryStore._compute()
  },

  async createClassifierCategory(classifier: Classifier) {
    const clfCategory = makeClfCategory(classifier)
    await Api.createClfCategory(clfCategory)
    categoryStore.classifierCategoryList.push(clfCategory)
  },

  async update(category: T.Category) {
    await Api.update(category)

    const obj = categoryStore.categoryMap[category.id]
    Object.assign(obj, category)
  },

  // async remove(categoryId: string) {},

  _compute() {
    const list = categoryStore.classifierCategoryList
    categoryStore.classifierCategoryMap = calcClfCategoryMap(list)
    categoryStore.categoryMap = calcCategoryMap(list)
  }
})
