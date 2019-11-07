import { Classifier } from '.'

export const classifiers: Record<string, Classifier> = {
  expense: {
    id: 'expense',
    name: 'Статья',
    namePlural: 'Статьи',
    splitable: true,
    useInTransfer: false
  },
  agent: {
    id: 'agent',
    name: 'Агент',
    namePlural: 'Агенты',
    splitable: false,
    useInTransfer: true
  }
}
