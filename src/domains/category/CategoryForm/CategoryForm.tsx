import React from 'react'

import * as Ui from '@/ui'
import { EntityForm } from '@/components'
import { PartialBy } from '@/utils'

import { categoryStore, FormCategoryList } from '..'
import { Category } from '../entity'

type Props = {
  onOk: () => any
  onCancel: () => any

  classifierId: string
  parentId: string | null
  category: Category | null
}

type Values = PartialBy<Category, 'id'>

function validate(values: Partial<Values>) {
  const errors = {} as Record<keyof Values, string>

  if (!values.name) {
    errors.name = 'Обязательное поле'
  }

  return errors
}

export function CategoryForm(props: Props) {
  const { category, classifierId, parentId } = props
  const isNew = !category

  function getInitialValues(): Values {
    return (
      category || {
        name: '',
        description: '',
        parentId: parentId || '123', // todo
        classifierId,
        type: 'default'
      }
    )
  }

  function create(values: Values) {
    categoryStore.create(values)
  }

  function remove() {
    categoryStore.remove(category!)
  }

  function update(values: Values) {
    return categoryStore.update({ ...values, id: values.id! })
  }

  return (
    <EntityForm<Values>
      onCancel={props.onCancel}
      onOk={props.onOk}
      validate={validate}
      initialValues={getInitialValues()}
      isNew={isNew}
      onCreate={create}
      onDelete={remove}
      onUpdate={update}
      isDeletable={!(category && category.parentId)}
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
