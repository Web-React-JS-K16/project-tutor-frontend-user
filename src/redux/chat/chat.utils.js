/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { TYPE_MESSAGE, STUDENT, SYSTEM } from 'utils/constant'

export const getIdRoomate = (idUser, room) => {
  return room.replace(idUser, '')
}

// update room after receive new message
export const updateRoomsAfterReveiceMessage = (room, newMessage, currentRooms) => {
  const indexUpdateRoom = currentRooms.findIndex(item => item.room === room)
  if (indexUpdateRoom !== -1) {
    if (newMessage.type === TYPE_MESSAGE.ROOMATE_OFF) {
      if (newMessage.typeIDCurrentUser === STUDENT) {
        newMessage = {
          from: SYSTEM,
          content: `${currentRooms[indexUpdateRoom].teacher.displayName} đã offline`,
        }
      } else {
        newMessage = {
          from: SYSTEM,
          content: `${currentRooms[indexUpdateRoom].student.displayName} đã offline`,
        }
      }
    }

    const updateRoom = {
      ...currentRooms[indexUpdateRoom],
      message: [...currentRooms[indexUpdateRoom].message, { ...newMessage }],
    }
    const newRooms = [
      ...currentRooms.slice(0, indexUpdateRoom),
      updateRoom,
      ...currentRooms.slice(indexUpdateRoom + 1),
    ]
    return newRooms
  }
  return currentRooms
}
