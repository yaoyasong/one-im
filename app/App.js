import React, {Component} from "react";
import {
  View,
  Text, TouchableOpacity, TextInput, Button,
} from 'react-native';
import {StackNavigator} from "react-navigation";
import toastUtils from './common/utils/toastUtils'

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      password: null,
      sending: false,
    };
  }

  _onLogin = () => {
    const {userName,password} = this.state;
    if (!userName || !password) {
      toastUtils.showShort('用户名或密码不能为空。');
      return;
    }
    const user = new global.AV.User();
    user.setUsername(userName);
    user.setPassword(password);
    this.setState({sending:true});
    user.logIn().then((result) => {
      toastUtils.showShort('登录成功。');
      this.props.navigation.navigate('Home');
      this.setState({sending:false});
    },(err) => {
      toastUtils.showShort(`登录失败,${err}`);
      this.setState({sending:false});
    });

  };

  _onSignUp = () => {
    this.props.navigation.navigate('SignUp');
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
        <TouchableOpacity >
          <Button onPress={this._onLogin} title={`登录`} disabled={this.state.sending} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onSignUp}>
          <Text >注册新账户</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class SignUp extends Component {
  static navigationOptions = {
    title: 'SignUp',
  };

  constructor(props) {
    super(props)
    this.state = {
      userName: null,
      password: null,
    };
  }

  _onSignUp = () => {
    const {userName,password} = this.state;
    if (!userName || !password) {
      toastUtils.showShort('用户名或密码不能为空。');
      return;
    }
    const user = new global.AV.User();
    user.setUsername(userName);
    user.setPassword(password);
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
        <TouchableOpacity >
          <Button onPress={this._onSignUp} title={`注册`}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const ChatList = () => (
  <View>
    <Text>Chat List page.</Text>
  </View>
);

const StackNav = StackNavigator({
  Login: {screen: Login},
  SignUp: {screen: SignUp},
  Home: {screen: ChatList}
});

export default app = () => <StackNav />;
