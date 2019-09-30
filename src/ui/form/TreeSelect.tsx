import React from 'react'
import {Field} from 'react-final-form'
import {TreeSelect as AntTreeSelect} from 'antd'
import {TreeSelectProps} from 'antd/lib/tree-select'
import {Tree} from '@/domains/entity'

type TreeData = {
  title: string
  value: string
  children?: TreeData[]
}

interface Props extends TreeSelectProps<any> {
  name: string
  treeData?: TreeData[]
  treeOptions?: Tree[]
  titleField?: string
}

export function convertTreeToAntFormat(tree: Tree[], title?: string): TreeData[] {
  return tree.map(el => {
    const res: TreeData = {
      // @ts-ignore
      title: el[title || 'id'],
      value: el.id
    }

    if (el.children) {
      res.children = convertTreeToAntFormat(el.children, title)
    }

    return res
  })
}

export function TreeSelect(props: Props) {
  const {name, treeOptions, treeData, titleField, ...restProps} = props

  const localTreeData = treeOptions
    ? convertTreeToAntFormat(treeOptions, titleField)
    : treeData

  return (
    <Field name={name}>
      {({input}) => (
        <AntTreeSelect {...input} treeData={localTreeData} {...restProps} />
      )}
    </Field>
  )
}
