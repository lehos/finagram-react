import React, {ComponentType, useState} from 'react'
import {view} from 'react-easy-state'
import {Route, RouteComponentProps, RouteProps} from 'react-router-dom'
import {Layout} from 'antd'

import {AppLoader, Nav} from '@/components'

import * as S from './PrivateLayout.styles'
import {appStore} from '@/domains/common/appStore'

interface Props extends RouteProps {
  component: ComponentType<RouteComponentProps>
}

export const PrivateLayout = view(({component: Component, ...rest}: Props) => {
  const [collapsed, setCollapsed] = useState(false)

  if (!appStore.isInitialized) {
    appStore.initStores()
    return <AppLoader />
  }

  function onCollapse(val: boolean) {
    setCollapsed(val)
  }

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout style={{minHeight: '100vh'}}>
          <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <S.Sidebar>
              <Nav />
            </S.Sidebar>
          </Layout.Sider>
          <Layout style={{padding: '20px', background: '#fff'}}>
            <Component {...matchProps} />
          </Layout>
        </Layout>
      )}
    />
  )
})
