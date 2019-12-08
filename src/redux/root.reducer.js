import { combineReducers } from 'redux'
import userReducer from './user/user.reducers'
import teacherReducer from './teacher/teacher.reducers'

const rootReducer = combineReducers({
  user: userReducer,
  teacher: teacherReducer,
})

export default rootReducer
