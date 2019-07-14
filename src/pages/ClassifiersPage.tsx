import React, {useState} from 'react'
import {Button, Modal, Icon} from 'antd'

import {Spacer, PageHeader} from '@/ui'

import {ClassifiersTable, ClassifierForm} from '@/domains/classifier'

export default function ClassifiersPage() {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [classifierId, setClassifierId] = useState<string | null>(null)

  function openModal() {
    setIsFormVisible(true)
  }

  function hideModal() {
    setIsFormVisible(false)
  }

  function editClassifier(id: string) {
    setClassifierId(id)
    openModal()
  }

  function clearClassifierId() {
    setClassifierId(null)
  }

  return (
    <div>
      <PageHeader>
        Классификаторы
        <Spacer width={20} />
        <Button onClick={openModal} icon="plus">
          Добавить
        </Button>
      </PageHeader>

      <Modal
        title={classifierId ? 'Редактировать классификатор' : 'Добавить классификатор'}
        visible={isFormVisible}
        onCancel={hideModal}
        footer={null}
        afterClose={clearClassifierId}
        width={400}
      >
        <ClassifierForm
          onOk={hideModal}
          onCancel={hideModal}
          classifierId={classifierId}
        />
      </Modal>

      <ClassifiersTable onRowClick={editClassifier} />
    </div>
  )
}
