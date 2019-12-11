/* eslint-disable react/prop-types */

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ChangePasswordContainer from 'components/common/ChangePassword/ChangePassword.container'
import { connect } from 'react-redux'
import { STUDENT, TEACHER } from 'utils/constant'
import NotFoud404 from 'components/common/NotFoud404/NotFoud404.component'
import ErrorPage from 'components/common/ErrorPage/ErrorPage.component'
import ContractDetailContainer from 'components/common/ContractDetail/ContractDetail.container'
import MainLayout from './components/MainLayout'
import Home from './components/common/HomePage/Home.component'
import TeacherInfoPageContainer from './components/teacher/TeacherInfoPage/TeacherInfoPage.container'
import TeacherListPageContainer from './components/teacher/TeacherListPage/TeacherListPage.container'
import TeacherLoginComponent from './components/teacher/TeacherLogin/TeacherLogin.component'
import StudentLoginComponent from './components/student/StudentLogin/StudentLogin.component'
import ActiveEmailContainer from './components/common/ActiveEmail/ActiveEmail.container'
import ForgetPasswordContainer from './components/common/ForgetPassword/ForgetPassword.container'
import ResetPasswordContainer from './components/common/ResetPassword/ResetPassword.container'
import TeacherRegisterComponent from './components/teacher/TeacherRegister/TeacherRegister.component'
import StudentRegisterComponent from './components/student/StudentRegister/StudentRegister.component'
import RegisterPageContainer from './components/common/RegisterPage/RegisterPage.container'
import StudentUpdateInfoPageComponent from './components/student/StudentUpdateInfoPage/StudentUpdateInfoPage.component'
import TeacherUpdateInfoPage from './components/teacher/TeacherUpdateInfoPage/TeacherUpdateInfoPage.component'

const teacherPath = '/teacher'
const studentPath = '/student'

const RouteTeacher = ({ currentUser }) => {
  // const token = UserService.getPreferences(jwtToken)
  console.log('current user: ', currentUser)

  return (
    <Switch>
      {/* WITHOUT login, user can access those links */}
      <Route
        exact
        path={`${teacherPath}`}
        render={() => (
          <MainLayout>
            <TeacherListPageContainer />
          </MainLayout>
        )}
      />

      <Route
        exact
        path={`${teacherPath}/info`}
        render={() => (
          <MainLayout>
            <TeacherInfoPageContainer />
          </MainLayout>
        )}
      />

      {currentUser ? (
        <>
          <Route path={`${teacherPath}/login`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${teacherPath}/register`}>
            <Redirect to="/" />
          </Route>
          <Route
            path={`${teacherPath}/update-info`}
            render={() =>
              currentUser.typeID === TEACHER ? (
                <TeacherUpdateInfoPage />
              ) : (
                <ErrorPage message="Bạn không có quyền truy cập trang này." />
              )
            }
          />
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

const RouteStudent = ({ currentUser }) => {
  // const token = UserService.getPreferences(jwtToken)

  return (
    <Switch>
      {/* WITHOUT login, user can access those links */}
      {/* <Route path={`${studentPath}/`} component={} /> */}
      {currentUser ? (
        <>
          <Route path={`${studentPath}/login`}>
            <Redirect to="/" />
          </Route>
          <Route path={`${studentPath}/register`}>
            <Redirect to="/" />
          </Route>
          <Route
            path={`${studentPath}/update-info`}
            render={() =>
              currentUser.typeID === STUDENT ? (
                <StudentUpdateInfoPageComponent />
              ) : (
                <ErrorPage message="Bạn không có quyền truy cập trang này." />
              )
            }
          />
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

const App = ({ currentUser }) => {
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
        <Route path={teacherPath} render={() => <RouteTeacher currentUser={currentUser} />} />
        <Route path={studentPath} render={() => <RouteStudent currentUser={currentUser} />} />
        <Route path="/error-page" component={ErrorPage} />
        <Route path="/404" component={NotFoud404} />
        <Route path="/active-email/:token/:email" component={ActiveEmailContainer} />

        {currentUser ? (
          <>
            <Route path="/change-password" component={ChangePasswordContainer} />
            <Route path="/contract-detail/:contractId" component={ContractDetailContainer} />
          </>
        ) : (
          <>
            <Route path="/register" component={RegisterPageContainer} />
            <Route path="/foget-password" component={ForgetPasswordContainer} />
            <Route path="/reset-password/:token/:email" component={ResetPasswordContainer} />
          </>
        )}
      </Switch>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(App)
