import React, {ComponentType, Suspense, useState} from 'react'
import {Router, Switch, Route, Redirect} from 'react-router-dom'
import {hot} from 'react-hot-loader/root'

import {session, history} from './services'
import {AuthLayout} from '@/layouts'

import ClassifiersPage from '@/pages/ClassifiersPage'
import CategoriesPage from '@/pages/CategoriesPage'
import AccountsPage from '@/pages/AccountsPage'
import CurrenciesPage from '@/pages/CurrenciesPage'
import TransactionsPage from '@/pages/TransactionsPage'
import FormPage from '@/pages/FormPage'

const IndexPage = React.lazy(() => import('./pages/IndexPage'))

type RouteProps = {
  path: string
  exact?: boolean
  component: ComponentType
}

// function AuthRoute(props: RouteProps) {
//   return (
//     <Route
//       exact={props.exact}
//       path={props.path}
//       render={() =>
//         session.getToken() ? (
//           <AuthLayout>
//             <props.component />
//           </AuthLayout>
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   )
// }

// stores are initialized in layouts/AuthLayout/initStores

// todo: auth and non-auth routes
function App() {
  return (
    <Router history={history}>
      <AuthLayout>
        <Suspense fallback={null}>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/accounts" component={AccountsPage} />
            <Route path="/transactions" component={TransactionsPage} />
            <Route path="/classifiers" component={ClassifiersPage} />
            <Route path="/category/:id" component={CategoriesPage} />
            <Route path="/currencies" component={CurrenciesPage} />
            <Route path="/form" component={FormPage} />
          </Switch>
        </Suspense>
      </AuthLayout>
    </Router>
  )
}

export default process.env.NODE_ENV === 'production' ? App : hot(App)
