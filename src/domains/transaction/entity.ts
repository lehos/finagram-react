export type TransactionKind = 'income' | 'expense' | 'transfer' | 'balance'
export type TransactionStatus = 'done' | 'blocked' | 'pending' | 'pendingAndRepeat'

export const transactionKinds = {
  income: 'Приход',
  expense: 'Расход',
  transfer: 'Перевод',
  balance: 'Остаток'
}

// todo branded type
// export interface DateString extends String {}
export type DateString = string
export type MoneyInCents = number

interface TransactionBase {
  id: string
  status: TransactionStatus
  kind: TransactionKind
  sum: MoneyInCents
  date: DateString
  description: string
  accountId: string | null

  // есть только в transfer
  toAccountId: string | null

  // есть во всех, кроме balance
  categories: Category[] | null
}

type Category = {
  classifierId: string
  categoryId: string
}

export interface TransactionIncome extends TransactionBase {
  kind: 'income'
}

export interface TransactionExpense extends TransactionBase {
  kind: 'expense'
}

export interface TransactionTransfer extends TransactionBase {
  kind: 'transfer'
}

export interface TransactionBalance extends TransactionBase {
  kind: 'balance'
}

export type Transaction =
  | TransactionExpense
  | TransactionIncome
  | TransactionBalance
  | TransactionTransfer
