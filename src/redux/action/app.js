export const SET_GLOBAL_LOADING = "SET_GLOBAL_LOADING";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_FILE_INFO = "SET_FILE_INFO";
export const SET_NOTI = "SET_NOTI";
export const SET_FOLDER_PAGE = "SET_FOLDER_PAGE";
export const SET_OPEN_MODAL = "SET_OPEN_MODAL";

export function setGlobalLoading(visible) {
  return {
    type: SET_GLOBAL_LOADING,
    payload: visible,
  };
}

export function setUserInfo(visible) {
  return {
    type: SET_USER_INFO,
    payload: visible,
  };
}

export function setFileInfo(visible) {
  return {
    type: SET_FILE_INFO,
    payload: visible,
  };
}

export function setNoti(visible) {
  return {
    type: SET_NOTI,
    payload: visible,
  };
}

export function setFolderPage(visible) {
  return {
    type: SET_FOLDER_PAGE,
    payload: visible,
  };
}

export function setOpenModal(visible) {
  return {
    type: SET_OPEN_MODAL,
    payload: visible,
  };
}