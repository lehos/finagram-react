import {sleep} from '@/utils'

import {Classifier, ClassifierStub} from './classifier'
import {classifiersMock} from './mocks'

export function getClassifiers(): Promise<Classifier[]> {
  return new Promise(async resolve => {
    await sleep()
    resolve(classifiersMock)
  })
}

export function createClassifier(classifier: Classifier): Promise<null> {
  return new Promise(async resolve => {
    await sleep()

    resolve(null)
  })
}

export function updateClassifier(classifierStub: ClassifierStub): Promise<null> {
  return new Promise(async resolve => {
    await sleep()

    resolve(null)
  })
}

export function deleteClassifier(id: string): Promise<null> {
  return new Promise(async resolve => {
    await sleep()

    resolve(null)
  })
}
