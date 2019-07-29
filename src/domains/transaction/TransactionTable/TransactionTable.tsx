import React from 'react'
import {view} from 'react-easy-state'
import {Table} from 'antd'
import {ColumnProps} from 'antd/lib/table'

import {formatMoney} from '@/services/money'
import {accountStore} from '@/domains/account'
import {classifierStore} from '@/domains/classifier'
import {categoryStore} from '@/domains/category'

import {Transaction} from '../entity'
import {transactionStore} from '../store'

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

        // todo add +- in transfer
        return row.type === 'expense' || row.type === 'transfer' ? (
          <span style={{color: 'red'}}>-{res}</span>
        ) : row.type === 'income' ? (
          <span style={{color: 'green'}}>+{res}</span>
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
      render: (val, row) => {
        const id = row.type === 'transfer' ? row.fromAccountId : val
        return accountStore.accounts[id!].name
      }
    }
  ]

  classifierStore.classifierList.forEach(classifier => {
    columns.push({
      title: classifier.name,
      key: classifier.id,
      dataIndex: 'categories',
      render: (_, row) => {
        if (row.type === 'balance') {
          return ''
        }

        const category = row.categories.find(c => c.classifierId === classifier.id)

        if (!category) {
          return ''
        }

        return (
          category && categoryStore.categoryItemMap[category.categoryItemId].name
        )
      }
    })
  })

  columns.push(
    {
      title: 'Корреспондент',
      dataIndex: 'toAccountId',
      key: 'toAccountId',
      render: val => val && accountStore.accounts[val].name
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
  onRowClick?: (id: string) => any
}

export const TransactionTable = view((props: Props) => {
  return (
    <Table<Transaction>
      dataSource={transactionStore.transactionList}
      columns={makeColumns()}
      size="middle"
      rowKey="id"
      pagination={false}
    />
  )
})
