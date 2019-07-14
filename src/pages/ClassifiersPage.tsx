import React, {useState} from 'react'
import {Button, Modal} from 'antd'

import {Spacer, PageHeader} from '@/ui'
import {useModal} from '@/hooks';

import {ClassifiersTable, ClassifierForm} from '@/domains/classifier'

export default function ClassifiersPage() {
  const {showModal, hideModal, isModalVisible} = useModal()
  const [classifierId, setClassifierId] = useState<string | null>(null)

  function editClassifier(id: string) {
    setClassifierId(id)
    showModal()
  }

  function clearClassifierId() {
    setClassifierId(null)
  }

  return (
    <div>
      <PageHeader>
        Классификаторы
        <Spacer width={20} />
        <Button onClick={showModal} icon="plus">
          Добавить
        </Button>
      </PageHeader>

      <Modal
        title={`${classifierId ? 'Редактирование' : 'Создание'} классификатора`}
        visible={isModalVisible}
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
