import {sleep} from '@/utils'

export function fakePromise<T>(arg: T, delay?: number): Promise<T> {
  return new Promise(async resolve => {
    await sleep(delay)
    resolve(arg)
  })
}
