import React, {useState} from 'react'
import {Button, Modal} from 'antd'

import {TransactionTable, TransactionForm, Transaction} from '@/domains/transaction'
import {PageHeader, Spacer} from '@/ui'
import {useEntityPage, useModal} from '@/hooks'

export function Transactions() {
  const {showModal, hideModal, isModalVisible} = useModal()

  const {entity} = useEntityPage()
  const [transaction, setTransaction] = useState<Transaction | null>(null)

  function onRowClick(obj: Transaction) {
    setTransaction(obj)
    showModal()
  }

  return (
    <div>
      <PageHeader>
        <h1>Операции</h1>
        <Spacer width={20} />
        <Button onClick={showModal} icon="plus">
          Добавить
        </Button>
      </PageHeader>

      <Modal
        title={`${entity.id ? 'Редактирование' : 'Добавление'} операции`}
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        afterClose={entity.clear}
        width={400}
        centered
      >
        <TransactionForm
          onOk={hideModal}
          onCancel={hideModal}
          transaction={transaction}
        />
      </Modal>

      <TransactionTable onRowClick={onRowClick} />
    </div>
  )
}
