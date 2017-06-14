import * as actions from './actions';
import {call, put, take, fork} from 'redux-saga/effects';
import ToastUtils from '../common/utils/toastUtils';
import {queryChat, queryChats, sendChat, queryChatMsg, queryChatMsgIterator} from './services';

async function apiFetchChatList() {
  const result = await queryChats();
  return result;
}

async function apiFetchChat({topicId}) {
  const result = await queryChatMsg(topicId);
  return result;
}

async function apiSaveDialogue(dialogue) {
  const result = await sendChat(dialogue.target, dialogue.content);
}

function* chatListSage() {
  try {
    const result = yield call(apiFetchChatList);
    yield put(actions.fetchChatListSuccess(result));
  } catch (error) {
    yield put(actions.fetchChatListFail(error));
    ToastUtils.showShort(error);
  }
}

function* chatSaga(topicId) {
  try {
    const result = yield call(apiFetchChat, {topicId});
    yield put(actions.fetchChatSuccess(result));
  } catch (error) {
    yield put(actions.fetchChatFail(error));
    ToastUtils.showShort(error);
  }
}

function* preChatSaga({topicId}) {
  try {
    const result = yield call(apiFetchChat, {topicId});
    yield put(actions.fetchPreChatSuccess(result));
  } catch (error) {
    yield put(actions.fetchPreChatFail(error));
    ToastUtils.showShort(error);
  }
}

function* saveDialogueSaga(dialogue) {
  try {
    const result = yield call(apiSaveDialogue, dialogue);
    yield put(actions.saveDialogueSuccess(result));
  } catch (error) {
    yield put(actions.saveDialogueFail(error));
    ToastUtils.showShort(error);
  }
}

function* watchChatListSaga() {
  while (true) {
    yield take(actions.FETCH_CHATLIST);
    yield call(chatListSage);
  }
}

function* watchChatSaga() {
  while (true) {
    const params = yield take(actions.FETCH_CHAT);
    yield fork(chatSaga, params.payload);
  }
}

function* watchPreChatSaga() {
  while (true) {
    const params = yield take(actions.FETCH_PRE_CHAT);
    yield fork(preChatSaga, params.payload);
  }
}

function* watchSaveDialogueSaga() {
  while (true) {
    const params = yield take(actions.SAVE_DIALOGUE);
    yield fork(saveDialogueSaga, params.payload);
  }
}

export default function* watchAll() {
  yield fork(watchChatListSaga);
  yield fork(watchChatSaga);
  yield fork(watchPreChatSaga);
  yield fork(watchSaveDialogueSaga);
}
