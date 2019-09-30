import React from 'react'
import { Field } from 'react-final-form'
import { Radio as AntRadio } from 'antd'
import { RadioProps } from 'antd/lib/radio'

interface Props extends RadioProps {
  name: string
  options: {
    value: string
    label: string
  }[]
}
export function Radio(props: Props) {
  const { name, options, ...restProps } = props

  return (
    <Field name={name} type="checkbox">
      {({ input }) => {
        return (
          <AntRadio.Group {...input} {...restProps}>
            {options.map(el => (
              <AntRadio key={el.value} value={el.value}>
                {el.label}
              </AntRadio>
            ))}
          </AntRadio.Group>
        )
      }}
    </Field>
  )
}
