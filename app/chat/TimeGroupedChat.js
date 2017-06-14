import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image, ScrollView, ListView, TouchableHighlight, RefreshControl, ActivityIndicator,Dimensions,
} from 'react-native';
import {SERVICE_REST_URL} from "../constants";
import {formatMsgTime} from '../common/utils/momentUtils';
import {delHtmlTag} from '../common/utils/codeutils';
import InvertibleScrollView from "react-native-invertible-scroll-view";

class TimeGroupedChat extends Component {
  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
    this._loadPreMore = this._loadPreMore.bind(this);
  }

  _renderRow(msg) {
    const isMe = msg.userId === this.props.currentUser.userId;
    const userName = isMe ? null : <Text>{msg.userName}</Text>;
    let msgStatus = null;
    if (msg.topicItemId === '11111') {
      msgStatus = <Text>发送中...</Text>;
    } else if (msg.topicItemId === '00000') {
      msgStatus = <Text>发送失败</Text>;
    }

    const imgRegexp = /^\[[0-9a-z]{24,}\]$/;
    const data = msg.dialogueInfo;
    const result = data.match(imgRegexp);
    let renderDialogueInfo;

    if (result != null) {
      const picId = result[0].substr(1,result[0].length - 1);
      renderDialogueInfo = <Image source={{uri: `${SERVICE_REST_URL}/fileUploadController/showPic/${picId}`}} style={{width:100,height:100}} />;
    } else {
      renderDialogueInfo =  <Text style={isMe ? styles.rightMsg : styles.leftMsg }>{delHtmlTag(msg.dialogueInfo)}</Text>;
    }

    return (
      <View style={isMe ? styles.rightChat : styles.leftChat } key={msg.topicItemId}>
        <Image source={{uri: `${SERVICE_REST_URL}/fileUploadController/showPic/${msg.userPicId}`}}
               style={styles.personIcon}/>
        <View style={{marginLeft: 10, marginRight: 10,}}>
          {userName}
          {renderDialogueInfo}
          <Text style={isMe ? styles.rightMsg : styles.leftMsg }>{formatMsgTime(msg.createDate)}</Text>
        </View>
        {msgStatus}
      </View>
    );
  }

  _loadPreMore() {
    if (this.props.loading) {
      return;
    }
    this.props.loadPreMsgs();
  }

  _renderFooter() {
    if (this.props.loading) {
      return (
        <View style={{marginVertical: 30 }}>
          <ActivityIndicator size='large'color="#3e9ce9" />
        </View>);
    }
    return <View style={{marginVertical: 10}}/>;
  }

  render() {
    const { messages } = this.props;
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <ListView
        renderScrollComponent={ props => <InvertibleScrollView {...props} inverted/> }
        dataSource={dataSource.cloneWithRows(messages ? messages.reverse().toArray() : [])}
        enableEmptySections
        onEndReached={ this._loadPreMore }
        onEndReachedThreshold={ 0.5 }
        renderRow={this._renderRow}
        renderFooter={ this._renderFooter }
      />
    );
  }
}

const { width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 10,
    marginTop: 10,
  },
  personIcon: {
    width: 50,
    height: 50,
  },
  leftChat: {
    flexDirection: 'row',
    margin: 10,
  },
  rightChat: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 10,
  },

  leftMsg: {
    backgroundColor: '#fff',
    fontSize: 14,
    padding: 10,
    maxWidth: width * 0.7,
  },
  rightMsg: {
    backgroundColor: '#3e9ce9',
    color: '#fff',
    fontSize: 10,
    padding: 10,
    maxWidth: width * 0.7,
  },
});

export default TimeGroupedChat;