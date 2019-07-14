import React from 'react'
import {DatePicker} from 'antd'
import {FormRenderProps, withTypes} from 'react-final-form'

import {FormInput, FormCheckbox, FormSelect} from '@/ui'

interface Values {
  input: string
  checkbox: boolean
}

const options = [
  {value: '1', label: 'First item'},
  {value: '2', label: 'Second item'}
]

export default function IndexPage() {
  function renderForm({values}: FormRenderProps<Values>) {
    return (
      <div>
        <FormInput name="input" />
        <FormCheckbox name="checkbox">Привет</FormCheckbox>
        <FormSelect name="select" options={options} />

        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    )
  }

  const {Form} = withTypes<Values>()
  return (
    <div>
      <DatePicker />

      <Form
        onSubmit={() => {}}
        render={formProps => {
          return renderForm(formProps)
        }}
      />
    </div>
  )
}
