import React from 'react'

import { Classifier, classifierStore } from '.'
import * as UI from '@/ui'
import { EntityForm } from '@/components'
import { PartialBy } from '@/utils'

type Props = {
  onOk: () => any
  classifier?: Classifier | null
}

type Values = PartialBy<Classifier, 'id'>

function getInitialValues(classifier: Classifier | null | undefined): Values {
  return (
    classifier || { name: '', useInTransfer: false, namePlural: '', split: false }
  )
}

function validate(values: Partial<Values>) {
  const errors = {} as Record<keyof Values, string>

  if (!values.name) {
    errors.name = 'Обязательное поле'
  }

  return errors
}

export function ClassifierForm(props: Props) {
  const { classifier } = props

  function onCreate(values: Values) {
    return classifierStore.create(values)
  }

  function onDelete() {
    return classifierStore.delete(classifier!)
  }

  function onUpdate(values: Values) {
    return classifierStore.update(values as Classifier)
  }

  return (
    <EntityForm<Values>
      initialValues={getInitialValues(classifier)}
      validate={validate}
      onCreate={onCreate}
      onDelete={onDelete}
      onUpdate={onUpdate}
      onOk={props.onOk}
      isNew={!classifier}
      formInner={
        <>
          <UI.FormRow>
            <UI.FormLabel>Название в единственном числе</UI.FormLabel>
            <UI.FormInput
              name="name"
              placeholder="Название в единственном числе"
              autoComplete="off"
            />
          </UI.FormRow>

          <UI.FormRow>
            <UI.FormLabel>Название во множественном числе</UI.FormLabel>
            <UI.FormInput
              name="namePlural"
              placeholder="Название во множественном числе"
              autoComplete="off"
            />
          </UI.FormRow>

          <UI.FormRow>
            <UI.FormCheckbox name="split" disabled={!!classifier}>
              Разделять по типу операции
            </UI.FormCheckbox>
          </UI.FormRow>

          <UI.FormRow>
            <UI.FormCheckbox name="useInTransfer">
              Использовать в переводах
            </UI.FormCheckbox>
          </UI.FormRow>
        </>
      }
    />
  )
}
