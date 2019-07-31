import {fakePromise} from '@/domains/api'

import {categoryMocks} from './mocks'
import {Category, CategoryItem} from './entity'

export async function getList(): Promise<Category[]> {
  return fakePromise(categoryMocks)
}

export async function createCategory(cd: Category): Promise<null> {
  return fakePromise(null)
}

export async function update(stub: CategoryItem): Promise<null> {
  return fakePromise(null)
}
