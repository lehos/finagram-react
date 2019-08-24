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
  const clCategory = categoryStore.clCategoryMap[classifierId]

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<string[]>([])

  if (!clCategory) {
    return <>Нет данных</>
  }

  function selectRow(record: Category) {
    const res = selectedRowKeys.indexOf(record.id) >= 0 ? [] : [record.id]
    setSelectedRowKeys(res)
    onRowSelect && onRowSelect(res[0])
  }

  function onSelectedRowKeysChange(keys: string[]) {
    setSelectedRowKeys(keys)
  }

  return (
    <Table<Category>
      dataSource={clCategory.children}
      columns={columns}
      size="small"
      rowKey="id"
      pagination={false}
      defaultExpandAllRows
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
  )
})
