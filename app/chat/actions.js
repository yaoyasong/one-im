/**
 * Created by yaoyasong on 2017/5/12.
 */

import { createAction } from 'redux-actions';

export const FETCH_CHATLIST = 'chats/FETCH_CHATLIST';
export const FETCH_CHATLIST_SUCCESS = 'chats/FETCH_CHATLIST_SUCCESS';
export const FETCH_CHATLIST_FAIL = 'chats/FETCH_CHATLIST_FAIL';

export const FETCH_CHAT = 'chats/FETCH_CHAT';
export const FETCH_CHAT_SUCCESS = 'chats/FETCH_CHAT_SUCCESS';
export const FETCH_CHAT_FAIL = 'chats/FETCH_CHAT_FAIL';

export const FETCH_PRE_CHAT = 'chats/FETCH_PRE_CHAT';
export const FETCH_PRE_CHAT_SUCCESS = 'chats/FETCH_PRE_CHAT_SUCCESS';
export const FETCH_PRE_CHAT_FAIL = 'chats/FETCH_PRE_CHAT_FAIL';


export const SAVE_DIALOGUE = 'chats/SAVE_DIALOGUE';
export const SAVE_DIALOGUE_SUCCESS = 'chats/SAVE_DIALOGUE_SUCCESS';
export const SAVE_DIALOGUE_FAIL = 'chats/SAVE_DIALOGUE_FAIL';

export const RECEIVED_WS_MSG = "app/RECEIVED_WS_MSG";

export const LEAVE_DIALOGUE = 'chats/LEAVE_DIALOGUE';

export function leaveDialogue() {
  return createAction(LEAVE_DIALOGUE)();
}
export function fetchChatList() {
  return createAction(FETCH_CHATLIST)();
}

export function fetchChatListSuccess(chats) {
  return createAction(FETCH_CHATLIST_SUCCESS)(chats);
}

export function fetchChatListFail(error) {
  return createAction(FETCH_CHATLIST_FAIL)(error);
}

export function fetchChat(topicId) {
  return createAction(FETCH_CHAT)(topicId);
}

export function fetchChatSuccess(chat) {
  return createAction(FETCH_CHAT_SUCCESS)(chat);
}

export function fetchChatFail(error) {
  return createAction(FETCH_CHAT_FAIL)(error);
}

export function fetchPreChat({topicId,timestamp}) {
  return createAction(FETCH_PRE_CHAT)({topicId,timestamp});
}

export function fetchPreChatSuccess(chat) {
  return createAction(FETCH_PRE_CHAT_SUCCESS)(chat);
}

export function fetchPreChatFail(error) {
  return createAction(FETCH_PRE_CHAT_FAIL)(error);
}

export function saveDialogue(dialogue) {
  return createAction(SAVE_DIALOGUE)(dialogue);
}

export function saveDialogueSuccess(result) {
  return createAction(SAVE_DIALOGUE_SUCCESS)(result);
}

export function saveDialogueFail(error) {
  return createAction(SAVE_DIALOGUE_FAIL)(error);
}

export function receivedWsMsg(msg) {
  return createAction(RECEIVED_WS_MSG)(msg);
}
