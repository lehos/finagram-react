import { RootCategory, Category } from './entity2'

type CategoriesMock = {
  [key: string]: {
    roots: Record<string, true>
    categories: Record<string, RootCategory | Category>
  }
}

export const categories: CategoriesMock = {
  expense: {
    roots: {
      exp_inc: true,
      exp_exp: true
    },
    categories: {
      exp_inc: {
        id: 'exp_inc',
        kind: 'root',
        type: 'income',
        name: 'Все статьи прихода',
        description: ''
      },

      exp_exp: {
        id: 'exp_exp',
        kind: 'root',
        type: 'expense',
        name: 'Все статьи расхода',
        description: ''
      },

      exp_inc_1: {
        id: 'exp_inc_1',
        kind: 'common',
        parentId: 'exp_inc',
        name: 'ЗП',
        description: ''
      },

      exp_exp_1: {
        id: 'exp_exp_1',
        kind: 'common',
        parentId: 'exp_exp',
        name: 'Еда',
        description: ''
      },

      exp_exp_2: {
        id: 'exp_exp_2',
        kind: 'common',
        parentId: 'exp_exp',
        name: 'Транспорт',
        description: ''
      },

      exp_exp_2_1: {
        id: 'exp_exp_2_1',
        kind: 'common',
        parentId: 'exp_exp_2',
        name: 'Такси',
        description: ''
      },

      exp_exp_3: {
        id: 'exp_exp_3',
        kind: 'common',
        parentId: 'exp_exp',
        name: 'Квартира',
        description: ''
      }
    }
  },

  agents: {
    roots: {
      ag_m: true,
      ag_f: true
    },
    categories: {
      ag_m: {
        id: 'ag_m',
        kind: 'root',
        type: 'default',
        name: 'Вася',
        description: ''
      },
      ag_f: {
        id: 'ag_f',
        kind: 'root',
        type: 'default',
        name: 'Лена',
        description: ''
      }
    }
  }
}
