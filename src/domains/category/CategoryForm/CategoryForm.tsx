import React from 'react'
import {withTypes} from 'react-final-form'
import {Button} from 'antd'

import {Category, CategoryItem, categoryStore} from '@/domains/category'
import * as UI from '@/ui'

type Props = {
  onOk: () => any
  onCancel: () => any

  categoryItemId?: string | null
}

type Values = {
  name: string
  description?: string
  action?: 'create' | 'delete' | 'update'
}

function getInitialValues(id: string | null | undefined): Values {
  return {name: ''}
}

function validate(values: Partial<Values>) {
  const errors = {} as Record<keyof Values, string>

  if (!values.name) {
    errors.name = 'Обязательное поле'
  }

  return errors
}

export function CategoryForm(props: Props) {
  const {onOk, onCancel, categoryItemId} = props
  const initialValues = getInitialValues(categoryItemId)
  const isNew = !categoryItemId

  async function onSubmit(values: Values) {
    const {action, ...rest} = values

    if (action === 'delete') {
      // await classifierStore.remove(classifierId!)
    } else if (action === 'create') {
      // await classifierStore.create(rest)
    } else {
      // await classifierStore.update({id: classifierId!, ...(rest as Required<Values>)})
    }

    onOk()
  }

  const {Form} = withTypes<Values>()

  return (
    <Form
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      // todo subscription and FormSpy
      // subscription={{submitting: true}}
      render={({handleSubmit, submitting, form, values}) => (
        <form onSubmit={handleSubmit}>
          <UI.FormRow>
            <UI.FormLabel>Название</UI.FormLabel>
            <UI.FormInput
              name="name"
              placeholder="Название"
              autoComplete="off"
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
