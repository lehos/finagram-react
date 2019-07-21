import React from 'react'

import {TransactionTable} from '@/domains/transaction'

export function TransactionsPage() {
  return (
    <div>
      <h1>Операции</h1>

      <TransactionTable />
    </div>
  )
}
