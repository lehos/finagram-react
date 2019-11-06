import React from 'react'
import { TreeSelect as AntTreeSelect } from 'antd'
import { TreeSelectProps } from 'antd/lib/tree-select'
import { Tree } from '@/domains/entity'

type TreeData = {
  title: string
  value: string
  children?: TreeData[]
}

export function convertTreeToAntFormat(tree: Tree, title?: string): TreeData[] {
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

export interface Props extends TreeSelectProps<any> {
  treeData?: TreeData[]
  treeOptions?: Tree
  titleField?: string
  value: string
  onChange: (val: string) => void
}

export function TreeSelect(props: Props) {
  const { treeOptions, treeData, titleField, ...restProps } = props

  const localTreeData = treeOptions
    ? convertTreeToAntFormat(treeOptions, titleField)
    : treeData

  return <AntTreeSelect treeData={localTreeData} {...restProps} />
}
