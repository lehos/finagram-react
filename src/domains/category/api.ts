import {req} from '@/services/http'

import {clCategoryMock} from './mocks'
import * as E from './entity'

export async function getList(): Promise<E.ClassifierCategory[]> {
  return req({mock: clCategoryMock})
}

export async function createClCategory(cc: E.ClassifierCategory): Promise<null> {
  return req({})
}

export async function update(stub: E.Category): Promise<null> {
  return req({})
}

export async function create(stub: E.CategoryStub, parentId: string): Promise<null> {
  return req({})
}

export async function remove(categoryId: string): Promise<null> {
  return req({})
}
