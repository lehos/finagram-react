/**
 * сущность-посредник, связь классификатора и категорий
 */
export interface ClassifierCategory {
  classifierId: string
  id: string
  children: Category[]
}

export type CategoryType = 'income' | 'expense' | 'transfer' | 'default'

// изначально для рутовой категории был отдельный тип, но
// но из-за этого были сложности и я их обьединил в один
// interface RootCategory {
//   type: CategoryType
//   id: string
//   name: string
//   description: string
//   children: category[]
// }

export interface Category {
  // пока нужно только рутовой категории
  type?: CategoryType

  // рутовой пока не нужно
  parentId?: string

  id: string
  name: string

  description?: string

  // для консистентности лучше чтоб у всех было поле children
  // но для экономии памяти плодить пустые массивы не надо
  children?: Category[]
}
