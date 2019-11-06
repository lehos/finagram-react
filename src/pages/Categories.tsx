import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Drawer } from 'antd'

import { Spacer, PageHeader } from '@/ui'
import { useEntityListPage } from '@/hooks'
import { ErrorBoundary } from '@/components'
import { CategoryTable, CategoryForm } from '@/domains/category'
import { classifierStore } from '@/domains/classifier'

type RouteParams = {
  id: string
}

export function Categories() {
  const { id } = useParams<RouteParams>()
  const { entity, modal } = useEntityListPage()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const classifier = classifierStore.get(id)

  if (!classifier) {
    return <>Классификатор не найден</>
  }

  return (
    <ErrorBoundary>
      <PageHeader>
        <h1>{classifier.namePlural}</h1>
        <Spacer width={20} />
        <Button onClick={modal.show} icon="plus">
          Добавить
        </Button>
      </PageHeader>

      <Drawer
        title={`${classifier.name}: ${entity.obj ? 'редактирование' : 'добавление'}`}
        visible={modal.isVisible}
        onClose={modal.hide}
        width={500}
        afterVisibleChange={v => !v && entity.clear()}
      >
        <CategoryForm
          onOk={modal.hide}
          onCancel={modal.hide}
          category={entity.obj}
          classifierId={classifier.id}
          parentId={selectedId}
        />
      </Drawer>

      <CategoryTable
        classifierId={id}
        onRowSelect={setSelectedId}
        // todo
        // @ts-ignore
        onRowClick={entity.edit}
      />
    </ErrorBoundary>
  )
}
