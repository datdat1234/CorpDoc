import {
  SET_GLOBAL_LOADING,
  SET_USER_INFO,
  SET_FILE_INFO,
  SET_NOTI,
} from '../action/app';
// import { deepClone } from "../../util/js/helper";

export default function appReducer(
  state = {
    globalLoading: false,
    userInfo: {},
    fileInfo: {},
    noti: {type:'', message: ''},
  },
  action
) {
  switch (action.type) {
    case SET_GLOBAL_LOADING:
      return {
        ...state,
        globalLoading: action.payload,
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_FILE_INFO:
      return {
        ...state,
        fileInfo: action.payload,
      };
    case SET_NOTI:
      return {
        ...state,
        noti: action.payload,
      };
    default:
      return state;
  }
}
