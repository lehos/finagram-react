import React from 'react'
import {withTypes} from 'react-final-form'
import {Button} from 'antd'

import * as UI from '@/ui'
import {currencyStore} from '@/domains/currency'

import {Account, accountStore} from '.'

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
      // todo real currency
      currencyId: '1',
      balance: 0
    }
  }

  const account = accountStore.accounts[accountId]
  const {name, balance, currencyId} = account

  return {name, balance, currencyId}
}

function validate(values: Partial<Values>) {
  const errors = {} as Record<keyof Values, string>

  if (!values.name) {
    errors.name = 'Обязательное поле'
  }

  return errors
}

// todo extract common entity form logic to separate component

export function AccountForm(props: Props) {
  const {onOk, onCancel, accountId} = props
  const initialValues = getInitialValues(accountId)
  const isNew = !accountId

  async function onSubmit(values: Values) {
    const {action, ...rest} = values

    if (action === 'delete') {
      await accountStore.remove(accountId!)
    } else if (action === 'create') {
      await accountStore.create(rest)
    } else {
      await accountStore.update({id: accountId!, ...rest})
    }

    onOk()
  }

  const currencyOptions = currencyStore.currenciesArr.map(el => ({
    value: el.id,
    label: el.name
  }))

  const {Form} = withTypes<Values>()

  return (
    <Form
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      // todo subscription and FormSpy
      render={({handleSubmit, submitting, form, values}) => (
        <form onSubmit={handleSubmit}>
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

          <UI.Spacer height={10} />

          <UI.Flex justifyContent="space-between">
            <div>
              {!isNew && (
                <Button
                  disabled={submitting}
                  type="danger"
                  htmlType="submit"
                  loading={values.action === 'delete' && submitting}
                  onClick={() => form.change('action', 'delete')}
                >
                  Удалить
                </Button>
              )}
            </div>

            <div>
              <Button onClick={onCancel} disabled={submitting}>
                Отмена
              </Button>

              <UI.Spacer inline width={10} />

              <Button
                type="primary"
                htmlType="submit"
                disabled={submitting}
                loading={values.action !== 'delete' && submitting}
                onClick={() => form.change('action', isNew ? 'create' : 'update')}
              >
                Сохранить
              </Button>
            </div>
          </UI.Flex>
        </form>
      )}
    />
  )
}
