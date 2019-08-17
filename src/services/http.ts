import {sleep} from '@/utils'

function fakeReq<T>(arg: T, delay?: number): Promise<T> {
  return new Promise(async resolve => {
    await sleep(delay)
    resolve(arg)
  })
}

type ReqParams<T> = {
  mock?: T
  delay?: number
}

export function req<T>(params: ReqParams<T>): Promise<T> {
  return fakeReq(params.mock as T, params.delay)
}
