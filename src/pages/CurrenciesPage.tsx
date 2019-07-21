import React from 'react'

import {CurrencyTable} from '@/domains/currency'

export function CurrenciesPage() {
  return (
    <div>
      <h1>Валюты</h1>

      <CurrencyTable />
    </div>
  )
}
