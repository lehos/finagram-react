import {fakePromise} from '@/domains/api'

import {classifierDataMocks} from './mocks'
import {ClassifierData} from './entity'

export async function getList(): Promise<ClassifierData[]> {
  return fakePromise(classifierDataMocks)
}

export async function createClassifierData(cd: ClassifierData): Promise<null> {
  return fakePromise(null)
}
