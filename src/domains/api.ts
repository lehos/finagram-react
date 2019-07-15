import {sleep} from '@/utils';

export function fakePromise<T>(arg: T): Promise<T> {
  return new Promise(async resolve => {
    await sleep()
    resolve(arg)
  })
}
