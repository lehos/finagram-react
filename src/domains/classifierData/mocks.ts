import {ClassifierData} from './entity'

export const classifierDataMocks: ClassifierData[] = [
  {
    classifierId: '1',
    id: 'cd1',

    children: [
      {
        id: '12',
        parentId: 'cd1',
        name: 'Все статьи прихода',
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
        parentId: 'cd1',
        name: 'Все статьи расхода',
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
    classifierId: '2',
    id: 'cd22',

    children: [
      {
        id: '21',
        parentId: 'cd2',
        name: 'Агенты',

        children: [
          {
            id: '211',
            name: 'Муж',
            parentId: '21'
          },
          {
            id: '212',
            name: 'Жена',
            parentId: '21'
          }
        ]
      }
    ]
  }
]
