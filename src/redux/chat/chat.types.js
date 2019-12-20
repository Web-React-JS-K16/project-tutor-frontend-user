const ChatTypes = {
  SET_UP_ROOM: 'SET_UP_ROOM',
  SET_UP_ROOM_SUCCESS: 'SET_UP_ROOM_SUCCESS',
  SET_UP_ROOM_FAILURE: 'SET_UP_ROOM_FAILURE',

  CREATE_ROOM: 'CREATE_ROOM',
  ADD_ROOM: 'ADD_ROOM', // add new room after create success

  // CREATE_ROOM_SUCCESS: 'CREATE_ROOM_SUCCESS',
  // CREATE_ROOM_FAILURE: 'CREATE_ROOM_FAILURE',

  RECEIVE_NEW_MESSAGE: 'RECEIVE_NEW_MESSAGE', // send new message or get new message from roomate

  SET_CURRENT_ROOM: 'SET_CURRENT_ROOM',
}

export default ChatTypes
