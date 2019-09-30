import React from 'react'
import {view} from 'react-easy-state'
import {Link, RouteComponentProps, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd'

import {classifierStore} from '@/domains/classifier'

type MenuItemProps = {
  to: string
  icon: string
  text: string
}

function renderItem(props: MenuItemProps) {
  return (
    <Menu.Item key={props.to}>
      <Link to={props.to}>
        <Icon type={props.icon} />
        <span>{props.text}</span>
      </Link>
    </Menu.Item>
  )
}

function NavComp(props: RouteComponentProps) {
  return (
    <Menu
      style={{height: '100%', userSelect: 'none'}}
      defaultSelectedKeys={[props.location.pathname]}
      defaultOpenKeys={['/classifiers']}
      mode="inline"
      theme="dark"
    >
      {renderItem({to: '/', icon: 'home', text: 'Главная'})}
      {renderItem({to: '/currencies', icon: 'pay-circle', text: 'Валюты'})}
      {renderItem({to: '/accounts', icon: 'cluster', text: 'Счета'})}
      {renderItem({to: '/transactions', icon: 'swap', text: 'Операции'})}
      {classifierStore.classifierList.map(el =>
        renderItem({to: `/category/${el.id}`, icon: 'tag', text: el.namePlural})
      )}
      {renderItem({to: '/classifiers', icon: 'tags', text: 'Классификаторы'})}
    </Menu>
  )
}

export const Nav = withRouter(view(NavComp))
