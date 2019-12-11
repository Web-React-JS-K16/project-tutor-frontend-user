export const STUDENT = 0
export const TEACHER = 1
export const jwtToken = 'jwtToken'
export const itemPerPage = 12
export const IMG_AVATAR_REF = 'images/avatar'
export const DEFAULT_AVATAR_URL =
  'https://firebasestorage.googleapis.com/v0/b/reactjs-caro-game.appspot.com/o/images%2Favatar%2Fdefault.png?alt=media&token=25d140ac-fad5-4c9c-a506-076ea0110ae7'

// NOT_START: 0,
// VALID: 1,
// END: 2,
// CANCEL: 3
// export const CONTRACT_TYPE = ['Chưa bắt đầu', 'Đang còn hiệu lực', 'Hết hạn', 'Bị hủy']
export const CONTRACT_TYPE = [
  {
    text: 'Chưa bắt đầu',
    color: 'cyan',
  },
  {
    text: 'Đang còn hiệu lực',
    color: 'green',
  },
  {
    text: 'Hết hạn',
    color: 'gold',
  },
  {
    text: 'Bị hủy',
    color: 'red',
  },
]
