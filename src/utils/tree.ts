import { Dict, Tree, TreeItem } from '@/domains/entity'
import { cloneDeep } from './utils'

export function makeTreeFromMap<T extends TreeItem>(obj: Dict<T>): Tree<T> {
  const result: Tree<T> = []
  const clone = cloneDeep(obj)

  Object.values(clone).forEach(el => {
    if (el.parentId === null) {
      result.push(el)
      return
    }

    const parent = clone[el.parentId]
    parent.children = parent.children ? [...parent.children, el] : [el]
  })

  return result
}
