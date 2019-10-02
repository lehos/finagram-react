import React from 'react'
import { Button, Modal } from 'antd'

import {
  TransactionTable,
  TransactionForm,
  Transaction
} from '@/domains/transaction'
import { PageHeader, Spacer } from '@/ui'
import { useEntityListPage } from '@/hooks'

export function Transactions() {
  const { entity, modal } = useEntityListPage<Transaction>()

  return (
    <div>
      <PageHeader>
        <h1>Операции</h1>
        <Spacer width={20} />
        <Button onClick={modal.show} icon="plus">
          Добавить
        </Button>
      </PageHeader>

      <Modal
        title={`${entity.obj ? 'Редактирование' : 'Добавление'} операции`}
        visible={modal.visible}
        onCancel={modal.hide}
        footer={null}
        afterClose={entity.clear}
        centered
      >
        <TransactionForm
          onOk={modal.hide}
          onCancel={modal.hide}
          transaction={entity.obj}
        />
      </Modal>

      <TransactionTable onRowClick={entity.editObj} />
    </div>
  )
}
