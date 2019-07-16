import {Classifier} from '.'

export const classifiersMock: Classifier[] = [
  {
    id: '1',
    name: 'Статья',
    namePlural: 'Статьи',
    split: true,
    useInTransfer: false
  },
  {
    id: '2',
    name: 'Агент',
    namePlural: 'Агенты',
    split: false,
    useInTransfer: true
  }
]
