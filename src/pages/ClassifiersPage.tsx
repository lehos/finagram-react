import React, {useState} from 'react'
import {Button, Modal, Icon} from 'antd'

import {Spacer, PageHeader} from '@/ui'

import {ClassifiersTable, ClassifierForm} from '@/domains/classifier'

export default function ClassifiersPage() {
  const [isFormVisible, setIsFormVisible] = useState(false)

  function toggleModal() {
    setIsFormVisible(!isFormVisible)
  }

  return (
    <div>
      <PageHeader>
        Классификаторы
        <Spacer width={20} />
        <Button onClick={toggleModal} icon="plus">
          Добавить
        </Button>
      </PageHeader>

      <Modal
        title="Добавить классификатор"
        visible={isFormVisible}
        onOk={toggleModal}
        onCancel={toggleModal}
        footer={null}
      >
        <ClassifierForm onOk={toggleModal} />
      </Modal>

      <ClassifiersTable />
    </div>
  )
}
