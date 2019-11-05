import { Currency } from '.'

export const currencies: Record<string, Currency> = {
  rub: {
    id: 'rub',
    name: 'Рубль',
    short: 'RUB'
  },
  usd: {
    id: 'usd',
    name: 'US Dollar',
    short: 'USD'
  },
  eur: {
    id: 'eur',
    name: 'Euro',
    short: 'EUR'
  }
}
