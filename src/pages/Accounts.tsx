import React from 'react'
import { Button, Drawer } from 'antd'

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

      <Drawer
        title={`${entity.obj ? 'Редактирование' : 'Создание'} счета`}
        visible={modal.isVisible}
        closable
        width={400}
        onClose={modal.hide}
        afterVisibleChange={v => !v && entity.clear()}
      >
        <AccountForm onOk={modal.hide} account={entity.obj} />
      </Drawer>

      <AccountsTable onRowClick={entity.edit} />
    </div>
  )
}
