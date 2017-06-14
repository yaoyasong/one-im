import {TextMessage} from 'leancloud-realtime';
import LeanCloudAPI from '../common/utils/leanCloudAPI';

export async function sendChat(target, msg) {
  const conversation = await LeanCloudAPI.imClient.createConversation({
    members: [target],
    name: target,
    unique: true
  });
  const result = await conversation.send(new TextMessage(msg));
  return result;
}

export async function queryChats() {
  return await LeanCloudAPI.imClient.getQuery().withLastMessagesRefreshed(true).containsMembers([LeanCloudAPI.username]).find();
}

export async function queryChat(chatId) {
  return await LeanCloudAPI.imClient.getConversation(chatId);
}

export async function queryChatMsg(chatId) {
  const conversation = await LeanCloudAPI.imClient.getConversation(chatId);
  const messageIterator = conversation.createMessagesIterator({ limit: 10 });
  return await messageIterator.next();
}

export async function queryChatMsgIterator(chatId) {
  const conversation = await LeanCloudAPI.imClient.getConversation(chatId);
  const messageIterator = conversation.createMessagesIterator({ limit: 10 });
  return messageIterator;
}

export function uploadFile(file) {

}

export function queryFile(fileId) {

}

export function queryThumbnail(fileId) {

}
