/**
 * Created by yaoyasong on 2017/5/5.
 */

import React, {Component} from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import GroupedListItem from "../components/GroupedListItem";
import globalStyles from "../styles/globalStyles";
import Icon from 'react-native-vector-icons/FontAwesome';

class Profile extends Component {

  static navigationOptions = {
    title: '我',
		tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="th" size={20} color={tintColor} />
      //<Image source={ focused ? personIconSelected: personIcon } style={globalStyles.tabBarIcon}/>
    ),
  };

  render() {
    return (      
        <View>
          <TouchableOpacity>
					  <GroupedListItem icon={<Icon name="bookmark" size={20} color="#3e9ce9" style={{margin:5}} />} row={{name:'收藏',value:'channel', }} />
          </TouchableOpacity>
          <TouchableOpacity>
					  <GroupedListItem icon={<Icon name="book" size={20} color="#3e9ce9" style={{margin:5}} />} row={{name:'文件',value:'channel'}} />
          </TouchableOpacity>
					<TouchableOpacity onPress={ () => this.props.navigation.navigate('ProfileSetting')}>
            <GroupedListItem icon={<Icon name="gear" size={20} color="#3e9ce9" style={{margin:5}} />} row={{name:'设置',value:'channel'}} />
          </TouchableOpacity>
        </View>
      
    );
  }
}

export default Profile;
