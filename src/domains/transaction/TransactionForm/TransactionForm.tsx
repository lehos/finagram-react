import React from 'react'

import * as UI from '@/ui'
import {transactionStore, Transaction} from '@/domains/transaction'
import {EntityForm} from '@/components'

type Values = Pick<Transaction, 'sum' | 'description' | 'date'>

type Props = {
  onOk: () => void
  onCancel: () => void
  transactionId: string | null
}

function getInitialValues(transactionId: string | null): Values {
  const stub = {
    sum: 0,
    date: '',
    description: ''
  }

  if (!transactionId) {
    return stub
  }

  const transaction = transactionStore.transactionList.find(
    el => el.id === transactionId
  )

  if (!transaction) {
    return stub
  }

  return {
    sum: transaction.sum,
    date: transaction.date,
    description: transaction.description
  }
}

function validate(values: Values) {
  return {}
}

export function TransactionForm(props: Props) {
  const {transactionId} = props

  function onCreate() {}
  function onDelete() {}
  function onUpdate() {}

  return (
    <>
      <EntityForm<Values>
        onCancel={props.onCancel}
        onOk={props.onOk}
        validate={validate}
        initialValues={getInitialValues(transactionId)}
        isNew={!transactionId}
        onCreate={onCreate}
        onDelete={onDelete}
        onUpdate={onUpdate}
        formInner={
          <>
            <UI.FormRow>
              <UI.FormLabel>Сумма</UI.FormLabel>
              <UI.FormInput name="sum" placeholder="Сумма" autoComplete="off" />
            </UI.FormRow>

            <UI.FormRow>
              <UI.FormLabel>Дата</UI.FormLabel>
              <UI.FormInput name="date" placeholder="Дата" autoComplete="off" />
            </UI.FormRow>

            <UI.FormRow>
              <UI.FormLabel>Примечание</UI.FormLabel>
              <UI.FormInput
                name="description"
                placeholder="Примечание"
                autoComplete="off"
              />
            </UI.FormRow>
          </>
        }
      />
    </>
  )
}
