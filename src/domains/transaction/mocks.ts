import * as T from './entity'

export const transactionMocks: T.Transaction[] = [
  {
    id: 't1',
    accountId: 'ac1',
    type: 'expense',
    status: 'done',
    description: 'расход в рутовой категории',
    sum: 20000,
    date: '29.07.2019',
    classifierId: 'cl1',
    categoryItemId: '13'
  },
  {
    id: 't2',
    accountId: 'ac2',
    type: 'expense',
    status: 'done',
    description: 'расход в конкретной категории',
    sum: 35000,
    date: '30.07.2019',
    classifierId: 'cl1',
    categoryItemId: '131'
  },
  {
    id: 't3',
    accountId: 'ac2',
    type: 'expense',
    status: 'done',
    description: 'расход без категории',
    sum: 50000,
    date: '30.07.2019',
    classifierId: null,
    categoryItemId: null
  },
  {
    id: 't4',
    accountId: 'ac3',
    type: 'income',
    status: 'done',
    description: 'приход с категорией',
    sum: 500000,
    date: '30.07.2019',
    // todo подумать, возможен ли такой случай
    //   когда есть классификатор, но нет категории
    classifierId: 'cl1',
    categoryItemId: null
  },
  {
    id: 't5',
    type: 'transfer',
    status: 'done',
    description: 'перевод без агента',
    sum: 100000,
    date: '30.07.2019',
    fromAccountId: 'ac1',
    toAccountId: 'ac2'
  },
  {
    id: 't6',
    type: 'transfer',
    status: 'done',
    description: 'перевод с агентом',
    sum: 200000,
    date: '30.07.2019',
    fromAccountId: 'ac1',
    toAccountId: 'ac2',
    classifierId: 'cd2',
    categoryItemId: '212'
  }
]
