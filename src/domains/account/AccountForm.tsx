import React from 'react'

import * as UI from '@/ui'
import { currencyStore } from '@/domains/currency'
import { EntityForm } from '@/components'

import { Account, accountStore } from '.'

type Props = {
  onOk: () => any
  onCancel: () => any
  accountId?: string | null
}

type Values = Omit<Account, 'id'> & {
  action?: 'delete' | 'update' | 'create'
}

function getInitialValues(accountId: string | null | undefined): Values {
  if (!accountId) {
    return {
      name: '',
      currencyId: currencyStore.currencyList[0].id,
      balance: 0
    }
  }

  const account = accountStore.accountsMap[accountId]
  const { name, balance, currencyId } = account

  return { name, balance, currencyId }
}

function validate(values: Partial<Values>) {
  const errors = {} as Record<keyof Values, string>

  if (!values.name) {
    errors.name = 'Обязательное поле'
  }

  return errors
}

export function AccountForm(props: Props) {
  const { accountId } = props

  function onCreate(values: Values) {
    accountStore.create(values)
  }

  function onDelete() {
    accountStore.delete(accountId!)
  }

  function onUpdate(values: Values) {
    accountStore.update({ id: accountId!, ...values })
  }

  const currencyOptions = currencyStore.currencyList.map(el => ({
    value: el.id,
    label: el.name
  }))

  return (
    <EntityForm<Values>
      onCancel={props.onCancel}
      onOk={props.onOk}
      validate={validate}
      initialValues={getInitialValues(accountId)}
      isNew={!accountId}
      onCreate={onCreate}
      onDelete={onDelete}
      onUpdate={onUpdate}
      formInner={
        <>
          <UI.FormRow>
            <UI.FormLabel>Название</UI.FormLabel>
            <UI.FormInput name="name" placeholder="Название" autoComplete="off" />
          </UI.FormRow>

          <UI.FormRow>
            <UI.FormLabel>Валюта</UI.FormLabel>
            <UI.FormSelect name="currencyId" options={currencyOptions} />
          </UI.FormRow>

          <UI.FormRow>
            <UI.FormLabel>Начальный баланс</UI.FormLabel>
            <UI.FormInput name="balance" placeholder="Валюта" autoComplete="off" />
          </UI.FormRow>
        </>
      }
    />
  )
}
