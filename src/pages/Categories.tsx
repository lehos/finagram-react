import React, {useState} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {Button, Modal} from 'antd'

import {Spacer, PageHeader} from '@/ui'
import {useEntityPage} from '@/hooks'

import {CategoryTable, CategoryForm} from '@/domains/category'
import {classifierStore} from '@/domains/classifier'

type Params = {
  id: string
}

export function Categories(props: RouteComponentProps) {
  const {entity, modal} = useEntityPage()

  const [selectedId, setSelectedId] = useState<string | null>(null)

  const params = props.match.params as Params
  const classifier = classifierStore.classifierMap[params.id]

  if (!classifier) {
    return <>Категория не найдена</>
  }

  return (
    <div>
      <PageHeader>
        <h1>{classifier.namePlural}</h1>
        <Spacer width={20} />
        <Button onClick={modal.show} icon="plus">
          Добавить
        </Button>
      </PageHeader>

      <Modal
        title={`${classifier.name}: ${entity.id ? 'редактирование' : 'добавление'}`}
        visible={modal.visible}
        onCancel={modal.hide}
        footer={null}
        afterClose={entity.clear}
        width={400}
        centered
      >
        <CategoryForm
          onOk={modal.hide}
          onCancel={modal.hide}
          categoryId={entity.id}
          classifierId={classifier.id}
        />
      </Modal>

      <CategoryTable
        classifierId={params.id}
        onRowSelect={setSelectedId}
        onRowClick={entity.edit}
      />
    </div>
  )
}
