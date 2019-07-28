export interface Category {
  classifierId: string
  id: string
  children: CategoryItem[]
}

export type CategoryType = 'income' | 'expense' | 'transfer' | 'default'

export interface CategoryItem {
  // нужно только рутовой категории
  type?: CategoryType

  // рутовой пока не нужно
  parentId?: string

  id: string
  name: string
  description?: string

  children?: CategoryItem[]
}
