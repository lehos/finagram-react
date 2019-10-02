import React from 'react'
import { Table, Icon } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { view } from 'react-easy-state'

import { formatMoney } from '@/services/money'
import { currencyStore } from '@/domains/currency'

import { Account, accountStore } from '.'

const columns: ColumnProps<Account>[] = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Валюта',
    dataIndex: 'currencyId',
    key: 'currencyId',
    render: val => currencyStore.currencyMap[val].symbol
  },
  {
    title: 'Баланс',
    dataIndex: 'balance',
    key: 'balance',
    render: val => formatMoney(val),
    align: 'right'
  }
]

type Props = {
  onRowClick: (account: Account) => any
}

export const AccountsTable = view((props: Props) => {
  const { onRowClick } = props
  const { accountsList } = accountStore

  if (accountsList.length === 0) {
    return <Icon type="loading" />
  }

  return (
    <Table<Account>
      dataSource={accountsList}
      columns={columns}
      size="middle"
      rowKey="id"
      onRow={record => ({
        onClick: _ => onRowClick(record)
      })}
      pagination={false}
    />
  )
})
