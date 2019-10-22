interface ClassifierCategory {
  classifierId: string
  id: string
}

type CategoryType = 'income' | 'expense' | 'transfer' | 'default'

interface RootCategory {
  id: string
  clCategoryId: string
  type: CategoryType
  description: string
}

interface Category {
  id: string
  parentId: string
  description: string
}

interface ClassifierCategoryTree extends ClassifierCategory {
  children: RootCategoryTree[]
}

interface RootCategoryTree extends RootCategory {
  children: CategoryTree[]
}

interface CategoryTree extends Category {
  children?: CategoryTree[]
}
