import React, {ComponentType, Suspense, useState} from 'react'
import {Router, Switch, Route, Redirect} from 'react-router-dom'
import {hot} from 'react-hot-loader/root'

import {session, history} from './services'
import {AuthLayout} from '@/layouts'

import ClassifiersPage from '@/pages/ClassifiersPage'
import AccountsPage from '@/pages/AccountsPage'
import CurrenciesPage from '@/pages/CurrenciesPage'

const IndexPage = React.lazy(() => import('./pages/IndexPage'))

type RouteProps = {
  path: string
  exact?: boolean
  component: ComponentType
}

function AuthRoute(props: RouteProps) {
  return (
    <Route
      exact={props.exact}
      path={props.path}
      render={() =>
        session.getToken() ? (
          <AuthLayout>
            <props.component />
          </AuthLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}
// todo auth and non-auth routes
function App() {
  return (
    <Router history={history}>
      <AuthLayout>
        <Suspense fallback={null}>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/classifiers" component={ClassifiersPage} />
            <Route path="/accounts" component={AccountsPage} />
            <Route path="/currencies" component={CurrenciesPage} />
          </Switch>
        </Suspense>
      </AuthLayout>
    </Router>
  )
}

export default process.env.NODE_ENV === 'production' ? App : hot(App)
