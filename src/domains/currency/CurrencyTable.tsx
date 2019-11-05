import React from 'react'
import { view } from 'react-easy-state'
import { Table, Icon } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { Currency, currencyStore } from '.'

const columns: ColumnProps<Currency>[] = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Символ',
    dataIndex: 'short',
    key: 'short'
  }
]

export const CurrencyTable = view(() => {
  const { currencyList } = currencyStore

  if (currencyList.length === 0) {
    return <Icon type="loading" />
  }

  return (
    <Table<Currency>
      dataSource={currencyList}
      columns={columns}
      size="middle"
      rowKey="id"
      pagination={false}
    />
  )
})
