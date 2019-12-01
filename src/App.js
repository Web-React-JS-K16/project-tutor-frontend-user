import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Home from './components/Home/Home.component'
import TeacherLoginComponent from './components/teacher/TeacherLogin/TeacherLogin.component'
import StudentLoginComponent from './components/student/StudentLogin/StudentLogin.component'
import TeacherRegisterComponent from './components/teacher/TeacherRegister/TeacherRegister.component'
import StudentRegisterComponent from './components/student/StudentRegister/StudentRegister.component'
// import test from './components/LoginPage/components/test/test'

const teacherPath = '/teacher'
const studentPath = '/student'

const RouteTeacher = () => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('jwtToken')

  return (
    <Switch>
      {token ? (
        <>
          <Route path={`${teacherPath}/login`}>
            <Redirect to="/" />;
          </Route>
          <Route path={`${teacherPath}/register`}>
            <Redirect to="/" />;
          </Route>
        </>
      ) : (
        <>
          <Route path={`${teacherPath}/login`} component={TeacherLoginComponent} />
          <Route path={`${teacherPath}/register`} component={TeacherRegisterComponent} />
        </>
      )}
    </Switch>
  )
}

const RouteStudent = () => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('jwtToken')

  return (
    <Switch>
      {token ? (
        <>
          <Route path={`${studentPath}/login`}>
            <Redirect to="/" />;
          </Route>
          <Route path={`${studentPath}/register`}>
            <Redirect to="/" />;
          </Route>
        </>
      ) : (
        <>
          <Route path={`${studentPath}/login`} component={StudentLoginComponent} />
          <Route path={`${studentPath}/register`} component={StudentRegisterComponent} />
        </>
      )}
    </Switch>
  )
}

const App = () => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MainLayout>
              <Home />
            </MainLayout>
          )}
        />
        <Route path={teacherPath} component={RouteTeacher} />
        <Route path={studentPath} component={RouteStudent} />
      </Switch>
    </div>
  )
}

export default App
