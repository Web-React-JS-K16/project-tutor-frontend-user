/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ChangePasswordContainer from 'components/common/ChangePassword/ChangePassword.container'
import { connect } from 'react-redux'
import { STUDENT, TEACHER } from 'utils/constant'
import NotFound404 from 'components/common/NotFound404/NotFound404.component'
import ErrorPage from 'components/common/ErrorPage/ErrorPage.component'
import ContractDetailContainer from 'components/common/ContractDetail/ContractDetail.container'
import ContractListPageContainer from 'components/contract/ContractListPage/ContractListPage.container'
import MainLayout from 'components/MainLayout'
import Home from 'components/common/HomePage/Home.component'
import TeacherInfoPageContainer from 'components/teacher/TeacherInfoPage/TeacherInfoPage.container'
import TeacherListPageContainer from 'components/teacher/TeacherListPage/TeacherListPage.container'
import TeacherSearchResultContainer from 'components/teacher/TeacherSearchResult/TeacherSearchResult.container'
import TeacherLoginComponent from 'components/teacher/TeacherLogin/TeacherLogin.component'
import TeacherStatisticsPageContainer from 'components/teacher/TeacherStatisticsPage/TeacherStatisticsPage.container'
import StudentLoginComponent from 'components/student/StudentLogin/StudentLogin.component'
import ActiveEmailContainer from 'components/common/ActiveEmail/ActiveEmail.container'
import ForgetPasswordContainer from 'components/common/ForgetPassword/ForgetPassword.container'
import ResetPasswordContainer from 'components/common/ResetPassword/ResetPassword.container'
import TeacherRegisterComponent from 'components/teacher/TeacherRegister/TeacherRegister.component'
import StudentRegisterComponent from 'components/student/StudentRegister/StudentRegister.component'
import RegisterPageContainer from 'components/common/RegisterPage/RegisterPage.container'
import StudentUpdateInfoPageComponent from 'components/student/StudentUpdateInfoPage/StudentUpdateInfoPage.component'
import TeacherUpdateInfoPage from 'components/teacher/TeacherUpdateInfoPage/TeacherUpdateInfoPage.component'
import ChatContainer from 'components/common/Chat/Chat.container'
import NotificationPageContainer from 'components/common/NotificationPage/NotificationPage.container'
import PaymentResultComponent from 'components/student/PaymentResult/PaymentResult.component'

const teacherPath = '/teacher'
const studentPath = '/student'

const RouteTeacher = ({ currentUser }) => {
  console.log('current user: ', currentUser)

  return (
    <Switch>
      {/* WITHOUT login, user can access those links */}
      <Route
        exact
        path={`${teacherPath}`}
        render={props => (
          <MainLayout history={props.history}>
            <TeacherListPageContainer />
          </MainLayout>
        )}
      />
      <Route
        exact
        path={`${teacherPath}/search/:key`}
        render={() => (
          <MainLayout>
            <TeacherSearchResultContainer />
          </MainLayout>
        )}
      />

      <Route
        exact
        path={`${teacherPath}/info/:idTeacher`}
        render={props => (
          <MainLayout history={props.history}>
            <TeacherInfoPageContainer {...props} />
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
            render={props =>
              currentUser.typeID === TEACHER ? (
                <MainLayout history={props.history}>
                  <TeacherUpdateInfoPage />
                </MainLayout>
              ) : (
                <ErrorPage message="Bạn không có quyền truy cập trang này." />
              )
            }
          />
          <Route
            path={`${teacherPath}/statistics`}
            render={props =>
              currentUser.typeID === TEACHER ? (
                <MainLayout history={props.history}>
                  <TeacherStatisticsPageContainer />
                </MainLayout>
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
            render={props =>
              currentUser.typeID === STUDENT ? (
                <MainLayout history={props.history}>
                  <StudentUpdateInfoPageComponent />
                </MainLayout>
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
          render={props => (
            <MainLayout history={props.history}>
              <Home />
            </MainLayout>
          )}
        />
        <Route path={teacherPath} render={() => <RouteTeacher currentUser={currentUser} />} />
        <Route path={studentPath} render={() => <RouteStudent currentUser={currentUser} />} />
        <Route path="/error-page" component={ErrorPage} />
        <Route path="/404" component={NotFound404} />
        <Route path="/payment" component={PaymentResultComponent} />
        <Route path="/active-email/:token/:email" component={ActiveEmailContainer} />
        {currentUser ? (
          <>
            <Route exact path="/chat" component={ChatContainer} />
            <Route exact path="/chat/:roomId" component={ChatContainer} />
            <Route path="/change-password" component={ChangePasswordContainer} />
            <Route path="/contract-detail/:contractId" component={ContractDetailContainer} />
            <Route
              path="/contract-list"
              render={props => (
                <MainLayout history={props.history}>
                  <ContractListPageContainer {...props} />
                </MainLayout>
              )}
            />
            <Route
              path="/notification-list"
              render={props => (
                <MainLayout history={props.history}>
                  <NotificationPageContainer {...props} />
                </MainLayout>
              )}
            />
          </>
        ) : (
          <>
            <Route path="/register" component={RegisterPageContainer} />
            <Route path="/foget-password" component={ForgetPasswordContainer} />
            <Route path="/reset-password/:token/:email" component={ResetPasswordContainer} />
            <Route path="/contract-detail/:contractId">
              <Redirect to={`${studentPath}/login`} />
            </Route>
            <Route path="*" component={NotFound404} />
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
