import React from 'react'
import { Field } from 'react-final-form'

import { Checkbox } from 'antd'
import { CheckboxProps } from 'antd/lib/checkbox'

interface Props extends CheckboxProps {
  name: string
}
export function FormCheckbox(props: Props) {
  const { name, ...restProps } = props

  return (
    <Field name={name} type="checkbox">
      {({ input, meta: { error, submitError, touched } }) => {
        const valid = !(touched && error) && !submitError

        return (
          <div>
            <Checkbox {...input} {...restProps} />
          </div>
        )
      }}
    </Field>
  )
}
