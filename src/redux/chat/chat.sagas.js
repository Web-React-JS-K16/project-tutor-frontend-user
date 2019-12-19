/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-globals */
import { call, all, takeLatest } from 'redux-saga/effects'
// import { onSetUpRoomSuccess, onSetUpRoomFailure, onCreateRoomChatSuccess, onCreateRoomChatFailure } from './chat.actions'
import ChatService from '../../services/chat.service'
import ChatTypes from './chat.types'

//= ==================
/**
 *
 * @param {Sttring} payload is token
 */
function* setupRoomChat({ payload: { token, onGetAllRoomComplete } }) {
  try {
    // get old message from db
    console.log('on set up room chat saga: ', onGetAllRoomComplete)
    const rooms = yield ChatService.getAllChatRoom(token)
    // yield put(onGetAllRoomComplete(true, rooms))
    yield onGetAllRoomComplete(true, rooms)
  } catch (err) {
    yield onGetAllRoomComplete(false, null, err.message)
  }
}

function* onSetupRoomChat() {
  console.log('on set up room chat')
  yield takeLatest(ChatTypes.SET_UP_ROOM, setupRoomChat)
}
// ==================
function* createRoomChat({ payload: { token, roomInfo, onCreateRoomChatFinish } }) {
  try {
    console.log('saga, before create room: ', roomInfo)
    // get old message from db
    const newRoom = yield ChatService.createChatRoom({ roomInfo, token })
    console.log('saga, new room: ', newRoom)
    yield onCreateRoomChatFinish(true, newRoom)
    // yield put(onCreateRoomChatSuccess(roomInfo))
  } catch (err) {
    console.log('saga create room err:', err.message)
    // yield put(onCreateRoomChatFailure(err.message))
    yield onCreateRoomChatFinish(false, roomInfo, err.message)
  }
}

function* onCreateRoomChat() {
  yield takeLatest(ChatTypes.CREATE_ROOM, createRoomChat)
}
// =================================

export function* chatSaga() {
  yield all([call(onSetupRoomChat), call(onCreateRoomChat)])
}
