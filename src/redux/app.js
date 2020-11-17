// APP主体状态
export const SET_APP_USER = 'app/SET_APP_USER'
export const SET_IMAGE_URL = 'app/SET_IMAGE_URL'
export const SHOW_CROP_IMAGE = 'app/SHOW_CROP_IMAGE'
export const HIDE_CROP_IMAGE = 'app/HIDE_CROP_IMAGE'
export const SHOW_RECOGNIZE_RESULT = 'app/SHOW_RECOGNIZE_RESULT'
export const HIDE_RECOGNIZE_RESULT = 'app/HIDE_RECOGNIZE_RESULT'
export const SHOW_CAMERA = 'app/SHOW_CAMERA'
export const HIDE_CAMERA = 'app/HIDE_CAMERA'
export const SET_CROPPED_IMAGE_URL = 'app/SET_CROPPED_IMAGE_URL'
export const SET_BLOCKS = 'app/SET_BLOCKS'

const defaultState = {
  userId: '',
  userName: '',
  isMaster: false,
  appRole: '',
  isLogon: false,
  imageUrl:
    'https://iknow-pic.cdn.bcebos.com/b219ebc4b74543a92875861b15178a82b80114fe',
  isShowStartPage: false,
  isShowCamera: false,
  isShowCropImage: true,
  isShowRecognizeResult: false,
  croppedImageUrl: '',
  blocks: [],
}

export default (state = defaultState, action = {}) => {
  const { payload } = action
  switch (action.type) {
    case SET_BLOCKS: {
      return {
        ...state,
        blocks: payload,
      }
    }
    case SET_CROPPED_IMAGE_URL: {
      return {
        ...state,
        croppedImageUrl: payload,
      }
    }
    case SHOW_CAMERA: {
      return {
        ...state,
        isShowCamera: true,
        isShowStartPage: false,
        isShowCropImage: false,
        isShowRecognizeResult: false,
      }
    }
    case HIDE_CAMERA: {
      return {
        ...state,
        isShowCamera: false,
      }
    }
    case SHOW_RECOGNIZE_RESULT: {
      return {
        ...state,
        isShowRecognizeResult: true,
        isShowCropImage: false,
        isShowCamera: false,
        isShowStartPage: false,
      }
    }
    case HIDE_RECOGNIZE_RESULT: {
      return {
        ...state,
        isShowRecognizeResult: false,
      }
    }
    case SHOW_CROP_IMAGE: {
      return {
        ...state,
        isShowCropImage: true,
        isShowCamera: false,
        isShowRecognizeResult: false,
        isShowStartPage: false,
      }
    }
    case HIDE_CROP_IMAGE: {
      return {
        ...state,
        isShowCropImage: false,
      }
    }
    case SET_IMAGE_URL: {
      return {
        ...state,
        imageUrl: payload,
      }
    }
    case SET_APP_USER:
      const { appRole, userId, userName } = payload
      return {
        ...state,
        isMaster: appRole === 'teacher',
        appRole,
        userId,
        userName,
        isLogon: !userId || userId.length <= 0 ? false : true,
      }
    default:
      return state
  }
}

export const setAppUser = (appRole, userId, userName) => ({
  type: SET_APP_USER,
  payload: { appRole, userId, userName },
})
export const setImageUrl = dataUrl => ({
  type: SET_IMAGE_URL,
  payload: dataUrl,
})
export const showCropImage = () => ({
  type: SHOW_CROP_IMAGE,
})
export const hideCropImage = () => ({
  type: HIDE_CROP_IMAGE,
})
export const showRecognizeResult = () => ({
  type: SHOW_RECOGNIZE_RESULT,
})
export const hideRecognizeResult = () => ({
  type: HIDE_RECOGNIZE_RESULT,
})
export const showCamera = () => ({
  type: SHOW_CAMERA,
})
export const hideCamera = () => ({
  type: HIDE_CAMERA,
})
export const setCroppedImageUrl = dataUrl => ({
  type: SET_CROPPED_IMAGE_URL,
  payload: dataUrl,
})
export const setBlocks = blocks => ({
  type: SET_BLOCKS,
  payload: blocks,
})
