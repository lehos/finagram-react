import React from 'react'
import {Table} from 'antd'
import {ColumnProps} from 'antd/lib/table'

import {Classifier} from '.'

const dataSource: Classifier[] = [
  {
    id: '1',
    key: '1',
    name: 'Статья',
    split: true,
    namePlural: 'Статьи',
    useInTransfer: false,
    data: null
  },
  {
    id: '2',
    key: '2',
    name: 'Агент',
    split: false,
    namePlural: 'Агенты',
    useInTransfer: true,
    data: null
  }
]

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

export function ClassifiersTable() {
  return <Table<Classifier> dataSource={dataSource} columns={columns} />
}
