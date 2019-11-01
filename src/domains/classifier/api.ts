import { req } from '@/services/http'

import { Classifier } from '.'
import { classifiersMock } from './mocks'

export function getList(): Promise<Classifier[]> {
  return req({ mock: classifiersMock })
}

export function create(cl: Classifier): Promise<null> {
  return req({ mock: null })
}

export function update(cl: Classifier): Promise<null> {
  return req({ mock: null })
}

export function remove(id: string): Promise<null> {
  return req({ mock: null })
}