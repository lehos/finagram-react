import { Account } from '.'

export const accounts: Record<string, Account> = {
  ac1: {
    id: 'ac1',
    name: 'Наличные',
    currencyId: 'rub',
    balance: 100000
  },
  ac2: {
    id: 'ac2',
    name: 'Альфабанк',
    currencyId: 'rub',
    balance: 5000000
  },
  ac3: {
    id: 'ac3',
    name: 'Сбербанк',
    currencyId: 'rub',
    balance: 2000000
  }
}
