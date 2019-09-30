import React from 'react'
import { Table, Icon } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { view } from 'react-easy-state'

import { Classifier } from '.'
import { classifierStore } from './store'

const columns: ColumnProps<Classifier>[] = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Название множ.',
    dataIndex: 'namePlural',
    key: 'namePlural'
  },
  {
    title: 'Разделять по типу операции',
    dataIndex: 'split',
    key: 'split',
    render: val => val && '✓'
  },
  {
    title: 'Использовать в переводах',
    dataIndex: 'useInTransfer',
    key: 'useInTransfer',
    render: val => val && '✓'
  }
]

type Props = {
  onRowClick: (classifierId: string) => any
}

export const ClassifiersTable = view((props: Props) => {
  const { onRowClick } = props
  const { classifierList } = classifierStore

  if (classifierList.length === 0) {
    return <Icon type="loading" />
  }

  return (
    <Table<Classifier>
      dataSource={classifierList}
      columns={columns}
      size="middle"
      rowKey="id"
      onRow={record => ({
        onClick: () => onRowClick(record.id)
      })}
      pagination={false}
    />
  )
})
