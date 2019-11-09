import React from 'react'
import { FormSpy } from 'react-final-form'

import {
  Transaction,
  transactionStore,
  transactionTypes
} from '@/domains/transaction'
import { CategorySelect } from '@/domains/category'
import { classifierStore } from '@/domains/classifier'
import { accountStore } from '@/domains/account'
import { EntityForm } from '@/components'
import * as Ui from '@/ui'

type Values = Omit<Transaction, 'id'> & {
  id?: string
}

type Props = {
  onOk: () => void
  onCancel: () => void
  transaction: Transaction | null
}

function getInitialValues(transaction: Transaction | null): Values {
  return (
    transaction || {
      sum: 0,
      date: '',
      description: '',
      type: 'expense',
      accountId: '',
      categories: {},
      status: 'done',
      targetAccountId: null
    }
  )
}

function validate(values: Values) {
  return {}
}

export function TransactionForm(props: Props) {
  const { transaction } = props

  function onCreate() {}
  function onDelete() {}
  function onUpdate(values: Values) {
    transactionStore.update({ ...values, id: values.id! })
  }

  const transactionKindOptions = Object.entries(transactionTypes).map(el => ({
    value: el[0],
    label: el[1]
  }))

  // todo could be cached
  const accountOptions = accountStore.accountsList.map(el => ({
    value: el.id,
    label: el.name
  }))

  return (
    <EntityForm<Values>
      initialValues={getInitialValues(transaction)}
      onCancel={props.onCancel}
      onOk={props.onOk}
      isNew={!transaction}
      validate={validate}
      onCreate={onCreate}
      onDelete={onDelete}
      onUpdate={onUpdate}
      formInner={
        <>
          <Ui.Form.Row>
            <Ui.Form.Label>Тип операции</Ui.Form.Label>
            <Ui.FormRadio name="type" options={transactionKindOptions} />
          </Ui.Form.Row>

          <Ui.Form.Row>
            <Ui.Form.Label>Дата</Ui.Form.Label>
            <Ui.FormDatePicker name="date" />
          </Ui.Form.Row>

          <Ui.Form.Row>
            <Ui.Form.Label>Со счета</Ui.Form.Label>

            <FormSpy subscription={{ values: true }}>
              {({ values }) => {
                return values.kind === 'transfer' ? (
                  <>
                    todo
                    <Ui.FormInput name="accountId" />
                    <Ui.FormInput name="toAccountId" />
                  </>
                ) : (
                  <Ui.FormSelect name="accountId" options={accountOptions} />
                )
              }}
            </FormSpy>
          </Ui.Form.Row>

          <Ui.Form.Row>
            <Ui.Form.Label>Сумма</Ui.Form.Label>
            <Ui.FormInput
              name="sum"
              placeholder="Сумма"
              autoComplete="off"
              format={(v: number) => v / 100}
              parse={(v: number) => v * 100}
            />
          </Ui.Form.Row>

          <Ui.Form.Row>
            <Ui.Form.Label>Категории</Ui.Form.Label>

            {classifierStore.classifierList.map((cl, index) => (
              <Ui.Form.Row key={cl.id}>
                <Ui.Form.Label>{cl.name}</Ui.Form.Label>
                <CategorySelect
                  classifierId={cl.id}
                  key={cl.id}
                  name={`categories.${cl.id}`}
                />
              </Ui.Form.Row>
            ))}
          </Ui.Form.Row>

          <Ui.Form.Row>
            <Ui.Form.Label>Примечание</Ui.Form.Label>
            <Ui.FormInput
              name="description"
              placeholder="Примечание"
              autoComplete="off"
            />
          </Ui.Form.Row>
        </>
      }
    />
  )
}
