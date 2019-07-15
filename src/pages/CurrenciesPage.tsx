import React from 'react'

import {Spacer, PageHeader} from '@/ui'

import {CurrencyTable} from '@/domains/currency'

export default function CurrenciesPage() {
  return (
    <div>
      <PageHeader>
        Валюты
      </PageHeader>


      <CurrencyTable  />
    </div>
  )
}
