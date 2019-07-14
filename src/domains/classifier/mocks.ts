import {Classifier} from '.'

export const classifiersMock: Classifier[] = [
  {
    id: '1',
    name: 'Статья',
    split: true,
    namePlural: 'Статьи',
    useInTransfer: false,
    data: null
  },
  {
    id: '2',
    name: 'Агент',
    split: false,
    namePlural: 'Агенты',
    useInTransfer: true,
    data: null
  }
]
