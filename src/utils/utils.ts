import nanoid from 'nanoid'

export function sleep(ms: number = 100) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function makeId() {
  return nanoid()
}

export function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
