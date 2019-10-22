import React from 'react'
import { Form } from 'react-final-form'
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react'

import { FormTreeSelect, TreeSelect } from '.'

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

const treeOptions = [
  {
    id: '1',
    children: [
      {
        id: '1-1'
      },
      {
        id: '1-2'
      }
    ]
  },
  {
    id: '2',
    children: [
      {
        id: '2-1'
      },
      {
        id: '2-2'
      }
    ]
  }
]

storiesOf('TreeSelect', module)
  .add('Tree data', () => (
    <TreeSelect treeData={treeData} value="0-0-1" onChange={() => {}} />
  ))
  .add('Tree options', () => (
    <TreeSelect treeOptions={treeOptions} value="2-1" onChange={() => {}} />
  ))
  .add('Expanded', () => (
    <TreeSelect
      treeOptions={treeOptions}
      value="2-1"
      onChange={() => {}}
      treeDefaultExpandAll
    />
  ))
  .add('FormTreeSelect', () => (
    <Form initialValues={{ tree: '0-0' }} onSubmit={() => {}}>
      {() => (
        <FormTreeSelect style={{ width: '100%' }} treeData={treeData} name="tree" />
      )}
    </Form>
  ))
