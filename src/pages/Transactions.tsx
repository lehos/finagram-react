import React from 'react'
import { Button, Drawer } from 'antd'

import {
  TransactionTable,
  TransactionForm,
  Transaction
} from '@/domains/transaction'
import { PageHeader, Spacer } from '@/ui'
import { useEntityListPage } from '@/hooks'
import { ErrorBoundary } from '@/components'

export function Transactions() {
  const { entity, modal } = useEntityListPage<Transaction>()

  return (
    <ErrorBoundary>
      <PageHeader>
        <h1>Операции</h1>
        <Spacer width={20} />
        <Button onClick={modal.show} icon="plus">
          Добавить
        </Button>
      </PageHeader>

      <Drawer
        title={`${entity.obj ? 'Редактирование' : 'Добавление'} операции`}
        visible={modal.isVisible}
        onClose={modal.hide}
        width={500}
        afterVisibleChange={v => !v && entity.clear()}
      >
        <TransactionForm
          onOk={modal.hide}
          onCancel={modal.hide}
          transaction={entity.obj}
        />
      </Drawer>

      <TransactionTable onRowClick={entity.edit} />
    </ErrorBoundary>
  )
}
