import AV from 'leancloud-storage';
import {Realtime, TextMessage} from 'leancloud-realtime';
import {TypedMessagesPlugin, ImageMessage} from 'leancloud-realtime-plugin-typed-messages'
import {AV_APP_ID as appId, AV_APP_KEY as appKey} from '../../app/constants';
import {init} from '../../app/common/utils/leanCloudAPI';
import {sendChat, queryChat, queryChats, queryFile, queryThumbnail} from '../../app/chat/services';

describe('leancloud service test suit', () => {
  beforeAll(async () => {
    AV.init({appId, appKey});
    global.realtime = new Realtime({
      appId,
      plugins: [TypedMessagesPlugin],
    });
    global.AV = AV;
    global.imClient = null;
  });

  afterAll(() => {
    global.AV = null;
    global.realtime = null;
  });

  it('init client test',async () => {
    init('aabb');
    console.log(global.imClient)
    const result = await sendChat('yys', 'test1234');
    console.log(result);
  })
});