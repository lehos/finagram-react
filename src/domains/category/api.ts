import {req} from '@/services/http'

import {clfCategoryMock} from './mocks'
import {ClassifierCategory, Category} from './entity'

export async function getList(): Promise<ClassifierCategory[]> {
  return req({mock: clfCategoryMock})
}

export async function createClfCategory(cc: ClassifierCategory): Promise<null> {
  return req({mock: null})
}

export async function update(stub: Category): Promise<null> {
  return req({mock: null})
}
