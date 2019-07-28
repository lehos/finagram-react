import {store} from 'react-easy-state'
import nanoid from 'nanoid'

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

export const categoryStore = store({
  categoryList: [] as T.Category[],
  categoryMap: {} as Record<string, T.CategoryType>,

  getCategoryItemMap(classifierId: string) {
    // const category
  },

  getCategory(id: string) {
    return categoryStore.categoryList.find(el => el.classifierId === id)
  },

  async init() {
    categoryStore.categoryList = await A.getList()
  },

  async createCategory(classifier: Classifier) {
    const category = populateCategory(classifier)

    await A.createCategory(category)

    categoryStore.categoryList.push(category)
  }
})
