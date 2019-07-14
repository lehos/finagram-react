import React, {ComponentType, Suspense} from 'react'
import {Router, Switch, Route, Redirect} from 'react-router-dom'
import {hot} from 'react-hot-loader/root'

import {session, history, storeService} from './services'
import {AuthLayout} from '@/layouts'

import ClassifiersPage from '@/pages/ClassifiersPage'
import AccountsPage from '@/pages/AccountsPage'

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


let isInitialized = false

// todo auth and non-auth routes
function App() {
  if (!isInitialized) {
    storeService.initStores()
    isInitialized = true
  }

  return (
    <Router history={history}>
      <AuthLayout>
        <Suspense fallback={null}>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/classifiers" component={ClassifiersPage} />
            <Route path="/accounts" component={AccountsPage} />
          </Switch>
        </Suspense>
      </AuthLayout>
    </Router>
  )
}

export default process.env.NODE_ENV === 'production' ? App : hot(App)
