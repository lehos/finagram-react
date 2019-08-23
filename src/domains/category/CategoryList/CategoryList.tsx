import React from 'react'
import {view} from 'react-easy-state'
import {Table} from 'antd'
import {ColumnProps} from 'antd/lib/table'

import {Category} from '../entity'
import {categoryStore} from '../store'
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
  onRowSelect?: (key: string) => any
}

export const CategoryList = view((props: Props) => {
  const {classifierId, onRowSelect} = props
  const clfCategory = categoryStore.clfCategoryMap[classifierId]

  if (!clfCategory) {
    return <>Нет данных</>
  }

  return (
    <Table<Category>
      dataSource={clfCategory.children}
      columns={columns}
      size="small"
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
