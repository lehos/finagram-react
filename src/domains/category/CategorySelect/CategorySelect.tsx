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
  const clCategory = categoryStore.clCategoryMap[classifierId]

  // function selectRow(record: Category) {
  //   onChange(record.id)
  // }
  //
  // function onSelectedRowKeysChange(keys: string[]) {
  //   onChange(keys[0])
  // }

  return (
    <div style={{ maxHeight: '300px', overflow: 'auto' }}>
      <Ui.FormTreeSelect
        treeDefaultExpandAll
        titleField="name"
        name={name}
        treeOptions={clCategory.children}
      />
    </div>
  )
})
