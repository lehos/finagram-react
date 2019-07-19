export type TransactionType = 'income' | 'expense' | 'transfer' | 'balance'
export type TransactionStatus = 'done' | 'blocked' | 'pending' | 'pendingAndRepeat'

// todo branded type
// export interface DateString extends String {}
export type DateString = string
export type MoneyInCents = number

interface TransactionBase {
  id: string
  status: TransactionStatus
  type: TransactionType
  sum: MoneyInCents
  date: DateString
  description: string
}

interface TransactionDefault extends TransactionBase {
  accountId: string | null

  classifierId: string | null
  // может быть вместо null лучше указывать рутовую статью
  categoryItemId: string | null
}

export interface TransactionIncome extends TransactionDefault {
  type: 'income'
}

export interface TransactionExpense extends TransactionDefault {
  type: 'expense'
}

export interface TransactionTransfer extends TransactionBase {
  type: 'transfer'

  // todo может быть это стоит назвать просто accountId?
  fromAccountId: string | null
  toAccountId: string | null

  classifierId?: string | null
  categoryItemId?: string | null
}

export interface TransactionBalance extends TransactionBase {
  type: 'balance'
  accountId: string | null
}

export type Transaction =
  | TransactionExpense
  | TransactionIncome
  | TransactionBalance
  | TransactionTransfer
