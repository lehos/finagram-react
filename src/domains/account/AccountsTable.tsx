import React from 'react'
import {Table, Icon} from 'antd'
import {ColumnProps} from 'antd/lib/table'
import {view} from 'react-easy-state'

import {formatMoney} from '@/services/money'

import {Account} from '.'
import {accountStore} from './store'
import {currencyStore} from '@/domains/currency'

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
    render: val => currencyStore.currencies[val].symbol
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
  onRowClick: (accountId: string) => any
}

export const AccountsTable = view((props: Props) => {
  const {onRowClick} = props
  const {accountsArr} = accountStore

  if (accountsArr.length === 0) {
    return <Icon type="loading" />
  }

  return (
    <Table<Account>
      dataSource={accountsArr}
      columns={columns}
      size="middle"
      rowKey="id"
      onRow={record => ({
        onClick: e => onRowClick(record.id)
      })}
      pagination={false}
    />
  )
})
