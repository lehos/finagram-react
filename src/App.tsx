import {hot} from 'react-hot-loader/root'
import React from 'react'
import {Router, Switch} from 'react-router-dom'

import {history} from './services'
import {PrivateLayout} from '@/layouts'

import * as Pages from '@/pages'

// todo: public routes
// todo: named routes

function App() {
  return (
    <Router history={history}>
      <Switch>
        <PrivateLayout exact path="/" component={Pages.IndexPage} />
        <PrivateLayout path="/accounts" component={Pages.Accounts} />
        <PrivateLayout path="/transactions" component={Pages.Transactions} />
        <PrivateLayout path="/classifiers" component={Pages.Classifiers} />
        <PrivateLayout path="/category/:id" component={Pages.Categories} />
        <PrivateLayout path="/currencies" component={Pages.Currencies} />
        <PrivateLayout path="/form" component={Pages.FormPage} />
      </Switch>
    </Router>
  )
}

export default process.env.NODE_ENV === 'production' ? App : hot(App)
