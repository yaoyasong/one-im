/**
 * Created by yaoyasong on 2017/5/5.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
	Image,
  TouchableOpacity
} from 'react-native';
import BadgeIcon from "../common/components/BadgeIcon";
import {userGroupImage} from "../images";

const ChatItem = ({chatItem,clickAction}) => {
	return (
	  <TouchableOpacity onPress={clickAction} >
      <View style={styles.container} >
        <BadgeIcon source={userGroupImage} style={{width:60,height:60}} notificationCount={chatItem.notificationCount} />
        <View style={styles.chat}>
          <Text style={styles.chatTitle} numberOfLines={1}>{chatItem.title}</Text>
          <Text style={styles.chatSubTitle} numberOfLines={1}>{chatItem.subTitle}</Text>
        </View>
        <View >
          <Text style={styles.chatDate}>{chatItem.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		borderTopWidth: 1,
		borderTopColor: '#fcfcfc',
		backgroundColor: '#fff',
	},
	
	chat: {
		flex: 8,
		display: 'flex',
		flexDirection: 'column',
    justifyContent: 'center',
		marginLeft: 20,
	},
	chatTitle: {
		fontSize: 16,
	},
	chatSubTitle: {
	  marginTop: 5,
		fontSize: 12,
	},	
	chatDate: {
		flex: 2,
		fontSize: 12,
	}	
});

export default ChatItem;
