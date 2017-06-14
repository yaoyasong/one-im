import AV from 'leancloud-storage';
import {AV_APP_ID as appId, AV_APP_KEY as appKey} from '../../app/constants';
import {login, logout, signUp, destroy, getCurrentUser, queryUsers, queryUser} from '../../app/auth/services';
import LeanCloudAPI from '../../app/common/utils/leanCloudAPI';

describe('leancloud service test suit', () => {
  beforeAll(async () => {
    LeanCloudAPI.init();
    await login('yys', '111111');

  });

  afterAll(() => {
    logout();
  });

  test('login test', async () => {
    const result = await login('yys', '111111');
    expect(result.getUsername()).toEqual('yys');
  });

  test('update user info test', async () => {
    const loginedUser = await login('yys', '111111');
    loginedUser.set('realname','测试用户');
    const result = await loginedUser.save();
    expect(result.get('realname')).toEqual('测试用户');
  });

  test('signUp test', async () => {
    const result = await signUp('testuser2277', '112233', 'test77@test.com');
    expect(result.getUsername()).toEqual('testuser2277');
  });

  test('destroy user test', async () => {
    const result = await destroy('testuser2245');
    console.log(result);
    expect(result).not.toBeNull();
  });

  test('get current user test', () => {
    const currentUser = getCurrentUser();
    expect(currentUser.getUsername()).toEqual('yys');
  });

  test('query users test', async () => {
    const data = await queryUsers();
    expect(data.results.length).toEqual(12);
  });

  test('query user test', async () => {
    const data = await queryUser('yys');
    expect(data.results[0].getUsername()).toEqual('yys');
  });
});
