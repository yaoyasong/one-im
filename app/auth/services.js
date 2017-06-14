import LeanCloudAPI from '../common/utils/leanCloudAPI';

export async function login(username, password) {
  const result = await LeanCloudAPI.AV.User.logIn(username, password);
  return result;
  // return {username:'yys'};
}

export async function logout() {
  // return await LeanCloudAPI.AV.User.logOut();
  return await LeanCloudAPI.imClient.close();
}

export async function signUp(username, password, email, mobile, realname) {
  const user = new LeanCloudAPI.AV.User();
  user.setUsername(username);
  user.setPassword(password);
  user.setEmail(email);
  user.setMobilePhoneNumber(mobile);
  user.set('realname', realname);
  return await user.signUp();
}

export function destroy(username) {
  const user = new LeanCloudAPI.AV.User();
  user.setUsername(username);

  return user.destroy();
}

export function getCurrentUser() {
  return LeanCloudAPI.AV.User.current();
}

export function queryUsers() {
  const cql = 'select * from _User';
  return LeanCloudAPI.AV.Query.doCloudQuery(cql);
}

export function queryUser(username) {
  const cql = `select * from _User where username = '${username}'`;
  return LeanCloudAPI.AV.Query.doCloudQuery(cql);
}
