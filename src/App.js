import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginPageContainer from './components/LoginPage/LoginPage.container'
import 'antd/dist/antd.css'
// import test from './components/LoginPage/components/test/test'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LoginPageContainer} />
        <Route path="/login" component={LoginPageContainer} />
      </Switch>
    </div>
  )
}

export default App
