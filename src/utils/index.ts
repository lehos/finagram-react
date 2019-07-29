export function arrayToMap<T extends {id: string}>(arr: T[]): Record<string, T> {
  return arr.reduce((acc: {[key: string]: T}, cur) => {
    acc[cur.id] = cur
    return acc
  }, {})
}

type BaseTree<T> = {id: string; children?: T[]}
// todo benchmark and optimize
export function arrayToMapDeep<T extends BaseTree<T>>(arr: T[]): Record<string, T> {
  let res: Record<string, T> = {}

  arr.forEach(el => {
    res[el.id] = el
    if (el.children) {
      res = {...res, ...arrayToMapDeep(el.children)}
    }
  })

  return res
}

export function sleep(ms: number = 100) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
