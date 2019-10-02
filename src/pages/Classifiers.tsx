import React from 'react'
import { Button, Modal } from 'antd'

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

      <Modal
        title={`${entity.id ? 'Редактирование' : 'Создание'} классификатора`}
        visible={modal.visible}
        onCancel={modal.hide}
        footer={null}
        afterClose={entity.clear}
        width={400}
        centered
      >
        <ClassifierForm onOk={modal.hide} classifier={entity.obj} />
      </Modal>

      <ClassifiersTable onRowClick={entity.editObj} />
    </div>
  )
}
