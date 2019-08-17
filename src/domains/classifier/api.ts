import {req} from '@/services/http'

import {Classifier, ClassifierStub} from '.'
import {classifiersMock} from './mocks'

export function getList(): Promise<Classifier[]> {
  return req({mock: classifiersMock})
}

export function create(classifier: Classifier): Promise<null> {
  return req({mock: null})
}

export function update(classifierStub: ClassifierStub): Promise<null> {
  return req({mock: null})
}

export function remove(id: string): Promise<null> {
  return req({mock: null})
}
