import React from 'react'

import { EntityForm } from '@/components'
import { PartialBy } from '@/utils'
import * as Ui from '@/ui'

import { Classifier, classifierStore } from '.'

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
    return classifierStore.remove(classifier!)
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
          <Ui.Form.Row>
            <Ui.Form.Label>Название в единственном числе</Ui.Form.Label>
            <Ui.FormInput
              name="name"
              placeholder="Название в единственном числе"
              autoComplete="off"
            />
          </Ui.Form.Row>

          <Ui.Form.Row>
            <Ui.Form.Label>Название во множественном числе</Ui.Form.Label>
            <Ui.FormInput
              name="namePlural"
              placeholder="Название во множественном числе"
              autoComplete="off"
            />
          </Ui.Form.Row>

          <Ui.Form.Row>
            <Ui.FormCheckbox name="split" disabled={!!classifier}>
              Разделять по типу операции
            </Ui.FormCheckbox>
          </Ui.Form.Row>

          <Ui.Form.Row>
            <Ui.FormCheckbox name="useInTransfer">
              Использовать в переводах
            </Ui.FormCheckbox>
          </Ui.Form.Row>
        </>
      }
    />
  )
}
