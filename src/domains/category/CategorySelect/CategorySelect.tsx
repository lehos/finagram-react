import React from 'react'
import { view } from 'react-easy-state'

import * as Ui from '@/ui'

import { Category } from '../entity'
import { categoryStore } from '../store'

interface Props {
  classifierId: string
  name: string
}

export const CategorySelect = view((props: Props) => {
  const { classifierId, name } = props
  const clCategory = categoryStore.getCategoryTree(classifierId)

  // function selectRow(record: Category) {
  //   onChange(record.id)
  // }
  //
  // function onSelectedRowKeysChange(keys: string[]) {
  //   onChange(keys[0])
  // }

  return (
    <div style={{ flexGrow: 1 }}>
      <Ui.FormTreeSelect
        treeDefaultExpandAll
        titleField="name"
        name={name}
        treeOptions={clCategory}
        style={{ width: '100%' }}
      />
    </div>
  )
})
