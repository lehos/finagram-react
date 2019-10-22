// todo move to storybook

import React from 'react'
import { FormRenderProps, withTypes } from 'react-final-form'

import * as Ui from '@/ui'

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
        <Ui.FormInput name="input" />
        <br />

        <Ui.FormSelect name="select" options={options} />
        <br />

        <Ui.TreeSelect
          style={{ width: '100%' }}
          treeData={treeData}
          value="123"
          onChange={() => {}}
        />
        <br />
        <br />

        <Ui.FormCheckbox name="checkbox">Привет</Ui.FormCheckbox>
        <br />

        <div>
          <Ui.FormRadio name="radio" options={options} />
        </div>
        <br />
        <Ui.FormDatePicker name="date" />
        <br />
        <Ui.FormInputNumber name="number" />

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
