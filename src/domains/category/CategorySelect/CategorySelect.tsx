import React from 'react'
import {view} from 'react-easy-state'

import * as UI from '@/ui'

import {Category} from '../entity'
import {categoryStore} from '../store'

interface Props {
  classifierId: string
  onChange: (val: string | undefined) => void
  value: string
}

export const CategorySelect = view((props: Props) => {
  const {classifierId, onChange, value} = props
  const clCategory = categoryStore.clCategoryMap[classifierId]

  const selectedRowKeys = value ? [value] : []

  function selectRow(record: Category) {
    onChange(record.id)
  }

  function onSelectedRowKeysChange(keys: string[]) {
    onChange(keys[0])
  }

  return <div style={{maxHeight: '300px', overflow: 'auto'}} />
})
