import React from 'react'
import { withTypes, Field } from 'react-final-form'
import { Button } from 'antd'

import * as UI from '@/ui'

type Props<T> = {
  isNew?: boolean
  onOk: () => any

  validate: (values: T) => { [key in keyof T]?: string }
  onDelete: (values: T) => void
  onCreate: (values: T) => void
  onUpdate: (values: T) => void
  initialValues: T

  isDeleteBtnHidden?: boolean
  formInner: React.ReactNode

  onCancel?: () => any
}

type BaseValues = {
  action?: 'create' | 'update' | 'remove'
}

export function EntityForm<T>(props: Props<T>) {
  const { isNew, isDeleteBtnHidden } = props

  async function onSubmit(values: T & BaseValues) {
    const { action, ...rest } = values
    const restValues = rest as T

    if (action === 'remove') {
      await props.onDelete(restValues)
    } else if (action === 'create') {
      await props.onCreate(restValues)
    } else {
      await props.onUpdate(restValues)
    }

    props.onOk()
  }

  const { Form } = withTypes<T & BaseValues>()

  return (
    <Form
      initialValues={props.initialValues}
      validate={props.validate}
      onSubmit={onSubmit}
      subscription={{ submitting: true }}
      render={({ handleSubmit, form, submitting }) => (
        <form
          onSubmit={async e => {
            await handleSubmit(e)
            form.reset()
          }}
        >
          {props.formInner}

          <UI.Spacer height={20} />

          <Field name="action" subscription={{ value: true }}>
            {({ input: { value } }) => (
              <UI.Flex justifyContent="space-between">
                <div>
                  {!isNew && !isDeleteBtnHidden && (
                    <Button
                      disabled={submitting}
                      type="danger"
                      htmlType="button"
                      loading={value === 'remove' && submitting}
                      onClick={() => {
                        form.change('action', 'remove')
                        handleSubmit()
                      }}
                    >
                      Удалить
                    </Button>
                  )}
                </div>

                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={submitting}
                    loading={value !== 'remove' && submitting}
                    onClick={() => {
                      form.change('action', isNew ? 'create' : 'update')
                    }}
                  >
                    Сохранить
                  </Button>
                </div>
              </UI.Flex>
            )}
          </Field>
        </form>
      )}
    />
  )
}
