import App from "./App";
import LeanCloudAPI from './common/utils/leanCloudAPI';

function setup() {
  //init leancloud sdk
  LeanCloudAPI.init();
  return App;
}
export default setup;
