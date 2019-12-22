/* eslint-disable no-case-declarations */
import ChatTypes from './chat.types'
import { updateRoomsAfterReveiceMessage } from './chat.utils'

// rooms array
const INITIAL_STATE = {
  rooms: [],
  // id of current room
  currentRoomId: null,
}

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatTypes.SET_UP_ROOM_SUCCESS:
      console.log('on set up room success')
      return { ...state, rooms: action.payload }
    case ChatTypes.SET_UP_ROOM_FAILURE:
      return { ...state, rooms: null }

    // create a new room chat and set it to current room
    case ChatTypes.ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, { ...action.payload }],
        currentRoomId: action.payload.room,
      }
    // case ChatTypes.CREATE_ROOM_FAILURE:
    //     return state;

    case ChatTypes.SET_CURRENT_ROOM:
      return { ...state, currentRoomId: action.payload }

    case ChatTypes.RECEIVE_NEW_MESSAGE:
      const { room, newMessage } = action.payload
      const newRooms = updateRoomsAfterReveiceMessage(room, newMessage, state.rooms)
      return { ...state, rooms: [...newRooms] }

    default:
      return state
  }
}

export default chatReducer
