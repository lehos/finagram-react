import React from 'react'
import { Field } from 'react-final-form'
import { styled } from 'linaria/react'
import { Input } from 'antd'
import { InputProps } from 'antd/lib/input'

import { Error } from './Form.styles'

const FormInputWrapper = styled.div`
  position: relative;
`

interface Props extends InputProps {
  name: string
  errorAbsolute?: boolean
  format?: (value: any, name: string) => any
  parse?: (value: any, name: string) => any
}

export function FormInput(props: Props) {
  const { name, format, parse, errorAbsolute, ...otherProps } = props

  return (
    <Field name={name} format={format} parse={parse}>
      {({ input, meta: { error, submitError, touched } }) => {
        const valid = !(touched && error) && !submitError
        const errorText = valid ? null : submitError || error

        return (
          <FormInputWrapper>
            <Input {...input} {...otherProps} />
            {errorText && <Error absolute={errorAbsolute}>{errorText}</Error>}
          </FormInputWrapper>
        )
      }}
    </Field>
  )
}
