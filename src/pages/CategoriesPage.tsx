import React, {useState} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {Button, Modal} from 'antd'

import {Spacer, PageHeader} from '@/ui'
import {useModal} from '@/hooks'

import {CategoryTable} from '@/domains/category'
import {classifierStore} from '@/domains/classifier'

type Params = {
  id: string
}

export function CategoriesPage(props: RouteComponentProps) {
  const {showModal, hideModal, isModalVisible} = useModal()
  const [entityId, setEntityId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const params = props.match.params as Params
  const classifier = classifierStore.classifierMap[params.id]

  function edit(id: string) {
    setEntityId(id)
    showModal()
  }

  function clearId() {
    setEntityId(null)
  }

  if (!classifier) {
    return <>Категория не найдена</>
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
        title={`${entityId ? 'Редактирование' : 'Создание'} категории`}
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        afterClose={clearId}
        width={400}
        centered
      >
        hello
      </Modal>

      <CategoryTable classifierId={params.id} onRowSelect={id => setSelectedId(id)} />
    </div>
  )
}
