import { Dict } from '@/domains/entity'

export type TransactionType = 'income' | 'expense' | 'transfer' | 'balance'
export type TransactionStatus = 'done' | 'blocked' | 'pending' | 'pendingAndRepeat'

export const transactionTypes: Dict<string, TransactionType> = {
  income: 'Приход',
  expense: 'Расход',
  transfer: 'Перевод',
  balance: 'Остаток'
}

// todo branded type
// export interface DateString extends String {}
export type DateString = string
export type MoneyInCents = number

export interface Transaction {
  id: string
  status: TransactionStatus
  sum: MoneyInCents
  date: DateString
  description: string
  type: TransactionType

  accountId: string | null

  // для всех кроме transfer
  // map by classifierId
  categories: Dict<string> | null

  // только для transfer
  targetAccountId: string | null
}
