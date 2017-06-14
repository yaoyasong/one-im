import { createSelector } from 'reselect'

export function getChatLoading(state) {
  return state.getIn(['chats', 'loading']);
}

export function getChatList(state) {
  return state.getIn(['chats', 'chatList']);
}

export function getChats(state) {
  return state.getIn(['chats', 'chatList']);
}

export function getCurrentChat(state) {
  return state.getIn(['chats', 'currentChat']);
}

export function getMessages(state) {
  return state.getIn(['chats', 'messages']);
}

export function getNoMoreMsgs(state) {
  return state.getIn(['chats', 'noMoreMsgs']);
}

export function getNotifications(state) {
  return state.getIn(['chats', 'notifications']);
}

export const getNotificationsCount = createSelector(
  getNotifications,
  (notifications) => notifications ? notifications.reduce((acc, val) => acc + val, 0) : 0
);

export const getNotificationsById = topicId => createSelector(
  getNotifications,
  items => items.get(topicId));
