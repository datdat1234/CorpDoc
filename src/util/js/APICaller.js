import axios from 'axios';
import { LOGIN_URL_FE } from './constant.js';
import { logMessage, setNotification } from './helper';
import { refreshToken } from './APIs.js';
import store from '../../redux/store.js';
import { setUserInfo } from '../../redux/action/app';

const getToken = () => {
  return localStorage.getItem('token');
};

const getRefreshToken = () => {
  return getUserInfo()?.refreshToken;
};

const getUserInfo = () => {
  return store.getState().app.userInfo;
};

const buildAxiosConfig = (api, method, headers = null) => {
  let config = {
    url: api,
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (headers) config.headers = { ...config.headers, ...headers };
  if (headers?.responseType) config.responseType = headers.responseType;
  const token = getToken();
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
};

const callAxios = (
  api,
  payload = null,
  method,
  headers = null,
  isShowErrorMessage
) => {
  const config = buildAxiosConfig(api, method, headers);
  if (payload) {
    if (method === 'get') config.params = payload;
    else config.data = payload;
  }

  return axios(config)
    .then((res) => {
      handleResponse(res);
      return res;
    })
    .catch((err) => {
      const status = err.response?.status;
      const data = err.response?.data;
      // Nếu status trả ra là 401 và không phải đang ở trang login hoặc oauth2 thì logout
      if (status === 401 && !window.location.href?.includes(LOGIN_URL_FE)) {
        logout();
      } else {
        const checkStatus = handleResponse(err?.response);
        if (err?.response?.data?.resultCode === '00012') {
          if (checkStatus)
            return callAxios(api, payload, method, headers, isShowErrorMessage);
          else logout();
        }
        if (isShowErrorMessage) {
          logMessage(err);
        }
        return {
          api,
          status,
          data,
        };
      }
    });
};

export const get = (
  api,
  params = null,
  headers = null,
  isShowErrorMessage = true
) => {
  return callAxios(api, params, 'get', headers, isShowErrorMessage);
};

export const post = (
  api,
  body = null,
  headers = null,
  isShowErrorMessage = true
) => {
  return callAxios(api, body, 'post', headers, isShowErrorMessage);
};

export const put = (
  api,
  body = null,
  headers = null,
  isShowErrorMessage = true
) => {
  return callAxios(api, body, 'put', headers, isShowErrorMessage);
};

export const patch = (
  api,
  body = null,
  headers = null,
  isShowErrorMessage = true
) => {
  return callAxios(api, body, 'patch', headers, isShowErrorMessage);
};

export const remove = (
  api,
  body = null,
  headers = null,
  isShowErrorMessage = true
) => {
  return callAxios(api, body, 'delete', headers, isShowErrorMessage);
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
};

export const handleResponse = async (res) => {
  let resultCode = res?.data?.resultCode;
  let resultMessage =
    res?.data?.resultMessage?.vi ?? res?.data?.resultMessage?.en;
  switch (resultCode) {
    case '00005':
      break;
    case '00006':
      logout();
      break;
    case '00007':
      break;
    case '00008':
      setNotification('error', resultMessage);
      break;
    case '00009':
      setNotification('error', resultMessage);
      break;
    case '00011':
      logout();
      break;
    case '00012':
      // refresh token
      const refresh = await refreshToken(getRefreshToken());
      if (refresh?.status !== '00065') return false;
      break;
    case '00017':
      logout();
      break;
    case '00019':
      setNotification('error', resultMessage);
      break;
    case '00021':
      setNotification('error', resultMessage);
      break;
    case '00022':
      break;
    case '00023':
      break;
    case '00024':
      break;
    case '00025':
      break;
    case '00026':
      break;
    case '00027':
      break;
    case '00028':
      break;
    case '00029':
      break;
    case '00032':
      break;
    case '00033':
      setNotification('error', resultMessage);
      break;
    case '00034':
      break;
    case '00035':
      break;
    case '00036':
      break;
    case '00038':
      setNotification('warning', resultMessage);
      break;
    case '00039':
      setNotification('warning', resultMessage);
      break;
    case '00040':
      setNotification('warning', resultMessage);
      break;
    case '00042':
      setNotification('error', resultMessage);
      break;
    case '00043':
      break;
    case '00044':
      break;
    case '00045':
      setNotification('warning', resultMessage);
      break;
    case '00047':
      setNotification('success', resultMessage);
      break;
    case '00048':
      break;
    case '00050':
      setNotification('success', resultMessage);
      break;
    case '00052':
      break;
    case '00053':
      break;
    case '00054':
      break;
    case '00055':
      break;
    case '00058':
      break;
    case '00061':
      break;
    case '00062':
      setNotification('warning', resultMessage);
      break;
    case '00063':
      setNotification('warning', resultMessage);
      break;
    case '00065':
      // call lại sau khi refresh
      const userInfo = getUserInfo();
      if (userInfo) {
        userInfo.accessToken = res?.data?.data?.accessToken;
        userInfo.refreshToken = res?.data?.data?.refreshToken;
      }
      store.dispatch(setUserInfo(userInfo));
      localStorage.setItem('token', userInfo.accessToken);
      break;
    case '00066':
      break;
    case '00068':
      break;
    case '00069':
      setNotification('warning', resultMessage);
      break;
    case '00072':
      setNotification('warning', resultMessage);
      break;
    case '00073':
      setNotification('warning', resultMessage);
      break;
    case '00076':
      setNotification('success', resultMessage);
      break;
    case '00077':
      break;
    case '00078':
      break;
    case '00079':
      break;
    case '00080':
      break;
    case '00081':
      break;
    case '00084':
      break;
    case '00086':
      break;
    case '00089':
      break;
    case '00092':
      break;
    case '00093':
      break;
    case '00094':
      setNotification('error', resultMessage);
      break;
    case '00095':
      setNotification('success', resultMessage);
      break;
    case '00096':
      setNotification('error', resultMessage);
      break;
    case '00097':
      setNotification('error', resultMessage);
      break;
    case '00098':
      setNotification('error', resultMessage);
      break;
    default:
      break;
  }
  return true;
};
