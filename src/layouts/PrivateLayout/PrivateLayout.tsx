import React, {ComponentType} from 'react'
import {view} from 'react-easy-state'
import {Route, RouteComponentProps, RouteProps} from 'react-router-dom'

import {AppLoader, Nav} from '@/components'

import * as S from './PrivateLayout.styles'
import {appStore} from '@/domains/common/appStore'

interface Props extends RouteProps {
  component: ComponentType<RouteComponentProps>
}

export const PrivateLayout = view(({component: Component, ...rest}: Props) => {
  if (!appStore.isInitialized) {
    appStore.initStores()
    return <AppLoader />
  }

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
})
