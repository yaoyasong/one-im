import {online,offline} from '../../auth/actions';
import {receivedWsMsg} from '../../chat/actions';
import AV from 'leancloud-storage';
import {AV_APP_ID as appId, AV_APP_KEY as appKey} from '../../constants';
import {TypedMessagesPlugin} from 'leancloud-realtime-plugin-typed-messages'
import {Realtime} from "leancloud-realtime";

class LeanCloudAPI {
  constructor() {
    this.AV = null;
    this.realtime = null;
    this.imClient = null;
    this.username = null;
  }

  init() {
    AV.init({appId, appKey});
    this.AV = AV;
    this.realtime = new Realtime({
      appId,
      plugins: [TypedMessagesPlugin],
    });
  }

  async login(username,password) {
    const result = await this.AV.User.logIn(username, password);
    this.username = username;
    return result;
  }

  async logout() {
    if (this.imClient) {
      return await imClient.close();
    }
    if (this.AV) {
      return await this.AV.User.logOut();
    }
  }

  async createIMClient(dispatch) {
    console.log('init im client');
    if (!this.username) {
      throw new Error('Please login first.');
    }
    this.imClient = await this.realtime.createIMClient(this.username);

    this.realtime.on('message', function (msg) {
      console.log('msg: ' + msg);
      dispath && dispatch(receivedWsMsg(msg))
    });
    this.realtime.on('disconnect', function () {
      console.log('服务器连接已断开');
      dispath && dispatch(offline());
    });
    this.realtime.on('offline', function () {
      console.log('离线（网络连接已断开）');
      dispath && dispatch(offline());
    });
    this.realtime.on('online', function () {
      console.log('已恢复在线');
      dispath && dispatch(online());
    });
    this.realtime.on('schedule', function (attempt, delay) {
      console.log(delay + 'ms 后进行第' + (attempt + 1) + '次重连');
    });
    this.realtime.on('retry', function (attempt) {
      console.log('正在进行第' + (attempt + 1) + '次重连');
    });
    this.realtime.on('reconnect', function () {
      console.log('与服务端连接恢复');
    });

    return this.imClient;
  }
}

export default new LeanCloudAPI();
