/**
 * Классификатор
 * https://dervish.ru/docs/cl/
 */

export interface Classifier {
  id: string

  name: string
  namePlural: string

  // разделять по типу операции
  // true - два дерева, одно – приходы, другое – расходы
  // false - одно дерево
  split: boolean

  // использовать в переводах
  useInTransfer: boolean

  // данные отдельных классификаторов
  // не помню, почему это тут, лучше это убрать ацуда
  data: ClassifierDataItem[] | null
}

export type ClassifierStub = {
  name: string
  namePlural?: string
  split?: boolean
  useInTransfer?: boolean
}

export interface ClassifierDataItem {
  id: string
  parentId: number
  name: string
  description?: string
  children?: ClassifierDataItem[]

  // состояние открытости для удобства юзера лучше хранить
  isOpened?: boolean
}
