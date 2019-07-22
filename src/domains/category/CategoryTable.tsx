import React from 'react'
import {view} from 'react-easy-state'
import {Table} from 'antd'
import {ColumnProps} from 'antd/lib/table'

import {CategoryItem} from './entity'
import {categoryStore} from './store'

const columns: ColumnProps<CategoryItem>[] = [
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
  const {classifierId, size = 'middle', onRowSelect} = props
  const category = categoryStore.getCategory(classifierId)

  if (!category) {
    return <>Нет данных</>
  }

  return (
    <Table<CategoryItem>
      dataSource={category.children}
      columns={columns}
      size={size}
      rowKey="id"
      pagination={false}
      defaultExpandAllRows
      rowSelection={{
        type: 'radio',
        onChange: val => onRowSelect && onRowSelect(val[0] as string)
      }}
    />
  )
})
