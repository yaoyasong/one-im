import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';
import authReducer from './auth/reducer';
import authSaga from './auth/saga';
import chatReducer from './chat/reducer';
import chatSaga from './chat/saga';
import { createLogger } from 'redux-logger'
import initialState from "./initialState";
import {persistStore, autoRehydrate} from 'redux-persist-immutable'
import {AsyncStorage} from 'react-native'
import Immutable from 'immutable';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const middlewares = [];

if (isDebuggingInChrome) {
  const logger = createLogger({
    // diff: true,
    // collapse: true,
    stateTransformer: (state) => {
      if (Immutable.Iterable.isIterable(state)) return state.toJS();
      else return state;
    }
  });
  middlewares.push(logger);
}

const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

const store = createStore(
  combineReducers({
    auth: authReducer,
    chats: chatReducer
  }),
  initialState,
  compose(
    applyMiddleware(...middlewares),
    autoRehydrate({log:true})
  )
);

function* allSagas() {
  yield fork(authSaga);
  yield fork(chatSaga);
}
sagaMiddleware.run(allSagas);

export default configureStore = (onComplete) => {
  persistStore(store, {storage: AsyncStorage},onComplete);
  return store;
};