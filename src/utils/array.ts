import {Tree} from '@/domains/entity'

export function arrayToMap<T extends {id: string}>(arr: T[]): Record<string, T> {
  return arr.reduce((acc: {[key: string]: T}, cur) => {
    acc[cur.id] = cur
    return acc
  }, {})
}

export function arrayToMapDeep<T extends Tree<T>>(arr: T[]): Record<string, T> {
  const res: Record<string, T> = {}

  arr.forEach(el => {
    res[el.id] = el
    if (el.children && el.children.length > 0) {
      Object.assign(res, arrayToMapDeep(el.children))
    }
  })

  return res
}

/**
 * removes found elem in place (mutates given array)
 */
export function removeElemById<T extends Tree<T>>(arr: T[], id: string): boolean {
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i]

    if (obj.id === id) {
      arr.splice(i, 1)
      return true
    }

    if (obj.children && obj.children.length > 0) {
      if (removeElemById(obj.children, id)) {
        if (obj.children.length === 0) {
          delete obj.children
        }
        return true
      }
    }
  }

  return false
}

export function removeElem<T>(arr: T[], clb: (el: T) => boolean) {
  const index = arr.findIndex(clb)

  if (index !== -1) {
    arr.splice(index, 1)
  }
}
