import React, { Component} from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  PixelRatio,
  AsyncStorage,
  ViewPropTypes,
} from 'react-native';

import {bindActionCreators} from "redux";
import * as actions from './actions';
import {connect} from "react-redux";
import {getLoginLoading} from "./selector";

class Login extends Component {
  static navigationOptions = {
    title: '登陆',
  };

  static propTypes = {
    userName: PropTypes.string,
    password: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }

  componentDidMount() {
    this.loadAuth();
  }

  loadAuth = async () => {
    const info = await AsyncStorage.getItem('auth');
    this.setState(JSON.parse(info));
  };

  render() {
    const {loading} = this.props;
    return (
      <View style={styles.container}>
        <TextInput placeholder='输入用户名' style={styles.input} onChangeText={(userName) => {this.setState({userName})}} value={this.state.userName}/>
        <TextInput secureTextEntry={true} placeholder='输入密码' style={styles.input} onChangeText={(password) => {this.setState({password})}} value={this.state.password}/>
        <TouchableOpacity style={styles.btnContainer}>
          <Button  style={styles.loginBtn} disabled={loading} onPress={ () => this._onPressCallback() } title={`登录`} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onSignUp}>
          <Text style={styles.tipMsg} >注册新用户</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onPressCallback = () => {
    this.props.loginRequest(this.state.userName,this.state.password);
    this.saveAuth();
  };

  _onSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  saveAuth = async () => {
    await AsyncStorage.setItem('auth',JSON.stringify({userName:this.state.userName,password:this.state.password}));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 150,
    marginBottom: 50,
  },
  btnContainer: {
    width: 300,
    marginTop: 20,
  },
  loginBtn: {
    // borderRadius: 15,
    // borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
  },
  input: {
    width: 300,

  },
  tipMsg: {
    width: 300,
    color:"#4A90E2",
    textAlign:'left',
    marginTop:10},
});

const mapStateToProps = state => {
  return {
    loading: getLoginLoading(state),
  }
};
export default connect(mapStateToProps, dispatch => bindActionCreators({...actions}, dispatch) )(Login);
