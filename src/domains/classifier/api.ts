import {Classifier} from './classifier'
import {classifiersMock} from './mocks'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getClassifiers(): Promise<Classifier[]> {
  return new Promise(async resolve => {
    await sleep(1000)
    resolve(classifiersMock)
  })
}

export function createClassifier(classifier: Classifier): Promise<null> {
  return new Promise(async resolve => {
    await sleep(1000)

    resolve(null)
  })
}

export function updateClassifier(): Promise<null> {
  return new Promise(async resolve => {
    await sleep(5000)

    resolve(null)
  })
}

export function deleteClassifier(id: string): Promise<null> {
  return new Promise(async resolve => {
    await sleep(5000)

    resolve(null)
  })
}
