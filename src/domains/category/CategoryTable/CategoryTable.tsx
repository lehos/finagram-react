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
    title: 'Примечание',
    dataIndex: 'description',
    key: 'description'
  }
]

interface Props {
  classifierId: string
  onRowClick?: (category: Category) => void
  onRowSelect?: (key: string) => void
  size?: 'small' | 'middle'
}

export const CategoryTable = view((props: Props) => {
  const { classifierId, size = 'middle', onRowSelect, onRowClick } = props
  const categoryTree = categoryStore.getCategoryTree(classifierId)

  if (!categoryTree) {
    return <>Нет данных</>
  }

  return (
    <Table<Category>
      dataSource={categoryTree}
      columns={columns}
      size={size}
      rowKey="id"
      pagination={false}
      defaultExpandAllRows
      onRow={record => ({
        onClick: e => onRowClick && onRowClick(record)
      })}
      rowSelection={{
        type: 'checkbox',
        onChange: val => onRowSelect && onRowSelect(val[0] as string)
      }}
    />
  )
})
