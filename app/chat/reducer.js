import * as actions from './actions';
import {LOGOUT} from '../auth/actions';

import initialState from '../initialState';

import {Map,List} from 'immutable';

function appendDialogue(msgs,newMsg) {
  return msgs.push({
    ...newMsg,
    topicItemId:'11111',
  });
}

function replaceDialogue(msgs,newMsg) {
  return msgs.update(msgs.findIndex( m => m.topicItemId === '11111'),() => newMsg);
}

function replaceErrorDialogue(msgs) {
  return msgs.update(msgs.findIndex( m => m.topicItemId === '11111'),(msg) => msg.topicItemId = '00000');
}

function getNoMoreMsgs(dialogues) {
  return !dialogues || dialogues.length < 5;
}

export default function chatReducer(state, action) {

  switch (action.type) {
    case actions.FETCH_CHATLIST:
      return state.set('loading',true);
    case actions.FETCH_CHATLIST_SUCCESS:
      let chats = {...state.get('chats')};
      for (const chat of action.payload) {
        chats[chat.topicId] = chat;
      };
      return state
        .set('loading',false)
        .set('chats',chats)
        .set('chatList',List(action.payload));
    case actions.FETCH_CHATLIST_FAIL:
      return state
        .set('loading',false)
    case actions.FETCH_CHAT:
      return state
        .set('loading',true)
        .set('noMoreMsgs',false)
        .setIn(['notifications',action.payload],0)
        .set('currentChat',null);
    case actions.FETCH_CHAT_SUCCESS:
      return state
        .set('loading',false)
        .set('currentChat',action.payload)
        .set('messages',List(action.payload.dialogues))
        .set('noMoreMsgs', getNoMoreMsgs(action.payload.dialogues));

    case actions.FETCH_CHAT_FAIL:
      return state
        .set('loading',false)
        .set('currentChat',null);

    case actions.FETCH_PRE_CHAT:
      return state
        .set('loading',true);
    case actions.FETCH_PRE_CHAT_SUCCESS:
      return state
        .set('loading',false)
        .set('noMoreMsgs', getNoMoreMsgs(action.payload.dialogues))
        .set('messages',List(action.payload.dialogues).concat(state.get('messages')));
    case actions.FETCH_PRE_CHAT_FAIL:
      return state
        .set('loading',false);
    case actions.LEAVE_DIALOGUE:
      return state.set('currentChat',null).set('messages',null);
    case actions.SAVE_DIALOGUE:
      return state
        .set('sending',true)
        .set('messages',appendDialogue(state.get('messages'),action.payload));
    case actions.SAVE_DIALOGUE_SUCCESS:
      return state
        .set('sending',false)
        .set('messages',replaceDialogue(state.get('messages'),action.payload));
    case actions.SAVE_DIALOGUE_FAIL:
      return state
        .set('sending',false)
        .set('messages',replaceErrorDialogue(state.get('messages')));
    case actions.RECEIVED_WS_MSG:
      return receivedWsMsg(state,action.payload);
    case LOGOUT:
      return initialState.get('chats');
    default:
      return state;
  }
}

function receivedWsMsg(state,wsMsg) {
  if (!wsMsg || wsMsg.length < 46) { //只处理正常聊天消息
    return state;
  }
  const msgId = wsMsg.slice(4,46);
  const msgStr = wsMsg.slice(46,wsMsg.length);

  GLOBAL.WS.send(`CFM${msgId}`);//确认消息

  const msg = JSON.parse(msgStr);

  if (msg.type === '0') {//正常会话
    const dialogue = msg.extras;
    const currentChat = state.get('currentChat');

    if (currentChat && currentChat.topicId === dialogue.topicId) {
      state = state.updateIn(['messages'],(messages = []) => messages.push(dialogue));
    } else {
      state = state.updateIn(['notifications',dialogue.topicId],(val = 0) => val + 1);
    }
  }

  return state;
}