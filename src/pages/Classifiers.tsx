import React from 'react'
import { Button, Drawer } from 'antd'

import { Spacer, PageHeader } from '@/ui'
import { useEntityListPage } from '@/hooks'

import { Classifier, ClassifiersTable, ClassifierForm } from '@/domains/classifier'

export function Classifiers() {
  const { entity, modal } = useEntityListPage<Classifier>()

  return (
    <div>
      <PageHeader>
        <h1>Классификаторы</h1>
        <Spacer width={20} />
        <Button onClick={modal.show} icon="plus">
          Добавить
        </Button>
      </PageHeader>

      <Drawer
        title={`${entity.obj ? 'Редактирование' : 'Создание'} классификатора`}
        visible={modal.isVisible}
        onClose={modal.hide}
        width={400}
        afterVisibleChange={v => !v && entity.clear()}
      >
        <ClassifierForm onOk={modal.hide} classifier={entity.obj} />
      </Drawer>

      <ClassifiersTable onRowClick={entity.edit} />
    </div>
  )
}
