import React, {useState} from 'react'
import {Button, Modal} from 'antd'

import {Spacer, PageHeader} from '@/ui'
import {useModal} from '@/hooks'

import {AccountsTable, AccountForm} from '@/domains/account'

export default function AccountsPage() {
  const {showModal, hideModal, isModalVisible} = useModal()
  const [accountId, setAccountId] = useState<string | null>(null)

  function editAccount(id: string) {
    setAccountId(id)
    showModal()
  }

  function clearAccountId() {
    setAccountId(null)
  }

  return (
    <div>
      <PageHeader>
        <h1>Счета</h1>
        <Spacer width={20} />
        <Button onClick={showModal} icon="plus">
          Добавить
        </Button>
      </PageHeader>

      <Modal
        title={`${accountId ? 'Редактирование' : 'Создание'} счета`}
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        afterClose={clearAccountId}
        width={400}
        centered
      >
        <AccountForm onOk={hideModal} onCancel={hideModal} accountId={accountId} />
      </Modal>

      <AccountsTable onRowClick={editAccount} />
    </div>
  )
}
