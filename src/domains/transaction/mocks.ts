import * as T from './entity'
import { Dict } from '@/domains/entity'

export const transactions: Dict<T.Transaction> = {
  t1: {
    id: 't1',
    accountId: 'ac1',
    type: 'expense',
    status: 'done',
    description: 'расход в рутовой категории "Статья"',
    sum: 20000,
    date: '29.07.2019',
    categories: {
      expense: 'exp_exp'
    },
    targetAccountId: null
  },
  t2: {
    id: 't2',
    accountId: 'ac2',
    type: 'expense',
    status: 'done',
    description: 'расход в конкретной категории "Статья"',
    sum: 35000,
    date: '30.07.2019',
    categories: {
      expense: 'exp_exp_1'
    },
    targetAccountId: null
  },
  t22: {
    id: 't22',
    accountId: 'ac2',
    type: 'expense',
    status: 'done',
    description: 'расход со статьей и агентом',
    sum: 200000,
    date: '30.07.2019',
    categories: {
      expense: 'exp_exp_2',
      agent: 'ag_f'
    },
    targetAccountId: null
  },
  t3: {
    id: 't3',
    accountId: 'ac2',
    type: 'expense',
    status: 'done',
    description: 'расход без категорий',
    sum: 50000,
    date: '30.07.2019',
    categories: {},
    targetAccountId: null
  },
  t4: {
    id: 't4',
    accountId: 'ac3',
    type: 'income',
    status: 'done',
    description: 'приход с категорией',
    sum: 500000,
    date: '30.07.2019',
    categories: {
      expense: 'exp_inc_1'
    },
    targetAccountId: null
  },
  t5: {
    id: 't5',
    type: 'transfer',
    status: 'done',
    description: 'перевод без агента',
    sum: 100000,
    date: '30.07.2019',
    accountId: 'ac2',
    targetAccountId: 'ac1',
    categories: {}
  },
  t6: {
    id: 't6',
    type: 'transfer',
    status: 'done',
    description: 'перевод с агентом',
    sum: 200000,
    date: '30.07.2019',
    accountId: 'ac2',
    targetAccountId: 'ac1',
    categories: {
      agent: 'ag_f'
    }
  },
  t7: {
    id: 't7',
    type: 'transfer',
    status: 'done',
    description: 'перевод с другого счета',
    sum: 200000,
    date: '01.08.2019',
    accountId: 'ac3',
    targetAccountId: 'ac2',
    categories: {}
  }
}
