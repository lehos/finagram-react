import React, {useState} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {Button, Modal} from 'antd'

import {Spacer, PageHeader} from '@/ui'
import {useModal} from '@/hooks'

import {ClassifierDataTable} from '@/domains/classifierData'
import {classifierStore} from '@/domains/classifier'

type Params = {
  id: string
}

export default function ClassifiersPage(props: RouteComponentProps) {
  const params = props.match.params as Params

  const classifier = classifierStore.classifiers[params.id]

  return (
    <div>
      <PageHeader>
        <h1>{classifier.namePlural}</h1>
      </PageHeader>

      <ClassifierDataTable classifierId={params.id} />
    </div>
  )
}
