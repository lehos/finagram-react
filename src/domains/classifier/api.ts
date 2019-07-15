import {fakePromise} from '@/domains/api';

import {Classifier, ClassifierStub} from './classifier'
import {classifiersMock} from './mocks'

export function getList(): Promise<Classifier[]> {
  return fakePromise(classifiersMock)
}

export function create(classifier: Classifier): Promise<null> {
  return fakePromise(null)
}

export function update(classifierStub: ClassifierStub): Promise<null> {
  return fakePromise(null)
}

export function remove(id: string): Promise<null> {
  return fakePromise(null)
}
