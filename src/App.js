import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import UserService from './services/user.service'
import { jwtToken } from './utils/constant'
import MainLayout from './components/MainLayout'
import Home from './components/common/HomePage/Home.component'
import TeacherInfoPage from './components/teacher/TeacherInfoPage/TeacherInfoPage.component'
import TeacherLoginComponent from './components/teacher/TeacherLogin/TeacherLogin.component'
import StudentLoginComponent from './components/student/StudentLogin/StudentLogin.component'
import ActiveEmailContainer from './components/common/ActiveEmail/ActiveEmail.container'
import ForgetPasswordContainer from './components/common/ForgetPassword/ForgetPassword.container'
import ResetPasswordContainer from './components/common/ResetPassword/ResetPassword.container'
import TeacherRegisterComponent from './components/teacher/TeacherRegister/TeacherRegister.component'
import StudentRegisterComponent from './components/student/StudentRegister/StudentRegister.component'
import RegisterPageContainer from './components/common/RegisterPage/RegisterPage.container'
// import test from './components/LoginPage/components/test/test'

const teacherPath = '/teacher'
const studentPath = '/student'

const RouteTeacher = () => {
  const token = UserService.getPreferences(jwtToken)

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
          <Route
            path={`${teacherPath}/info`}
            render={() => (
              <MainLayout>
                <TeacherInfoPage />
              </MainLayout>
            )}
          />
        </>
      ) : (
        <>
          <Route path={`${teacherPath}/login`} component={TeacherLoginComponent} />
          <Route path={`${teacherPath}/register`} component={TeacherRegisterComponent} />
          <Route
            path={`${teacherPath}/info`}
            render={() => (
              <MainLayout>
                <Home />
              </MainLayout>
            )}
          />
        </>
      )}
    </Switch>
  )
}

const RouteStudent = () => {
  const token = UserService.getPreferences(jwtToken)

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

        <Route path="/register" component={RegisterPageContainer} />
        <Route path="/active-email/:token/:email" component={ActiveEmailContainer} />
        <Route path="/foget-password" component={ForgetPasswordContainer} />
        <Route path="/reset-password/:token/:email" component={ResetPasswordContainer} />
      </Switch>
    </div>
  )
}

export default App
