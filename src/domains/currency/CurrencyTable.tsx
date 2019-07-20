import React from 'react'
import {Table, Icon} from 'antd'
import {ColumnProps} from 'antd/lib/table'
import {view} from 'react-easy-state'

import {Currency, currencyStore} from '.'

const columns: ColumnProps<Currency>[] = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Символ',
    dataIndex: 'symbol',
    key: 'symbol'
  }
]

type Props = {
  onRowClick?: (id: string) => any
}

export const CurrencyTable = view((props: Props) => {
  const {onRowClick} = props
  const {currencyList} = currencyStore

  if (currencyList.length === 0) {
    return <Icon type="loading" />
  }

  return (
    <Table<Currency>
      dataSource={currencyList}
      columns={columns}
      size="middle"
      rowKey="id"
      onRow={record => ({
        onClick: () => onRowClick && onRowClick(record.id)
      })}
      pagination={false}
    />
  )
})
