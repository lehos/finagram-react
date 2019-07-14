import React from 'react'
import {Link, RouteComponentProps, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd'

function Nav(props: RouteComponentProps) {
  return (
    <Menu
      style={{width: 256, height: '100%'}}
      defaultSelectedKeys={[props.location.pathname]}
      mode="inline"
    >
      {/* todo логотип утащить из менюхи */}
      <Menu.Item key="logo">
        <h2>Финаграм</h2>
      </Menu.Item>

      <Menu.Item key="/">
        <Link to="/">
          <Icon type="home" /> Главная
        </Link>
      </Menu.Item>

      <Menu.Item key="/accounts">
        <Link to="/accounts">
          <Icon type="cluster" /> Счета
        </Link>
      </Menu.Item>

      <Menu.Item key="/classifiers">
        <Link to="/classifiers">
          <Icon type="appstore" /> Классификаторы
        </Link>
      </Menu.Item>
    </Menu>
  )
}

export default withRouter(Nav)
