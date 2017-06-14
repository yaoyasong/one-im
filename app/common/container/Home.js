/**
 * Created by yaoyasong on 2017/5/5.
 */
import React,{ Component } from 'react';
import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation';

import Contact from "./Contact";
import ChatList from "../../chat/ChatList";
import Profile from "./Profile";
import ProfileSetting from "./ProfileSetting";
import Discovery from "./Discovery";
import Chat from "../../chat/Chat";
import LoginPage from "../../auth/Login";
import SignUpPage from "../../auth/SignUp";
import {connect} from "react-redux";
import {getAuthed, getAuthedUser,getNeedAutoLogin } from "../../auth/selector";
import {init} from '../utils/leanCloudAPI';
import {autoLogin} from "../../auth/actions";

const MainScreenNavigator = TabNavigator({
  ChatList: { screen: ChatList },
  Contact: { screen: Contact },
  Discovery: { screen: Discovery },
  Profile: { screen: Profile },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#3e9ce9',
      inactiveTintColor: '#999999',
      showIcon: true,
      // showLabel: false,
      indicatorStyle: {height: 0},
      style: {
        borderTopWidth:1,
        borderTopColor: '#e6e6e6',
        backgroundColor: '#fff'
      },
    }
  });

const StackNav = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Chat: { screen: Chat },
  ProfileSetting: { screen: ProfileSetting },
});

const Login = StackNavigator({
  Login: { screen: LoginPage },
  SignUp: {screen: SignUpPage },
});

class Home extends Component {

  componentDidMount() {
    this.initIMClient();
    if (this.props.needAutoLogin) {
      autoLogin(this.props.dispatch);
    }
  }

  componentDidUpdate() {
    this.initIMClient();
  }

  initIMClient = () => {
    const { authed, authedUser } = this.props;
    if ( authed ) {
      init(authedUser.username, this.props.dispatch);
    }
  };

  render() {
    const { authed } = this.props;
    if(!authed) {
      return (<Login/>);
    }
    return (<StackNav />);
  }
}

const mapStateToProps = function(state) {
  return {
    authed: getAuthed(state),
    authedUser: getAuthedUser(state),
    needAutoLogin: getNeedAutoLogin(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
};

export default connect(mapStateToProps, mapDispatchToProps )(Home);
