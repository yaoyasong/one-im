import App from "./App";
import AV from 'leancloud-storage';
import {AV_APP_ID as appId, AV_APP_KEY as appKey} from './constants';


function setup() {
  //init leancloud sdk
  AV.initialize(appId,appKey);
  global.AV = AV;

  return App;
}
export default setup;