import React from 'react'
import {withTypes} from 'react-final-form'
import {Button} from 'antd'

import {ClassifierStub, classifierStore} from '.'
import * as UI from '@/ui'

type Props = {
  onOk: () => any
  onCancel: () => any
  classifierId?: string | null
}

type Values = ClassifierStub & {
  action?: 'create' | 'delete' | 'update'
}

function getInitialValues(classifierId: string | null | undefined): Values {
  if (!classifierId) {
    return {name: ''}
  }

  const classifier = classifierStore.classifiersMap[classifierId]

  if (!classifier) {
    return {name: ''}
  }

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
  const {onOk, onCancel, classifierId} = props
  console.log('form')

  const initialValues = getInitialValues(classifierId)

  const isNew = !classifierId

  async function onSubmit(values: Values) {
    const {action, ...rest} = values

    if (action === 'update') {
      await classifierStore.update({id: classifierId!, ...(rest as Required<Values>)})
    } else if (action === 'create') {
      await classifierStore.create(rest)
    } else {
      await classifierStore.delete(classifierId!)
    }

    onOk()
  }

  const {Form} = withTypes<Values>()

  return (
    <Form
      validate={validate}
      initialValues={initialValues}
      onSubmit={onSubmit}
      // subscription={{submitting: true}}
      render={({handleSubmit, submitting, form, values}) => (
        <form onSubmit={handleSubmit}>
          {values.action}
          <UI.FormRow>
            <UI.FormLabel> Название ед. ч. </UI.FormLabel>
            <UI.FormInput
              name="name"
              placeholder="Название в единственном числе"
              autoComplete="off"
            />
          </UI.FormRow>

          <UI.FormRow>
            <UI.FormLabel> Название множ. ч.</UI.FormLabel>
            <UI.FormInput
              name="namePlural"
              placeholder="Название во множественном числе"
              autoComplete="off"
            />
          </UI.FormRow>

          <UI.FormRow>
            <UI.FormCheckbox name="split">Разделять по типу операции</UI.FormCheckbox>
          </UI.FormRow>

          <UI.FormRow>
            <UI.FormCheckbox name="useInTransfer">
              Использовать в переводах
            </UI.FormCheckbox>
          </UI.FormRow>

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
                {isNew ? 'Создать' : 'Редактировать'}
              </Button>
            </div>
          </UI.Flex>
        </form>
      )}
    />
  )
}
