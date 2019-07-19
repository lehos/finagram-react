export interface Category {
  classifierId: string
  id: string
  children: CategoryRootItem[]
}

export type CategoryRootItemType = 'income' | 'expense' | 'transfer' | 'default'

export interface CategoryRootItem extends CategoryItem {
  children: CategoryItem[]
  type: CategoryRootItemType
}

export interface CategoryItem {
  parentId: string
  id: string
  name: string
  description?: string
  children?: CategoryItem[]
}
