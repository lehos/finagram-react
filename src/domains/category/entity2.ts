type CategoryType = 'income' | 'expense' | 'transfer' | 'default'

export interface RootCategory {
  id: string
  kind: 'root'
  type: CategoryType
  name: string
  description: string
}

export interface Category {
  id: string
  kind: 'common'
  parentId: string
  name: string
  description: string
}
