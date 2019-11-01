import React from 'react'
import { Field } from 'react-final-form'
import styled from '@emotion/styled'
import { DatePicker } from 'antd'
import { PickerProps } from 'antd/lib/date-picker/interface'
import moment from 'moment'

const FormInputWrapper = styled.div`
  position: relative;
`

interface Props extends PickerProps {
  name: string
  format?: string
}

export function FormDatePicker(props: Props) {
  const { name, format = 'DD.MM.YYYY', ...otherProps } = props

  return (
    <Field name={name}>
      {({ input: { value, onChange, ...otherInput } }) => {
        const val = value ? moment(value, format) : undefined

        return (
          <FormInputWrapper>
            <DatePicker
              value={val}
              onChange={(momentVal, dateStringVal) => onChange(dateStringVal)}
              {...otherInput}
              {...otherProps}
              format={format}
            />
          </FormInputWrapper>
        )
      }}
    </Field>
  )
}
