import { Classifier } from '.'

export const classifiersMock: Classifier[] = [
  {
    id: 'expense',
    name: 'Статья',
    namePlural: 'Статьи',
    split: true,
    useInTransfer: false
  },
  {
    id: 'agents',
    name: 'Агент',
    namePlural: 'Агенты',
    split: false,
    useInTransfer: true
  }
]
