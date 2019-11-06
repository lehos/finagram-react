export type TreeItem = {
  id: string
  parentId: string | null
  children?: TreeItem[]
}

export type Tree<T extends TreeItem = TreeItem> = T[]

export type Dict<T> = Record<string, T>
