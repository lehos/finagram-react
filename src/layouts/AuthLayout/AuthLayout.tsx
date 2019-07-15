import React, {useState} from 'react'
import {Icon} from 'antd'

import {Nav} from '@/components'

import {initStore} from './initStore'

import * as S from './AuthLayout.styles'

type Props = {
  children: JSX.Element
}

export function AuthLayout(props: Props) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  if (!isInitialized) {
    initStore().then(() => {
      setIsInitialized(true)
    })
    return (
      <S.AppLoader>
        <Icon type="loading" style={{fontSize: 50}} />
        <br />
        <div>Loading your precious data...</div>
      </S.AppLoader>
    )
  }

  return (
    <S.AuthLayoutWrapper>
      <S.Sidebar>
        <Nav />
      </S.Sidebar>
      <S.Content>{props.children}</S.Content>
    </S.AuthLayoutWrapper>
  )
}
