import React,{Component} from "react";
import {Button, TextInput, TouchableOpacity, View} from "react-native";
import toastUtils from "../common/utils/toastUtils";
import LeanCloudAPI from '../common/utils/leanCloudAPI';

export default class SignUp extends Component {
  static navigationOptions = {
    title: '注册用户',
  };

  constructor(props) {
    super(props)
    this.state = {
      userName: null,
      password: null,
      realname: null,
      email: null,
      mobilePhoneNumber: null,
    };
  }

  _onSignUp = () => {
    const {userName,password,realname,email,mobilePhoneNumber} = this.state;
    if (!userName || !password) {
      toastUtils.showShort('用户名或密码不能为空。');
      return;
    }
    const user = new LeanCloudAPI.AV.User();
    user.setUsername(userName);
    user.setPassword(password);
    user.setEmail(email);
    user.setMobilePhoneNumber(mobilePhoneNumber);
    user.set('realname',realname);

    user.signUp().then((result) => {
      toastUtils.showShort('注册成功。');
      this.props.navigation.navigate('Login');
    },(err) => {
      toastUtils.showShort(`注册失败。${err}`);
    })
  };

  render() {
    return (
      <View>
        <TextInput placeholder='输入用户名' onChangeText={(userName) => {
          this.setState({userName})
        }} value={this.state.userName}/>
        <TextInput secureTextEntry={true} placeholder='输入密码' onChangeText={(password) => {
          this.setState({password})
        }} value={this.state.password}/>
        <TextInput placeholder='输入姓名' onChangeText={(realname) => {
          this.setState({realname})
        }} value={this.state.realname}/>
        <TextInput placeholder='输入Email' onChangeText={(email) => {
          this.setState({email})
        }} value={this.state.email}/>
        <TextInput placeholder='输入手机号码' onChangeText={(mobilePhoneNumber) => {
          this.setState({mobilePhoneNumber})
        }} value={this.state.mobilePhoneNumber}/>
        <TouchableOpacity >
          <Button onPress={this._onSignUp} title={`注册`}/>
        </TouchableOpacity>
      </View>
    );
  }
}
