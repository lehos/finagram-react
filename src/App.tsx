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
        <PrivateLayout path="/accounts" component={Pages.AccountsPage} />
        <PrivateLayout path="/transactions" component={Pages.TransactionsPage} />
        <PrivateLayout path="/classifiers" component={Pages.ClassifiersPage} />
        <PrivateLayout path="/category/:id" component={Pages.Categories} />
        <PrivateLayout path="/currencies" component={Pages.CurrenciesPage} />
        <PrivateLayout path="/form" component={Pages.FormPage} />
      </Switch>
    </Router>
  )
}

export default process.env.NODE_ENV === 'production' ? App : hot(App)
