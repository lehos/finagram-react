import React from 'react'

import * as Ui from '@/ui'
import { EntityForm } from '@/components'

import { categoryStore, FormCategoryList } from '..'

type Props = {
  onOk: () => any
  onCancel: () => any

  categoryId?: string | null
  classifierId: string
  parentId: string | null
}

type Values = {
  name: string
  description: string
  parentId: string | null
}

function validate(values: Partial<Values>) {
  const errors = {} as Record<keyof Values, string>

  if (!values.name) {
    errors.name = 'Обязательное поле'
  }

  return errors
}

export function CategoryForm(props: Props) {
  const { categoryId, classifierId, parentId } = props
  const category = categoryId ? categoryStore.categoryMap[categoryId] : null
  const isNew = !categoryId

  function getInitialValues(): Values {
    return category
      ? {
          name: category.name,
          description: category.description,
          parentId: parentId || category.parentId
        }
      : {
          name: '',
          description: '',
          parentId: categoryStore.clCategoryMap[classifierId].children[0].id
        }
  }

  function onCreate(values: Values) {
    categoryStore.create(values)
  }

  function onDelete() {
    categoryStore.deleteCategory(categoryId!, classifierId)
  }

  function onUpdate(values: Values) {
    return categoryStore.update({ id: categoryId!, ...values })
  }

  return (
    <EntityForm<Values>
      onCancel={props.onCancel}
      onOk={props.onOk}
      validate={validate}
      initialValues={getInitialValues()}
      isNew={isNew}
      onCreate={onCreate}
      onDelete={onDelete}
      onUpdate={onUpdate}
      isDeleteBtnHidden={!(category && category.parentId)}
      formInner={
        <>
          <Ui.Form.Row>
            <Ui.Form.Label>Название</Ui.Form.Label>
            <Ui.FormInput name="name" placeholder="Название" autoComplete="off" />
          </Ui.Form.Row>

          <Ui.Form.Row>
            <Ui.Form.Label>Примечание</Ui.Form.Label>
            <Ui.FormInput
              name="description"
              placeholder="Примечание"
              autoComplete="off"
            />
          </Ui.Form.Row>

          {(isNew || (category && category.parentId)) && (
            <Ui.Form.Row>
              <Ui.Form.Label>Родитель</Ui.Form.Label>

              <FormCategoryList classifierId={classifierId} name="parentId" />
            </Ui.Form.Row>
          )}
        </>
      }
    />
  )
}
