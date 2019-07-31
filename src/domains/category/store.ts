import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {arrayToMapDeep} from '@/utils'

import {Classifier} from '@/domains/classifier'

import * as T from './entity'
import * as A from './api'

function makeStub(name: string, type: T.CategoryType = 'default'): T.CategoryItem {
  return {
    id: nanoid(),
    name,
    type,
    description: '',
    children: []
  }
}

function populateCategory(classifier: Classifier): T.Category {
  const id = nanoid()
  const category: T.Category = {
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

type CategoryMap = Record<string, Record<string, T.CategoryItem>>

export const categoryStore = store({
  categoryList: [] as T.Category[],

  // computed
  categoryMap: {} as CategoryMap,
  categoryItemMap: {} as Record<string, T.CategoryItem>,

  getCategory(id: string) {
    return categoryStore.categoryList.find(el => el.classifierId === id)
  },

  async init() {
    const list = await A.getList()
    categoryStore.categoryList = list

    categoryStore.categoryMap = list.reduce(
      (acc, cur) => {
        acc[cur.classifierId] = arrayToMapDeep(cur.children)
        return acc
      },
      {} as CategoryMap
    )

    categoryStore.categoryItemMap = list.reduce((acc, cur) => {
      return {...acc, ...arrayToMapDeep(cur.children)}
    }, {})
  },

  async createCategory(classifier: Classifier) {
    const category = populateCategory(classifier)

    await A.createCategory(category)

    categoryStore.categoryList.push(category)
  },

  async update(categoryItem: T.CategoryItem) {
    await A.update(categoryItem)

    const obj = categoryStore.categoryItemMap[categoryItem.id]
    Object.assign(obj, categoryItem)
  }
})
