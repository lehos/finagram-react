import React from 'react'

import * as UI from '@/ui'
import {EntityForm} from '@/components'

import {categoryStore} from '..'

type Props = {
  onOk: () => any
  onCancel: () => any

  categoryId?: string | null
  classifierId: string
}

type Values = {
  name: string
  description: string
}

function getInitialValues(id?: string | null): Values {
  if (!id) {
    return {name: '', description: ''}
  }
  const category = categoryStore.categoryMap[id]
  return {
    name: category.name,
    description: category.description
  }
}

function validate(values: Partial<Values>) {
  const errors = {} as Record<keyof Values, string>

  if (!values.name) {
    errors.name = 'Обязательное поле'
  }

  return errors
}

export function CategoryForm(props: Props) {
  const {categoryId, classifierId} = props

  const category = categoryId ? categoryStore.categoryMap[categoryId] : null

  function onCreate(values: Values) {
    categoryStore.create(values, classifierId)
  }

  function onDelete() {
    categoryStore.deleteCategory(categoryId!, classifierId)
  }

  function onUpdate(values: Values) {
    return categoryStore.update({id: categoryId!, ...values})
  }

  return (
    <EntityForm<Values>
      onCancel={props.onCancel}
      onOk={props.onOk}
      validate={validate}
      getInitialValues={() => getInitialValues(categoryId)}
      isNew={!categoryId}
      onCreate={onCreate}
      onDelete={onDelete}
      onUpdate={onUpdate}
      isDeleteBtnHidden={!(category && category.parentId)}
      formInner={
        <>
          <UI.FormRow>
            <UI.FormLabel>Название</UI.FormLabel>
            <UI.FormInput name="name" placeholder="Название" autoComplete="off" />
          </UI.FormRow>

          <UI.FormRow>
            <UI.FormLabel>Примечание</UI.FormLabel>
            <UI.FormInput
              name="description"
              placeholder="Примечание"
              autoComplete="off"
            />
          </UI.FormRow>
        </>
      }
    />
  )
}
