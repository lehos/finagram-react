import React, {useState} from 'react'
import {Router, Switch} from 'react-router-dom'
import {hot} from 'react-hot-loader/root'

import {history, store} from './services'
import {PrivateLayout} from '@/layouts'
import {AppLoader} from '@/components'

import * as Pages from '@/pages'

// todo: public routes
// todo: rethink stores init
// todo: named routes

function App() {
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  if (!isInitialized) {
    store.initStores().then(() => {
      setIsInitialized(true)
    })
    return <AppLoader />
  }

  return (
    <Router history={history}>
      <Switch>
        <PrivateLayout exact path="/" component={Pages.IndexPage} />
        <PrivateLayout path="/accounts" component={Pages.AccountsPage} />
        <PrivateLayout path="/transactions" component={Pages.TransactionsPage} />
        <PrivateLayout path="/classifiers" component={Pages.ClassifiersPage} />
        <PrivateLayout path="/category/:id" component={Pages.CategoriesPage} />
        <PrivateLayout path="/currencies" component={Pages.CurrenciesPage} />
        <PrivateLayout path="/form" component={Pages.FormPage} />
      </Switch>
    </Router>
  )
}

export default process.env.NODE_ENV === 'production' ? App : hot(App)
