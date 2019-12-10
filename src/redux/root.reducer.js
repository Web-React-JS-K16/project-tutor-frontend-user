import { combineReducers } from 'redux'
import userReducer from './user/user.reducers'
import teacherReducer from './teacher/teacher.reducers'
import majorReducer from './major/major.reducers'
import locationReducer from './location/location.reducers'

const rootReducer = combineReducers({
  user: userReducer,
  teacher: teacherReducer,
  major: majorReducer,
  location: locationReducer,
})

export default rootReducer
