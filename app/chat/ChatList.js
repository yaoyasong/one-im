/**
 * Created by yaoyasong on 2017/5/5.
 */

import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  ListView,
  View,
  Image,
  ScrollView,
  InteractionManager, RefreshControl
} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import ChatItem from './ChatItem';
import { formatTime } from '../common/utils/momentUtils';
import * as constants from '../constants';
import HeaderRightButton from "../common/components/HeaderRightButton";
import {getChatList, getChatLoading, getNotifications, } from "./selector";
import {getNeedAutoLogin, getOffline} from "../auth/selector";
import BadgeTabIcon from "../common/components/BadgeTabIcon";
import globalStyles from "../common/styles/globalStyles";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  listView: {flex:1,flexDirection: 'row', marginTop:20},
  rowView: {borderTopWidth:1,borderTopColor:'#e6e6e6'},
});

class ChatList extends Component {
  static navigationOptions = {
    title: '消息',
    tabBarIcon: ({ tintColor, focused }) => (
      <BadgeTabIcon icon={ <Icon name="comment" size={20} color={tintColor} /> } />
    ),
    headerRight: (
      <HeaderRightButton />
    )
  };

  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
  }

  _onRefresh = () => {
    this.props.fetchChatList();
  };

  _getNotificationCount = (topicId) => {
    const {notifications} = this.props;
    if (notifications)  return notifications.get(topicId);
    return 0;
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (this.props.needAutoLogin) {
        return;
      }
      this.props.fetchChatList();
    })
  }

  _renderOffline = () => {
    if (this.props.offline) {
      return(<Text>您现在处于离线状态</Text>);
    }
    return null;
  };

  _renderRow(rowData) {
    return (
      <View style={styles.rowView}>
        <ChatItem chatItem={{
          title: rowData.name,
          subTitle: this.getDialogueInfo(rowData),
          date: formatTime(rowData.lastMsg.timestamp),
          notificationCount: this._getNotificationCount(rowData.id),
        }} clickAction={() => this.props.navigation.navigate('Chat', {topicId: rowData.id, topicName: rowData.name} )}/>
      </View>
    );
  }

  getDialogueInfo(rowData) {
    let info = rowData.lastMsg.from + ': ' + rowData.lastMsg._lctext;
    return info;
  }

  render() {
    const { loading, chatList } = this.props;
    let chatListDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return (
      <View>
        {this._renderOffline()}
        <ListView
          dataSource={chatListDS.cloneWithRows(chatList ? chatList.toArray():[])}
          renderRow={this._renderRow}
          enableEmptySections
          refreshControl={
          <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this._onRefresh}
          /> }
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: getChatLoading(state),
    chatList: getChatList(state),
    offline: getOffline(state),
    needAutoLogin: getNeedAutoLogin(state),
    notifications: getNotifications(state),
  }
};
export default connect(mapStateToProps, dispatch => bindActionCreators({...actions}, dispatch))(ChatList);
