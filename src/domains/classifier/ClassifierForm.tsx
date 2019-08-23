import React from 'react'

import {ClassifierStub, classifierStore} from '.'
import * as UI from '@/ui'
import {EntityForm} from '@/components'

type Props = {
  onOk: () => any
  onCancel: () => any

  // может быть сюда лучше прокидывать сам объект, а не его id
  // тогда форма не будет ходить в стор
  // с другой стороны, к такой форме легче будет прикрутить урл
  classifierId?: string | null
}

type Values = ClassifierStub & {
  action?: 'create' | 'delete' | 'update'
}

function getInitialValues(classifierId: string | null | undefined): Values {
  if (!classifierId) {
    return {name: ''}
  }

  const classifier = classifierStore.classifierMap[classifierId]
  const {name, namePlural, split, useInTransfer} = classifier

  return {name, namePlural, split, useInTransfer}
}

function validate(values: Partial<Values>) {
  const errors = {} as Record<keyof Values, string>

  if (!values.name) {
    errors.name = 'Обязательное поле'
  }

  return errors
}

export function ClassifierForm(props: Props) {
  const {classifierId} = props

  function onCreate(values: Values) {
    classifierStore.create(values)
  }

  function onDelete() {
    classifierStore.delete(classifierId!)
  }

  function onUpdate(values: Values) {
    classifierStore.update({
      id: classifierId!,
      // todo тут что-то не то с типами
      ...(values as Required<Values>)
    })
  }

  return (
    <EntityForm<Values>
      onCancel={props.onCancel}
      onOk={props.onOk}
      validate={validate}
      initialValues={getInitialValues(classifierId)}
      isNew={!classifierId}
      onCreate={onCreate}
      onDelete={onDelete}
      onUpdate={onUpdate}
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
            <UI.FormCheckbox name="split">
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
