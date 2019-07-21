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
}

export type ClassifierStub = {
  name: string
  namePlural?: string
  split?: boolean
  useInTransfer?: boolean
}