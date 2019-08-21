export type TransactionKind = 'income' | 'expense' | 'transfer' | 'balance'
export type TransactionStatus = 'done' | 'blocked' | 'pending' | 'pendingAndRepeat'

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
}

type Category = {
  classifierId: string
  categoryId: string
}

interface TransactionDefault extends TransactionBase {
  accountId: string | null

  categories: Category[]
}

export interface TransactionIncome extends TransactionDefault {
  kind: 'income'
}

export interface TransactionExpense extends TransactionDefault {
  kind: 'expense'
}

export interface TransactionTransfer extends TransactionBase {
  kind: 'transfer'

  // todo может быть это стоит назвать просто accountId?
  fromAccountId: string | null
  toAccountId: string | null

  categories: Category[]
}

export interface TransactionBalance extends TransactionBase {
  kind: 'balance'
  accountId: string | null
}

export type Transaction =
  | TransactionExpense
  | TransactionIncome
  | TransactionBalance
  | TransactionTransfer
