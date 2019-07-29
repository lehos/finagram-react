import React from 'react'

import {CurrencyTable} from '@/domains/currency'

export function Currencies() {
  return (
    <div>
      <h1>Валюты</h1>

      <CurrencyTable />
    </div>
  )
}
