import React from 'react'
import {FormSpy} from 'react-final-form'

import * as UI from '@/ui'
import {transactionStore, Transaction, transactionKinds} from '@/domains/transaction'
import {categoryStore} from '@/domains/category'
import {classifierStore} from '@/domains/classifier'
import {EntityForm} from '@/components'

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
    ? {...transaction}
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
  const {transaction} = props

  function onCreate() {}
  function onDelete() {}
  function onUpdate(values: Values) {
    transactionStore.update(transaction!, values)
  }

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
              <UI.FormLabel>Тип операции</UI.FormLabel>
              <UI.Form.Radio name="kind" options={transactionKindOptions} />
            </UI.FormRow>

            <UI.FormRow>
              <UI.FormLabel>Дата</UI.FormLabel>
              <UI.Form.DatePicker name="date" />
            </UI.FormRow>

            <UI.FormRow>
              <UI.FormLabel>Со счета</UI.FormLabel>

              <FormSpy subscription={{values: true}}>
                {({values}) => {
                  return values.kind === 'transfer' ? (
                    <>
                      <UI.FormInput name="accountId" />
                      <UI.FormInput name="toAccountId" />
                    </>
                  ) : (
                    <UI.FormInput name="accountId" />
                  )
                }}
              </FormSpy>
            </UI.FormRow>
            <UI.FormRow>
              <UI.FormLabel>Категории</UI.FormLabel>

              {classifierStore.classifierList.map(cl => (
                <div>
                  {cl.name}
                  <UI.Form.TreeSelect
                    treeDefaultExpandAll
                    titleField="name"
                    name={`categories[${cl.id}`}
                    key={cl.id}
                    treeOptions={categoryStore.clCategoryMap[cl.id].children}
                  />
                </div>
              ))}
            </UI.FormRow>

            <UI.FormRow>
              <UI.FormLabel>Сумма</UI.FormLabel>
              <UI.FormInput
                name="sum"
                placeholder="Сумма"
                autoComplete="off"
                format={(v: number) => v / 100}
                parse={(v: number) => v * 100}
              />
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
