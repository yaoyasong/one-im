import * as actions from './actions';
import Immutable from 'immutable';
import {REHYDRATE} from 'redux-persist/constants'
import initialState from '../initialState';

export default function authReducer(state,action) {
  switch (action.type) {
    case actions.LOGIN:
      return state
        .set('loading',true)
        .set('authed', false)
        .set('error', null);
    case actions.LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('authed', true)
        .set('needAutoLogin', false)
        .set('authedUser', action.payload);
    case actions.LOGIN_FAIL:
      return state
        .set('loading',false)
        .set('authed',false)
        .set('needAutoLogin', false)
        .set('authedUser',null);
    case actions.LOGOUT:
      return initialState.get('auth');

    case REHYDRATE:
      const nextState = Immutable.fromJS(action.payload.auth);
      if (nextState) {
        return nextState.set("needAutoLogin", action.payload.auth.get('authed'));
      }
      return state;

    default:
      return state;
  }
}