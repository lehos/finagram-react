import React from 'react'
import { Field } from 'react-final-form'
import { styled } from 'linaria/react'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'

import { Error } from './Form.styles'

const { Option } = Select

const FormSelectWrapper = styled.div`
  position: relative;
`

interface Props extends SelectProps {
  name: string
  options: {
    value: string
    label: string
  }[]
}

export function FormSelect(props: Props) {
  const { name, options, ...otherProps } = props

  return (
    <Field name={name}>
      {({
        input: { onBlur, ...restInput },
        meta: { error, submitError, touched }
      }) => {
        const valid = !(touched && error) && !submitError
        const errorText = valid ? null : submitError || error

        return (
          <FormSelectWrapper>
            <Select style={{ width: '100%' }} {...restInput} {...otherProps}>
              {options.map(el => (
                <Option key={el.value} value={el.value}>
                  {el.label}
                </Option>
              ))}
            </Select>
            {errorText && <Error>{errorText}</Error>}
          </FormSelectWrapper>
        )
      }}
    </Field>
  )
}
