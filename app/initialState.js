import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  auth:{
    loading: false,
    authed: false,
    authedUser: null,
    offline: false,
    needAutoLogin: false,
  },
  chats:{
    loading: false,
    sending: false,
    noMoreMsgs: false,
    currentChat: null,
    currentMsgList: null,
    chatList: null,
    chats: null,
    messages: null,
    notifications:{
      count: 0,
    },
  },
  // groups: {
  //   groups: null,
  //   membersInGroup: null,
  // },
  // orgs: {
  //
  // },
  // users: {
  //
  // },
});

export default initialState;
