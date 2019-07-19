import {store} from 'react-easy-state'
import nanoid from 'nanoid'

import {Classifier} from '@/domains/classifier'

import * as T from './entity'
import * as A from './api'

function makeStub(
  parentId: string,
  name: string,
  type: T.CategoryRootItemType = 'default'
): T.CategoryRootItem {
  return {
    id: nanoid(),
    parentId,
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

  if (!classifier.split) {
    category.children.push(makeStub(classifier.namePlural, id))
  } else {
    category.children.push(
      makeStub(id, `Все ${classifier.namePlural} расхода`, 'expense'),
      makeStub(id, `Все ${classifier.namePlural} прихода`, 'income')
    )

    if (classifier.useInTransfer) {
      category.children.push(
        makeStub(id, `Все ${classifier.namePlural} перевода`, 'transfer')
      )
    }
  }

  return category
}

export const categoryStore = store({
  categoryList: [] as T.Category[],
  categoryItemMap: {} as Record<string, T.CategoryRootItemType>,

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
