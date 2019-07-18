import React, {useState} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {Button, Modal} from 'antd'

import {Spacer, PageHeader} from '@/ui'
import {useModal} from '@/hooks'

import {ClassifierDataTable} from '@/domains/classifierData'
import {classifierStore} from '@/domains/classifier'
import {AccountForm} from '@/domains/account'

import {ErrorBoundary} from '@/components'

type Params = {
  id: string
}

export default function ClassifiersPage(props: RouteComponentProps) {
  const {showModal, hideModal, isModalVisible} = useModal()
  const [entityId, setEntityId] = useState<string | null>(null)

  const params = props.match.params as Params
  const classifier = classifierStore.classifiers[params.id]

  function edit(id: string) {
    setEntityId(id)
    showModal()
  }

  function clearId() {
    setEntityId(null)
  }

  if (!classifier) {
    return <>Классификатор не найден</>
  }

  return (
    <div>
      <PageHeader>
        <h1>{classifier.namePlural}</h1>
        <Spacer width={20} />
        <Button onClick={showModal} icon="plus">
          Добавить
        </Button>
      </PageHeader>

      <Modal
        title={`${entityId ? 'Редактирование' : 'Создание'} классификатора`}
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        afterClose={clearId}
        width={400}
        centered
      >
        hello
      </Modal>

      <ClassifierDataTable classifierId={params.id} />
    </div>
  )
}
