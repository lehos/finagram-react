import React, { Suspense } from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'

const IndexPage = React.lazy(() => import('./pages/IndexPage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage'))

function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <div>
            <Link to="/">Index</Link>
          </div>
          <div>
            <Link to="/about">About</Link>
          </div>
          <Suspense fallback={null}>
            <Switch>
              <Route exact path="/" component={IndexPage} />
              <Route path="/about" component={AboutPage} />
            </Switch>
          </Suspense>
        </>
      </BrowserRouter>
    </>
  )
}

export default App
