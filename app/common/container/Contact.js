/**
 * Created by yaoyasong on 2017/5/5.
 */

import React, { Component } from 'react';
import {
  Button, Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import GroupedListItem from '../components/GroupedListItem';
import HeaderRightButton from "../components/HeaderRightButton";
import globalStyles from "../styles/globalStyles";
import Icon from 'react-native-vector-icons/FontAwesome';

class Contact extends Component {

  static navigationOptions = {
    title: '通讯录',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="users" size={20} color={tintColor} />
      // <Image source={ focused ? contactIconSelected: contactIcon } style={[globalStyles.tabBarIcon,{tintColor: tintColor}]}/>
    ),
    headerRight: (
      <HeaderRightButton />
    )
  };

  render() {
    return (
      <View>
        <TouchableOpacity>
          <GroupedListItem row={{name:'我的群组',value:'channel'}} icon={<Icon name="th-list" size={20} color="#3e9ce9" style={{margin:5}}/>}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => this.props.navigation.navigate('ProfileSetting')} >
          <GroupedListItem row={{name:'联系人',value:'channel'}} icon={<Icon name="user" size={20} color="#3e9ce9" style={{margin:5}}/>} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Contact;