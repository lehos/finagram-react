import { req } from '@/services/http'
import { Dict } from '@/utils'

import { Classifier } from '.'
import * as M from './mocks'

export function search(): Promise<Dict<Classifier>> {
  return req({ mock: M.classifiers })
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
