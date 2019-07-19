export function arrayToMap<T extends {id: string}>(arr: T[]): Record<string, T> {
  return arr.reduce((acc: {[key: string]: T}, cur) => {
    acc[cur.id] = cur
    return acc
  }, {})
}

type BaseTree<T> = {id: string; children?: T[]}
// todo benchmark and optimize
export function ArrayToMapDeep<T extends BaseTree<T>>(arr: T[]): Record<string, T> {
  let res: Record<string, T> = {}

  arr.forEach(el => {
    res[el.id] = el
    if (el.children) {
      res = {...res, ...ArrayToMapDeep(el.children)}
    }
  })

  return res
}

export function sleep(ms: number = 500) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
