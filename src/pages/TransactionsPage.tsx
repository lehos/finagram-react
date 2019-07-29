import React from 'react'
import {Button, Modal} from 'antd'

import {TransactionTable, TransactionForm} from '@/domains/transaction'
import {PageHeader, Spacer} from '@/ui'
import {useEntityPage} from '@/hooks'

export function TransactionsPage() {
  const {entity, modal} = useEntityPage()

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
        title={`${entity.id ? 'Редактирование' : 'Добавление'} операции`}
        visible={modal.visible}
        onCancel={modal.hide}
        footer={null}
        afterClose={entity.clear}
        width={400}
        centered
      >
        <TransactionForm />
      </Modal>

      <TransactionTable onRowClick={entity.edit} />
    </div>
  )
}
