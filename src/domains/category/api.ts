import {fakePromise} from '@/domains/api'

import {categoryMocks} from './mocks'
import {Category} from './entity'

export async function getList(): Promise<Category[]> {
  return fakePromise(categoryMocks)
}

export async function createCategory(cd: Category): Promise<null> {
  return fakePromise(null)
}
