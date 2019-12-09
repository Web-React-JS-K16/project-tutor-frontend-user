import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import userReducer from './user/user.reducers'
import teacherReducer from './teacher/teacher.reducers'
import studentReducer from './student/student.reducers'

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: [
    'currentUser', // save only currentUser to storage
  ],
}

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  teacher: teacherReducer,
  student: studentReducer,
})

export default rootReducer
