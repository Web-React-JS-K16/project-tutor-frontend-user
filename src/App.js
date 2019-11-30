import React from 'react'
import { Switch, Route } from 'react-router-dom'
import RegisterPageContainer from './components/common/RegisterPage/RegisterPage.container'
import 'antd/dist/antd.css'
import LoginPageContainer from './components/common/LoginPage/LoginPage.container'
import test from './components/test/test'
// import test from './components/LoginPage/components/test/test'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={test} />
        <Route path="/login" component={LoginPageContainer} />
        <Route path="/register" component={RegisterPageContainer} />
      </Switch>
    </div>
  )
}

export default App
