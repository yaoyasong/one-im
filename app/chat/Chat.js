/**
 * Created by yaoyasong on 2017/5/5.
 */

import React, { Component } from 'react';
import {
  Button, Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ListView,
  InteractionManager,
  TouchableOpacity,
} from 'react-native';
import TimeGroupedChat from "./TimeGroupedChat";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from './actions';
import ChatInputBar from "./ChatInputBar";
import {getChatLoading, getMessages, getNoMoreMsgs} from "./selector";
import {getAuthedUser} from "../auth/selector";

class Chat extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.topicName}`,
    headerRight: <TouchableOpacity onPress={ () => navigation.navigate('Group')} ><Image source={personIconSelected} style={styles.headerRightIcon} /></TouchableOpacity>
  });

  constructor(props) {
    super(props);
    this._loadPreMsgs = this._loadPreMsgs.bind(this);
    this.state = {
      topicId: this.props.navigation.state.params.topicId,
    }
  }

  componentDidMount() {
    this.props.fetchChat(this.state.topicId);
  }

  componentWillUnmount() {
    this.props.leaveDialogue(this.state.topicId);
  }

  sendMessage(msg) {
    this.props.saveDialogue({
      dialogueInfo: msg,
      dialogueType: 0,
      topicId: this.state.topicId,
      userId: this.props.currentUser.userId,
      userName: this.props.currentUser.userName,
      userPicId: this.props.currentUser.userPicId,
    });
  }

  _loadPreMsgs() {
    if (this.props.loading === false && !this.props.noMoreMsgs) {

      const msg = this.props.messages.get(0);
      if (msg) {
        this.props.fetchPreChat({topicId:this.state.topicId,timestamp:msg.createDate})
      }
    }
  }

  render() {
    const { loading, currentUser,messages, currentChat } = this.props;

    // if (loading) {
    //   return (<View><Text>加载中....</Text></View>);
    // }

    return (
      <View style={styles.container}>
        <TimeGroupedChat
          loading={loading}
          messages={messages}
          currentUser={currentUser}
          loadPreMsgs = { this._loadPreMsgs } />
        <ChatInputBar sendMsg = { (msg) => this.sendMessage(msg) } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRightIcon: {
    marginRight: 10,
    width: 30,
    height: 30
  }
});

const mapStateToProps = state => {
  return {
    loading: getChatLoading(state),
    messages: getMessages(state),
    currentUser: getAuthedUser(state),
    noMoreMsgs: getNoMoreMsgs(state),
  }};

const mapDispatchToProps = dispatch => {
  return {
    fetchChat: (...args) => dispatch(actions.fetchChat(...args)),
    fetchPreChat: (...args) => dispatch(actions.fetchPreChat(...args)),
    saveDialogue:(...args) => dispatch(actions.saveDialogue(...args)),
    leaveDialogue:(...args) => dispatch(actions.leaveDialogue(...args)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
