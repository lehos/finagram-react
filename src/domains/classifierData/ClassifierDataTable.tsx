import React from 'react'
import {view} from 'react-easy-state'
import {Table} from 'antd'
import {ColumnProps} from 'antd/lib/table'

import {ClassifierDataItem} from './entity'
import {classifierDataStore} from './store'

const columns: ColumnProps<ClassifierDataItem>[] = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description'
  }
]

interface Props {
  classifierId: string
  onRowClick?: (id: string) => any
}

export const ClassifierDataTable = view((props: Props) => {
  const {classifierId} = props
  const classifierData = classifierDataStore.getClassifierData(classifierId)

  if (!classifierData) {
    return <>Нет данных</>
  }

  return (
    <Table<ClassifierDataItem>
      dataSource={classifierData.children}
      columns={columns}
      size="middle"
      rowKey="id"
      pagination={false}
      defaultExpandedRowKeys={['12', '13']}
    />
  )
})
