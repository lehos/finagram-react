import React from 'react'
import {Field} from 'react-final-form'
import {styled} from 'linaria/react'
import {DatePicker} from 'antd'
import {PickerProps} from 'antd/lib/date-picker/interface'

import {FormError} from './FormError'

const FormInputWrapper = styled.div`
  position: relative;
`

interface Props extends PickerProps {
  name: string
}

export function FormDatePicker(props: Props) {
  const {name, ...otherProps} = props

  return (
    <Field name={name}>
      {({input, meta: {error, submitError, touched}}) => {
        const valid = !(touched && error) && !submitError
        const errorText = valid ? null : submitError || error

        return (
          <FormInputWrapper>
            <DatePicker {...input} {...otherProps} />
            {errorText && <FormError text={errorText} absolute={false} />}
          </FormInputWrapper>
        )
      }}
    </Field>
  )
}
