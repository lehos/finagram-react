import React from 'react'
import {view} from 'react-easy-state'
import {Field} from 'react-final-form'

import {CategoryList} from './CategoryList'

interface Props {
  classifierId: string
  onRowSelect?: (key: string) => any
  name: string
}

export const FormCategoryList = view((props: Props) => {
  const {name, ...rest} = props
  return (
    <Field name={name}>
      {({input}) => {
        return <CategoryList {...input} {...rest} />
      }}
    </Field>
  )
})
