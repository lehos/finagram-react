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
        <Icon type={props.icon} /> {props.text}
      </Link>
    </Menu.Item>
  )
}

function Nav(props: RouteComponentProps) {
  return (
    <Menu
      style={{width: 256, height: '100%', userSelect: 'none'}}
      defaultSelectedKeys={[props.location.pathname]}
      defaultOpenKeys={['/classifiers']}
      mode="inline"
    >
      {renderItem({to: '/', icon: 'home', text: 'Главная'})}
      {renderItem({to: '/accounts', icon: 'cluster', text: 'Счета'})}
      {renderItem({to: '/transactions', icon: 'swap', text: 'Операции'})}
      {renderItem({to: '/currencies', icon: 'pay-circle', text: 'Валюты'})}
      {classifierStore.classifierList.map(el =>
        renderItem({to: `/category/${el.id}`, icon: 'tag', text: el.namePlural})
      )}
      {renderItem({to: '/classifiers', icon: 'tags', text: 'Классификаторы'})}
      {renderItem({to: '/form', icon: 'none', text: 'Формы'})}
    </Menu>
  )
}

export default withRouter(view(Nav))
