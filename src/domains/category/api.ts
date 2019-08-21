import {req} from '@/services/http'

import {clfCategoryMock} from './mocks'
import * as E from './entity'

export async function getList(): Promise<E.ClassifierCategory[]> {
  return req({mock: clfCategoryMock})
}

export async function createClfCategory(cc: E.ClassifierCategory): Promise<null> {
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
