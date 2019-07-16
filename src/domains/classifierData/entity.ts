export interface ClassifierData {
  classifierId: string
  id: string
  children: ClassifierDataItem[]
}

export interface ClassifierDataItem {
  id: string
  parentId: string
  name: string
  description?: string
  children?: ClassifierDataItem[]
}
