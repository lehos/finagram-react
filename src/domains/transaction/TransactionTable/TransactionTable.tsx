import React from 'react'
import { view } from 'react-easy-state'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { formatMoney } from '@/services/money'
import { accountStore } from '@/domains/account'
import { classifierStore } from '@/domains/classifier'
import { categoryStore } from '@/domains/category'

import { Transaction } from '../entity'
import { transactionStore } from '../store'

// todo decompose
function makeColumns() {
  const columns: ColumnProps<Transaction>[] = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Сумма',
      key: 'sum',
      dataIndex: 'sum',
      render: (val, row) => {
        const res = formatMoney(val)

        return row.type === 'expense' || row.type === 'transfer' ? (
          <span style={{ color: 'red' }}>-{res}</span>
        ) : row.type === 'income' ? (
          <span style={{ color: 'green' }}>+{res}</span>
        ) : (
          res
        )
      },
      align: 'right'
    },
    {
      title: 'Счет',
      key: 'accountId',
      dataIndex: 'accountId',
      render: val => accountStore.accountsMap[val].name
    }
  ]

  classifierStore.classifierList.forEach(classifier => {
    columns.push({
      title: classifier.name,
      key: classifier.id,
      dataIndex: 'categories',
      render: (_, transaction) => {
        if (transaction.type === 'balance') {
          return ''
        }

        const categoryId = transaction.categories![classifier.id]

        return categoryId ? categoryStore.get(classifier.id, categoryId).name : ''
      }
    })
  })

  columns.push(
    {
      title: 'Корреспондент',
      dataIndex: 'targetAccountId',
      key: 'targetAccountId',
      render: val => val && accountStore.get(val).name
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description'
    }
  )

  return columns
}

interface Props {
  onRowClick?: (obj: Transaction) => any
}

export const TransactionTable = view((props: Props) => {
  const { onRowClick } = props

  return (
    <Table<Transaction>
      dataSource={transactionStore.transactionList}
      columns={makeColumns()}
      size="middle"
      rowKey="id"
      pagination={false}
      rowSelection={{
        type: 'checkbox'
      }}
      onRow={record => ({
        onClick: e => onRowClick && onRowClick(record)
      })}
    />
  )
})
