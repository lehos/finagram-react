import {Category} from './entity'

export const categoryMocks: Category[] = [
  {
    classifierId: 'cl1',
    id: 'cd1',

    children: [
      {
        id: '12',
        name: 'Все статьи прихода',
        type: 'income',
        children: [
          {
            id: '121',
            parentId: '12',
            name: 'ЗП'
          }
        ]
      },
      {
        id: '13',
        name: 'Все статьи расхода',
        type: 'expense',
        children: [
          {
            id: '131',
            parentId: '13',
            name: 'Еда'
          },
          {
            id: '132',
            parentId: '13',
            name: 'Квартира'
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

        children: [
          {
            id: '211',
            name: 'Муж',
            parentId: '21'
          },
          {
            id: 'wife',
            name: 'Жена',
            parentId: '21'
          }
        ]
      }
    ]
  }
]
