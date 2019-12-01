import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import RegisterPageContainer from './components/common/RegisterPage/RegisterPage.container'
import Home from './components/Home/Home.component'
import TeacherLoginComponent from './components/teacher/TeacherLogin/TeacherLogin.component'
import StudentLoginComponent from './components/student/StudentLogin/StudentLogin.component'
// import test from './components/LoginPage/components/test/test'

const teacherPath = '/teacher'
const studentPath = '/student'

const RouteTeacher = () => {
  return (
    <Switch>
      <Route path={`${teacherPath}/login`} component={TeacherLoginComponent} />
    </Switch>
  )
}

const RouteStudent = () => {
  return (
    <Switch>
      <Route path={`${studentPath}/login`} component={StudentLoginComponent} />
    </Switch>
  )
}

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path={teacherPath} component={RouteTeacher} />
        <Route path={studentPath} component={RouteStudent} />

        <Route path="/register" component={RegisterPageContainer} />
      </Switch>
    </div>
  )
}

export default App
