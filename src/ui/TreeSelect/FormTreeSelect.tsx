import React from 'react'
import { Field } from 'react-final-form'

import { TreeSelect, Props } from './TreeSelect'

type FormProps = Omit<Props, 'value' | 'onChange'> & {
  name: string
}

export function FormTreeSelect(props: FormProps) {
  const { name, ...restProps } = props

  return (
    <Field name={name}>
      {({ input }) => <TreeSelect {...input} {...restProps} />}
    </Field>
  )
}
