import { call, put, take, fork } from 'redux-saga/effects';

import * as actions from './actions';
import ToastUtils from '../common/utils/toastUtils';
import {login, logout} from './services';

// saga
function* loginWorker({userName,password}) {
  try {
    const result = yield login(userName,password);
    if (result) {
      yield put(actions.loginSuccess(result));
    } else {
      yield put(actions.loginFail());
      yield ToastUtils.showLong(result ? result.errorMessage: '登录失败');
    }
  } catch (error) {
    yield put(actions.loginFail());
    yield ToastUtils.showLong(error);
  }
}

function* autoLoginWorker({userName,password}) {
  try {
    const result = yield login(userName,password);
    if (result && result.authenticated) {
      yield put(actions.loginSuccess(result));
    } else {
      yield put(actions.loginFail());
      yield ToastUtils.showLong(result ? result.errorMessage: '登录失败');
    }
  } catch (error) {
    yield put(actions.loginFail());
    yield ToastUtils.showLong(error);
  }
}

export function* logoutWorker() {
  try {
    yield logout();
    yield put(actions.logoutSuccess());
  } catch (error) {
    yield put(actions.logoutFail());
    yield ToastUtils.showLong(error);
  }
}

/*=========== watch ================*/
function* watchLogin() {
  while (true) {
    const { payload } = yield take(actions.LOGIN);
    yield call(loginWorker,payload);
  }
}

function* watchAutoLogin() {
  while (true) {
    const { payload } = yield take(actions.AUTO_LOGIN);
    yield call(autoLoginWorker,payload);
  }
}

function* watchLogout() {
  while (true) {
    yield take(actions.LOGOUT);
    yield call(logoutWorker);
  }
}

export default function* watchall() {
  yield fork(watchLogin);
  yield fork(watchAutoLogin);
  yield fork(watchLogout);
}
