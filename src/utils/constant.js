export const STUDENT = 0
export const TEACHER = 1
export const jwtToken = 'jwtToken'
export const itemPerPage = 12
export const IMG_AVATAR_REF = 'images/avatar'
export const DEFAULT_AVATAR_URL =
  'https://firebasestorage.googleapis.com/v0/b/reactjs-caro-game.appspot.com/o/images%2Favatar%2Fdefault.png?alt=media&token=25d140ac-fad5-4c9c-a506-076ea0110ae7'

export const NOT_START = 0
export const VALID = 1
export const END = 2
export const CANCEL = 3
export const CONTRACT_TYPE = [
  {
    text: 'Chưa bắt đầu',
    color: 'cyan',
    value: NOT_START,
  },
  {
    text: 'Đang còn hiệu lực',
    color: 'green',
    value: VALID,
  },
  {
    text: 'Hết hạn',
    color: 'gold',
    value: END,
  },
  {
    text: 'Bị hủy',
    color: 'red',
    value: CANCEL,
  },
]

export const CLIENT_EMIT_SEND_MESSAGE = 'message'
export const CLIENT_ON_RECIEVE_MESSAGE = 'message'

export const CLIENT_EMIT_CREATE_ROOM = 'create room' // send to server a request create a new room
export const CLIENT_ON_CREATE_ROOM = 'create room' // send to server request join room (room is created before)

export const CLIENT_EMIT_ACCEPT_NEW_ROOM = 'accept room' // send to server a request create a new room

export const CLIENT_ON_ROOMATE_OFF = 'roomate off' // receive msg roomate offline
export const ADMIN = 'admin'
