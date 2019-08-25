import React from 'react'

import * as UI from '@/ui'
import {transactionStore, Transaction} from '@/domains/transaction'
import {EntityForm} from '@/components'

type Values = Pick<Transaction, 'sum' | 'description' | 'date'>

type Props = {
  onOk: () => void
  onCancel: () => void
  transaction: Transaction | null
}

function getInitialValues(transaction: Transaction | null): Values {
  return transaction
    ? {
        sum: transaction.sum,
        date: transaction.date,
        description: transaction.description
      }
    : {
        sum: 0,
        date: '',
        description: ''
      }
}

function validate(values: Values) {
  return {}
}

export function TransactionForm(props: Props) {
  const {transaction} = props

  function onCreate() {}
  function onDelete() {}
  function onUpdate() {}

  return (
    <>
      <EntityForm<Values>
        onCancel={props.onCancel}
        onOk={props.onOk}
        validate={validate}
        initialValues={getInitialValues(transaction)}
        isNew={!transaction}
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
