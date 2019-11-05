import { Classifier } from '.'

export const classifiersMock: Classifier[] = [
  {
    id: 'expense',
    name: 'Статья',
    namePlural: 'Статьи',
    splitable: true,
    useInTransfer: false
  },
  {
    id: 'agents',
    name: 'Агент',
    namePlural: 'Агенты',
    splitable: false,
    useInTransfer: true
  }
]

export const classifiers: Record<string, Classifier> = {
  expense: {
    id: 'expense',
    name: 'Статья',
    namePlural: 'Статьи',
    splitable: true,
    useInTransfer: false
  },
  agent: {
    id: 'agents',
    name: 'Агент',
    namePlural: 'Агенты',
    splitable: false,
    useInTransfer: true
  }
}
