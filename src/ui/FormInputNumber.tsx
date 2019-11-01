import React from 'react'
import { Field } from 'react-final-form'
import styled from '@emotion/styled'
import { InputNumber as AInputNumber } from 'antd'
import { InputNumberProps } from 'antd/lib/input-number'

import { Form } from '@/ui'

const FormInputWrapper = styled.div`
  position: relative;
`

interface Props extends InputNumberProps {
  name: string
  errorAbsolute?: boolean
  format?: (value: any, name: string) => any
  parse?: (value: any, name: string) => any
}

export function FormInputNumber(props: Props) {
  const { name, format, parse, errorAbsolute, ...otherProps } = props

  return (
    <Field name={name} format={format} parse={parse}>
      {({ input, meta: { error, submitError, touched } }) => {
        const valid = !(touched && error) && !submitError
        const errorText = valid ? null : submitError || error

        return (
          <FormInputWrapper>
            <AInputNumber {...input} {...otherProps} />
            {errorText && (
              <Form.Error absolute={errorAbsolute}>{errorText}</Form.Error>
            )}
          </FormInputWrapper>
        )
      }}
    </Field>
  )
}
