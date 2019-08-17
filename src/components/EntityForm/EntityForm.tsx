import React from 'react'
import {withTypes, FormSpy} from 'react-final-form'
import {Button} from 'antd'

import * as UI from '@/ui'

type Props<T> = {
  isNew?: boolean
  onOk: () => any
  onCancel: () => any

  validate: (values: Partial<T>) => Record<keyof T, string>
  onDelete: (values: T) => void
  onCreate: (values: T) => void
  onUpdate: (values: T) => void
  getInitialValues: () => T

  formInner: JSX.Element | JSX.Element[]
}

type BaseValues = {
  action?: 'create' | 'delete' | 'update'
}

export function EntityForm<T>(props: Props<T>) {
  const {isNew} = props

  async function onSubmit(values: T & BaseValues) {
    const {action, ...rest} = values
    const restValues = rest as T

    if (action === 'delete') {
      await props.onDelete(restValues)
    } else if (action === 'create') {
      await props.onCreate(restValues)
    } else {
      await props.onUpdate(restValues)
    }

    props.onOk()
  }

  const {Form} = withTypes<T & BaseValues>()

  return (
    <Form
      initialValues={props.getInitialValues()}
      validate={props.validate}
      onSubmit={onSubmit}
      subscription={{}}
      render={({handleSubmit, form}) => (
        <form onSubmit={handleSubmit}>
          {props.formInner}

          <UI.Spacer height={20} />

          <FormSpy subscription={{values: true, submitting: true}}>
            {({values, submitting}) => (
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
                  <Button onClick={props.onCancel} disabled={submitting}>
                    Отмена
                  </Button>

                  <UI.Spacer inline width={10} />

                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={submitting}
                    loading={values.action !== 'delete' && submitting}
                    onClick={() =>
                      form.change('action', isNew ? 'create' : 'update')
                    }
                  >
                    Сохранить
                  </Button>
                </div>
              </UI.Flex>
            )}
          </FormSpy>
        </form>
      )}
    />
  )
}