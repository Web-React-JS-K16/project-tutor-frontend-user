export const STUDENT = 0
export const TEACHER = 1
export const JWT_TOKEN = 'jwtToken'
export const ITEMS_PER_PAGE = 9
export const IMG_AVATAR_REF = 'images/avatar'
export const DEFAULT_AVATAR_URL =
  'https://firebasestorage.googleapis.com/v0/b/reactjs-caro-game.appspot.com/o/images%2Favatar%2Fdefault.png?alt=media&token=25d140ac-fad5-4c9c-a506-076ea0110ae7'

export const CONTRACT_TYPES = {
  WAIT_FOR_PAYMENT: 0,
  WAIT_FOR_ACCEPTANCE: 1,
  IS_VALID: 2,
  IS_CANCELLED: 3,
  IS_COMPLETED_BY_STUDENT: 4,
  IS_COMPLETED_BY_ADMIN: 5,
}

export const CUSTOM_CONTRACT_TYPES = [
  {
    textForStudent: 'Chờ thanh toán',
    textForTeacher: 'Chờ thanh toán',
    color: 'cyan',
    value: CONTRACT_TYPES.WAIT_FOR_PAYMENT,
  },
  {
    textForStudent: 'Chờ chấp nhận',
    textForTeacher: 'Chờ chấp nhận',
    color: 'green',
    value: CONTRACT_TYPES.WAIT_FOR_ACCEPTANCE,
  },
  {
    textForStudent: 'Có hiệu lực',
    textForTeacher: 'Có hiệu lực',
    color: 'gold',
    value: CONTRACT_TYPES.IS_VALID,
  },
  {
    textForStudent: 'Chờ hoàn tiền',
    textForTeacher: 'Bị hủy/ khiếu nại',
    color: 'red',
    value: CONTRACT_TYPES.IS_CANCELLED,
  },
  {
    textForStudent: 'Chờ hoàn thành',
    textForTeacher: 'Chờ nhận tiền',
    color: 'green',
    value: CONTRACT_TYPES.IS_COMPLETED_BY_STUDENT,
  },
  {
    textForStudent: 'Hoàn thành',
    textForTeacher: 'Hoàn thành',
    color: 'green',
    value: CONTRACT_TYPES.IS_COMPLETED_BY_ADMIN,
  },
]

export const CLIENT_EMIT_SEND_MESSAGE = 'message'
export const CLIENT_ON_RECIEVE_MESSAGE = 'message'

export const CLIENT_EMIT_OPEN_ROOM = 'open room' // send to server a request create a new room
export const CLIENT_ON_OPEN_ROOM = 'open room' // send to server request join room (room is created before)

export const CLIENT_EMIT_ACCEPT_NEW_ROOM = 'accept room' // send to server a request create a new room

export const CLIENT_ON_ROOMATE_OFF = 'roomate off' // receive msg roomate offline
export const SYSTEM = 'SYSTEM'

export const TYPE_MESSAGE = {
  MESSAGE: 0,
  ROOMATE_OFF: 1,
}
