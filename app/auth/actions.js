import {
  AsyncStorage,
} from 'react-native';
import { createAction } from 'redux-actions';

export const LOGIN = 'auth/LOGIN';
export const AUTO_LOGIN = 'auth/AUTO_LOGIN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'auth/LOGIN_FAIL';

export const LOGOUT = 'auth/LOGOUT';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';

export const ONLINE = 'auth/ONLINE';
export const OFFLINE = 'auth/OFFLINE';

export function online() {
  return createAction(ONLINE)();
}
export function offline() {
  return createAction(ONLINE)();
}

export function loginRequest(userName,password) {
  return createAction(LOGIN)({userName,password});
}

export async function autoLogin(dispatch) {
    const info = await AsyncStorage.getItem('auth');
    if (info) {
      const authInfo = JSON.parse(info);
      dispatch(createAction(AUTO_LOGIN)({userName:authInfo.userName,password:authInfo.password}));
    }
}

export function loginSuccess(user) {
  return createAction(LOGIN_SUCCESS)(user);
}

export function loginFail() {
  return createAction(LOGIN_FAIL)();
}

export function logoutRequest() {
  return createAction(LOGOUT)();
}

export function logoutSuccess() {
  return createAction(LOGOUT_SUCCESS)();
}

export function logoutFail() {
  return createAction(LOGOUT_FAIL)();
}

