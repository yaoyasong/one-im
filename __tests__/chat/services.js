import {queryChat, queryChats, sendChat, queryChatMsg, queryChatMsgIterator} from "../../app/chat/services";
import LeanCloudAPI from "../../app/common/utils/leanCloudAPI";

describe('leancloud service test suit', () => {
  beforeAll(async () => {
    LeanCloudAPI.init();
    await LeanCloudAPI.login('yys', '111111');
    await LeanCloudAPI.createIMClient();
  });

  afterAll(() => {
    LeanCloudAPI.logout();
  });

  test('send Chat test', async () => {
    const result = await sendChat('user1', '不知道4');
    console.log(result);
  });

  test('query chats test', async () => {
    const result = await queryChats();
    result.forEach(c => {
      let lastMsg = c.lastMessage;
      console.log(c._updatedAt);
      console.log(c.members.length);
      console.log(c.name);
      console.log(lastMsg._lctext);
      console.log(lastMsg.from);
      console.log(lastMsg.timestamp);
    });
  });

  test('query single chat test', async () => {
    const result = await queryChat('593fab6fa46814d9c7a34149');
    console.log(result);
  });

  test('query chat msg test', async () => {
    const result = await queryChatMsg('593fab6fa46814d9c7a34149');
    console.log(result);
  });

  test('query chat msg iterator', async () => {
    const msgIterator = await queryChatMsgIterator('593fab6fa46814d9c7a34149');
    const result = await msgIterator.next();
    console.log(result);
  });

});
