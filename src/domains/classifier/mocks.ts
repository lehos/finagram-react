import { Classifier } from '.'

export const classifiers: Record<string, Classifier> = {
  expense: {
    id: 'expense',
    name: 'Статья',
    namePlural: 'Статьи',
    splitable: true,
    useInTransfer: false
  },
  agents: {
    id: 'agents',
    name: 'Агент',
    namePlural: 'Агенты',
    splitable: false,
    useInTransfer: true
  }
}
