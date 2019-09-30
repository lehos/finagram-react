import React from 'react'
import { FormRenderProps, withTypes } from 'react-final-form'

import * as UI from '@/ui'

interface Values {
  input: string
  checkbox: boolean
  select: string
  radio: string
  number: number
  treeSelect: string
}

const options = [
  { value: '1', label: 'First item' },
  { value: '2', label: 'Second item' },
  { value: '3', label: 'Third item' }
]

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1'
      },
      {
        title: 'Child Node2',
        value: '0-0-2'
      }
    ]
  },
  {
    title: 'Node2',
    value: '0-1'
  }
]

export function FormPage() {
  function renderForm({ values }: FormRenderProps<Values>) {
    return (
      <div>
        <UI.FormInput name="input" />
        <br />

        <UI.FormSelect name="select" options={options} />
        <br />

        <UI.TreeSelect
          style={{ width: '100%' }}
          name="treeSelect"
          treeData={treeData}
        />
        <br />
        <br />

        <UI.FormCheckbox name="checkbox">Привет</UI.FormCheckbox>
        <br />

        <div>
          <UI.Form.Radio name="radio" options={options} />
        </div>
        <br />
        <UI.Form.DatePicker name="date" />
        <br />
        <UI.Form.InputNumber name="number" />

        <br />
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    )
  }

  const { Form } = withTypes<Values>()
  return (
    <div>
      <Form onSubmit={() => {}} render={formProps => renderForm(formProps)} />
    </div>
  )
}
