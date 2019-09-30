import React from 'react'
import { view } from 'react-easy-state'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { Category } from '../entity'
import { categoryStore } from '../store'

const columns: ColumnProps<Category>[] = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description'
  }
]

interface Props {
  classifierId: string
  onRowClick?: (id: string) => any
  onRowSelect?: (key: string) => any
  size?: 'small' | 'middle'
}

export const CategoryTable = view((props: Props) => {
  const { classifierId, size = 'middle', onRowSelect, onRowClick } = props
  const clCategory = categoryStore.clCategoryMap[classifierId]

  if (!clCategory) {
    return <>Нет данных</>
  }

  return (
    <Table<Category>
      dataSource={clCategory.children}
      columns={columns}
      size={size}
      rowKey="id"
      pagination={false}
      defaultExpandAllRows
      onRow={record => ({
        onClick: e => onRowClick && onRowClick(record.id)
      })}
      rowSelection={{
        type: 'checkbox',
        onChange: val => onRowSelect && onRowSelect(val[0] as string)
      }}
    />
  )
})
