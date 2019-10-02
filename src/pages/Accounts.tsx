import React from 'react'
import { Button, Modal } from 'antd'

import { Spacer, PageHeader } from '@/ui'
import { useEntityListPage } from '@/hooks'
import { AccountsTable, AccountForm, Account } from '@/domains/account'

export function Accounts() {
  const { entity, modal } = useEntityListPage<Account>()

  return (
    <div>
      <PageHeader>
        <h1>Счета</h1>
        <Spacer width={20} />
        <Button onClick={modal.show} icon="plus">
          Добавить
        </Button>
      </PageHeader>

      <Modal
        title={`${entity.id ? 'Редактирование' : 'Создание'} счета`}
        visible={modal.visible}
        onCancel={modal.hide}
        footer={null}
        afterClose={entity.clear}
        width={400}
        centered
      >
        <AccountForm onOk={modal.hide} account={entity.obj} />
      </Modal>

      <AccountsTable onRowClick={entity.editObj} />
    </div>
  )
}
