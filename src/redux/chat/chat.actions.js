import ChatTypes from './chat.types'

// setup
export const onSetUpRoom = (token, onGetAllRoomComplete) => ({
  type: ChatTypes.SET_UP_ROOM,
  payload: { token, onGetAllRoomComplete },
})

export const onSetUpRoomSuccess = rooms => ({
  type: ChatTypes.SET_UP_ROOM_SUCCESS,
  payload: rooms,
})
export const onSetUpRoomFailure = message => ({
  type: ChatTypes.SET_UP_ROOM_FAILURE,
  payload: message,
})

// Add room chat
export const onCreateRoomChat = ({ token, roomInfo, onCreateRoomChatFinish }) => ({
  type: ChatTypes.CREATE_ROOM,
  payload: { token, roomInfo, onCreateRoomChatFinish },
})

export const onAddRoomChat = roomInfo => ({
  type: ChatTypes.ADD_ROOM,
  payload: roomInfo,
})

// set current room
export const onSetCurrentRoom = currentRoomId => ({
  type: ChatTypes.SET_CURRENT_ROOM,
  payload: currentRoomId,
})

/**
 * On receive newn message
 * @param {String} room idRoom
 * @param {Object} message {content, time, from}
 */
export const onReceiveNewMessage = ({ room, newMessage }) => ({
  type: ChatTypes.RECEIVE_NEW_MESSAGE,
  payload: { room, newMessage },
})
