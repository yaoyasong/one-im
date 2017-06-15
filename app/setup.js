import App from "./App";
import LeanCloudAPI from './common/utils/leanCloudAPI';
import toastUtils from "./common/utils/toastUtils";

function setup() {
  //init leancloud sdk
  LeanCloudAPI.init();
  //report error
  require('ErrorUtils').setGlobalHandler((err) => {
    toastUtils.showLong(err);
  });

  return App;
}
export default setup;
