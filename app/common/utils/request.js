// import fetch from 'isomorphic-fetch'
import ToastUtils from './toastUtils';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  let errorMsg = response.statusText;
  switch (response.status) {
    case 401:
      errorMsg = '用户未登录';
    case 403:
      errorMsg = '用户没有权限';
  }
  const error = new Error(errorMsg ? errorMsg : `发生错误,error code ${response.status}`);
  error.response = response;
  ToastUtils.showShort(error);
  // throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const response = await fetch(url, options);
  checkStatus(response);
  if (response.status == 204) {
    return {};
  }
  const data = await response.json();
  return data;
}
