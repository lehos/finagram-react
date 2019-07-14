import React from 'react'

import {Nav} from '@/components'

import * as S from './AuthLayout.styles'

type Props = {
  children: JSX.Element
}

export function AuthLayout(props: Props) {
  return (
    <S.AuthLayoutWrapper>
      <S.Sidebar>
        <Nav />
      </S.Sidebar>
      <S.Content>{props.children}</S.Content>
    </S.AuthLayoutWrapper>
  )
}
