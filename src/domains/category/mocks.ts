import { Dict } from '@/domains/entity'
import { ClassifierCategory } from './entity'

export const clCategoryMap: Dict<ClassifierCategory> = {
  expense: {
    roots: {
      exp_inc: true,
      exp_exp: true
    },
    categories: {
      exp_inc: {
        id: 'exp_inc',
        classifierId: 'expense',
        type: 'income',
        name: 'Все статьи прихода',
        description: '',
        parentId: null
      },

      exp_exp: {
        id: 'exp_exp',
        classifierId: 'expense',
        type: 'expense',
        name: 'Все статьи расхода',
        description: '',
        parentId: null
      },

      exp_inc_1: {
        id: 'exp_inc_1',
        classifierId: 'expense',
        type: 'default',
        parentId: 'exp_inc',
        name: 'ЗП',
        description: ''
      },

      exp_exp_1: {
        id: 'exp_exp_1',
        classifierId: 'expense',
        parentId: 'exp_exp',
        type: 'default',
        name: 'Еда',
        description: ''
      },

      exp_exp_2: {
        id: 'exp_exp_2',
        classifierId: 'expense',
        parentId: 'exp_exp',
        type: 'default',
        name: 'Транспорт',
        description: ''
      },

      exp_exp_2_1: {
        id: 'exp_exp_2_1',
        classifierId: 'expense',
        parentId: 'exp_exp_2',
        type: 'default',
        name: 'Такси',
        description: ''
      },

      exp_exp_3: {
        id: 'exp_exp_3',
        classifierId: 'expense',
        parentId: 'exp_exp',
        type: 'default',
        name: 'Квартира',
        description: ''
      }
    }
  },

  agent: {
    roots: {
      ag_m: true,
      ag_f: true
    },
    categories: {
      ag_m: {
        id: 'ag_m',
        classifierId: 'agent',
        parentId: null,
        type: 'default',
        name: 'Вася',
        description: ''
      },
      ag_f: {
        id: 'ag_f',
        classifierId: 'agent',
        parentId: null,
        type: 'default',
        name: 'Аня',
        description: ''
      }
    }
  }
}
