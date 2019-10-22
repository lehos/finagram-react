import React from 'react'
import { FormSpy } from 'react-final-form'

import {
  Transaction,
  transactionStore,
  transactionKinds
} from '@/domains/transaction'
import { CategorySelect } from '@/domains/category'
import { classifierStore } from '@/domains/classifier'
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
  return transaction
    ? { ...transaction }
    : {
        sum: 0,
        date: '',
        description: '',
        kind: 'expense',
        accountId: '',
        toAccountId: null,
        categories: null,
        status: 'done'
      }
}

function validate(values: Values) {
  return {}
}

const transactionKindOptions = Object.entries(transactionKinds).map(el => ({
  value: el[0],
  label: el[1]
}))

export function TransactionForm(props: Props) {
  const { transaction } = props

  function onCreate() {}
  function onDelete() {}
  function onUpdate(values: Values) {
    transactionStore.update(transaction!, values)
  }

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
            <Ui.FormRadio name="kind" options={transactionKindOptions} />
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
                    <Ui.FormInput name="accountId" />
                    <Ui.FormInput name="toAccountId" />
                  </>
                ) : (
                  <Ui.FormInput name="accountId" />
                )
              }}
            </FormSpy>
          </Ui.Form.Row>

          <Ui.Form.Row>
            <Ui.Form.Label>Категории</Ui.Form.Label>

            {classifierStore.classifierList.map(cl => (
              <Ui.Flex>
                {cl.name}
                <Ui.Spacer width={30} />
                <CategorySelect
                  classifierId={cl.id}
                  key={cl.id}
                  name={`categories[${cl.id}`}
                />
              </Ui.Flex>
            ))}
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
