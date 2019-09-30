import React from 'react'
import { view } from 'react-easy-state'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { Category } from '../entity'
import { categoryStore } from '../store'
import * as S from './CategoryList.styles'

const columns: ColumnProps<Category>[] = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    render: (val, rec) => (
      <>
        {rec.name}
        <S.Descr>{rec.description}</S.Descr>
      </>
    )
  }
]

interface Props {
  classifierId: string
  onChange: (val: string | undefined) => void
  value: string
}

export const CategoryList = view((props: Props) => {
  const { classifierId, onChange, value } = props
  const clCategory = categoryStore.clCategoryMap[classifierId]

  const selectedRowKeys = value ? [value] : []

  function selectRow(record: Category) {
    onChange(record.id)
  }

  function onSelectedRowKeysChange(keys: string[]) {
    onChange(keys[0])
  }

  return (
    <div style={{ maxHeight: '300px', overflow: 'auto' }}>
      <Table<Category>
        dataSource={clCategory.children}
        columns={columns}
        size="small"
        rowKey="id"
        pagination={false}
        defaultExpandAllRows
        showHeader={false}
        // @ts-ignore
        rowSelection={{
          type: 'radio',
          onChange: onSelectedRowKeysChange,
          selectedRowKeys
        }}
        onRow={rec => ({
          onClick: () => {
            selectRow(rec)
          }
        })}
      />
    </div>
  )
})
