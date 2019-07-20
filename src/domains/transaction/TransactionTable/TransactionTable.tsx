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
        return row.type === 'expense' ? <span style={{color: 'red'}}>-{res}</span> : res
      },
      align: 'right'
    }
  ]

  classifierStore.classifierList.forEach(el => {
    columns.push({
      title: el.name,
      key: el.id,
      dataIndex: 'categoryItemId'
      // render: val =>  categoryStore.getCategory(val)
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
