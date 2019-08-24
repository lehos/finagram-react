import {ClassifierCategory} from './entity'

export const clCategoryMock: ClassifierCategory[] = [
  {
    classifierId: 'expense',
    id: 'cd1',

    children: [
      {
        id: '12',
        name: 'Все статьи прихода',
        type: 'income',
        description: '',
        children: [
          {
            id: '121',
            parentId: '12',
            name: 'ЗП',
            description: ''
          }
        ]
      },
      {
        id: '13',
        name: 'Все статьи расхода',
        type: 'expense',
        description: '',
        children: [
          {
            id: '131',
            parentId: '13',
            name: 'Еда',
            description: ''
          },
          {
            id: '132',
            parentId: '13',
            name: 'Квартира',
            description: ''
          },
          {
            id: '133',
            parentId: '13',
            name: 'Транспорт',
            description: 'Проезд и тп'
          }
        ]
      }
    ]
  },
  {
    classifierId: 'agents',
    id: 'cd2',

    children: [
      {
        id: '21',
        name: 'Агенты',
        type: 'transfer',
        description: '',

        children: [
          {
            id: '211',
            name: 'Муж',
            parentId: '21',
            description: ''
          },
          {
            id: 'wife',
            name: 'Жена',
            parentId: '21',
            description: ''
          }
        ]
      }
    ]
  }
]
