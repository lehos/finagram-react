import { req } from '@/services/http'
import { Dict } from '@/domains/entity'

import * as M from './mocks'
import * as E from './entity'

export async function search(): Promise<Dict<E.ClassifierCategory>> {
  return req({ mock: M.clCategoryMap })
}

export async function createClCategory(stub: E.ClassifierCategory): Promise<null> {
  return req({})
}

export async function create(stub: Omit<E.Category, 'id'>): Promise<null> {
  return req({})
}

export async function update(category: E.Category): Promise<null> {
  return req({})
}

export async function remove(category: E.Category): Promise<null> {
  return req({})
}
