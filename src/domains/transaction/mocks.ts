import * as T from './entity'

export const transactionMocks: T.Transaction[] = [
  {
    id: 't1',
    accountId: 'ac1',
    type: 'expense',
    status: 'done',
    description: 'расход в рутовой категории "Статья"',
    sum: 20000,
    date: '29.07.2019',
    categories: [
      {
        classifierId: 'cl1',
        categoryItemId: '13'
      }
    ]
  },
  {
    id: 't2',
    accountId: 'ac2',
    type: 'expense',
    status: 'done',
    description: 'расход в конкретной категории "Статья"',
    sum: 35000,
    date: '30.07.2019',
    categories: [
      {
        classifierId: 'cl1',
        categoryItemId: '131'
      }
    ]
  },
  {
    id: 't22',
    accountId: 'ac2',
    type: 'expense',
    status: 'done',
    description: 'расход со статьей и агентом',
    sum: 200000,
    date: '30.07.2019',
    categories: [
      {
        classifierId: 'cl1',
        categoryItemId: '133'
      },
      {
        classifierId: 'agents',
        categoryItemId: 'wife'
      }
    ]
  },
  {
    id: 't3',
    accountId: 'ac2',
    type: 'expense',
    status: 'done',
    description: 'расход без категорий',
    sum: 50000,
    date: '30.07.2019',
    categories: []
  },
  {
    id: 't4',
    accountId: 'ac3',
    type: 'income',
    status: 'done',
    description: 'приход с категорией',
    sum: 500000,
    date: '30.07.2019',

    categories: [
      {
        classifierId: 'cl1',
        categoryItemId: '121'
      }
    ]
  },
  {
    id: 't5',
    type: 'transfer',
    status: 'done',
    description: 'перевод без агента',
    sum: 100000,
    date: '30.07.2019',
    fromAccountId: 'ac2',
    toAccountId: 'ac1',
    categories: []
  },
  {
    id: 't6',
    type: 'transfer',
    status: 'done',
    description: 'перевод с агентом',
    sum: 200000,
    date: '30.07.2019',
    fromAccountId: 'ac2',
    toAccountId: 'ac1',
    categories: [
      {
        classifierId: 'agents',
        categoryItemId: 'wife'
      }
    ]
  },
  {
    id: 't7',
    type: 'transfer',
    status: 'done',
    description: 'перевод с другого счета',
    sum: 200000,
    date: '01.08.2019',
    fromAccountId: 'ac3',
    toAccountId: 'ac2',
    categories: []
  }
]
