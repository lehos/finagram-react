// надо переосмыслить
type CategoryType = 'income' | 'expense' | 'transfer' | 'default'

export interface RootCategory {
  kind: 'root'
  id: string
  type: CategoryType
  name: string
  description: string
}

export interface Category {
  kind: 'common'
  id: string
  parentId: string
  name: string
  description: string
}
