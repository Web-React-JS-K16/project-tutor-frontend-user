import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import userReducer from './user/user.reducers'
import teacherReducer from './teacher/teacher.reducers'
import majorReducer from './major/major.reducers'
import locationReducer from './location/location.reducers'
import studentReducer from './student/student.reducers'
import contractReducer from './contract/contract.reducers'

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
  major: majorReducer,
  location: locationReducer,
  student: studentReducer,
  contract: contractReducer,
})

export default rootReducer
