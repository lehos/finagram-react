import {Classifier} from '.'

export const classifiersMock: Classifier[] = [
  {
    id: 'cl1',
    name: 'Статья',
    namePlural: 'Статьи',
    split: true,
    useInTransfer: false
  },
  {
    id: 'cl2',
    name: 'Агент',
    namePlural: 'Агенты',
    split: false,
    useInTransfer: true
  }
]
