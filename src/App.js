import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage/LoginPage.component'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  )
}

export default App
