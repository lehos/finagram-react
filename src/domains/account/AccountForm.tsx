import React from 'react'

import * as Ui from '@/ui'
import { currencyStore } from '@/domains/currency'
import { EntityForm } from '@/components'
import { PartialBy } from '@/utils/types'

import { Account, accountStore } from '.'

type Props = {
  onOk: () => any
  account?: Account | null
}

type Values = PartialBy<Account, 'id'>

function getInitialValues(account: Account | undefined | null): Values {
  return (
    account || {
      name: '',
      currencyId: currencyStore.currencyList[0].id,
      balance: 0
    }
  )
}

function validate(values: Partial<Values>) {
  const errors = {} as Record<keyof Values, string>

  if (!values.name) {
    errors.name = 'Обязательное поле'
  }

  return errors
}

// todo normalize balance

export function AccountForm(props: Props) {
  const { account } = props

  function onCreate(values: Values) {
    return accountStore.create(values)
  }

  function onDelete() {
    return accountStore.remove(account!)
  }

  function onUpdate(values: Values) {
    return accountStore.update(values as Account)
  }

  // todo could be cached
  const currencyOptions = currencyStore.currencyList.map(el => ({
    value: el.id,
    label: el.name
  }))

  return (
    <EntityForm<Values>
      initialValues={getInitialValues(account)}
      validate={validate}
      onCreate={onCreate}
      onDelete={onDelete}
      onUpdate={onUpdate}
      onOk={props.onOk}
      isNew={!account}
      formInner={
        <>
          <Ui.Form.Row>
            <Ui.Form.Label>Название</Ui.Form.Label>
            <Ui.FormInput name="name" placeholder="Название" autoComplete="off" />
          </Ui.Form.Row>

          <Ui.Form.Row>
            <Ui.Form.Label>Валюта</Ui.Form.Label>
            <Ui.FormSelect name="currencyId" options={currencyOptions} />
          </Ui.Form.Row>

          <Ui.Form.Row>
            <Ui.Form.Label>Начальный баланс</Ui.Form.Label>
            <Ui.FormInput name="balance" placeholder="Валюта" autoComplete="off" />
          </Ui.Form.Row>
        </>
      }
    />
  )
}
