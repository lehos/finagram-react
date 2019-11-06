import { Dict } from '@/domains/entity'

export type CategoryType = 'income' | 'expense' | 'transfer' | 'default'

export interface Category {
  id: string
  parentId: string | null
  classifierId: string
  type: CategoryType
  name: string
  description: string
}

export type ClassifierCategory = {
  roots: Dict<true>
  categories: Dict<Category>
}

export type CategoryStub = Omit<Category, 'id'>

type CategoryTreeItem = Category & { children?: CategoryTreeItem[] }

export type CategoryTree = CategoryTreeItem[]
