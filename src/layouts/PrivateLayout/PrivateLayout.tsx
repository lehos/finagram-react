import React, {ComponentType} from 'react'
import {Route, RouteComponentProps, RouteProps} from 'react-router-dom'

import {Nav} from '@/components'

import * as S from './PrivateLayout.styles'

interface Props extends RouteProps {
  component: ComponentType<RouteComponentProps>
}

export function PrivateLayout({component: Component, ...rest}: Props) {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <S.PrivateLayoutWrapper>
          <S.Sidebar>
            <Nav />
          </S.Sidebar>
          <S.Content>
            <Component {...matchProps} />
          </S.Content>
        </S.PrivateLayoutWrapper>
      )}
    />
  )
}
