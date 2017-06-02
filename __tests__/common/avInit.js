/**
 * Created by yaoyasong on 2017/6/2.
 */

import AV from 'leancloud-storage';
import {AV_APP_ID as appId, AV_APP_KEY as appKey} from '../../app/constants';

describe('leancloud init test suit',() => {
  it('save user test', async () => {
    AV.init({appId, appKey});
    let user = new AV.User();
    user.setUsername('testuser1');
    user.setPassword('testpass');
    const result = await user.signUp();
    console.log(result);
  })
});
