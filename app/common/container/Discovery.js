/**
 * Created by yaoyasong on 2017/5/5.
 */

import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
	ListView,
	Image,
  TouchableOpacity
} from 'react-native';
import GroupedListItem from '../components/GroupedListItem';
import HeaderRightButton from "../components/HeaderRightButton";
import globalStyles from "../styles/globalStyles";
import Icon from 'react-native-vector-icons/FontAwesome';

class Discovery extends Component {

  static navigationOptions = {
    title: '发现',
		tabBarIcon: ({ tintColor, focused }) => (
			<Icon name="compass" size={20} color={tintColor} />
      //<Image source={ focused ? discoveryIconSelected: discoveryIcon } style={globalStyles.tabBarIcon}/>
    ),
    headerRight: (
      <HeaderRightButton />
    )
  };
	
	constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		const items = [
			{name:'咨询号',value:'channel',iconName:'book'},
			{name:'朋友圈',value:'friend',iconName:'delicious'},
			{name:'任务',value:'task',iconName:'share-alt-square'},
		];
    this.state = {
      dataSource: ds.cloneWithRows(items),
    };
		
		this._renderRow = this._renderRow.bind(this);
  }

	_renderRow(row) {
		return (
		  <TouchableOpacity onPress={row.onPress}>
			  <GroupedListItem row={row} icon={<Icon name={row.iconName} size={20} color="#3e9ce9" style={{margin:5}}/>} />
      </TouchableOpacity>
		);
	}

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
					enableEmptySections
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	itemContainer: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: 'white',
		margin: 10,
    padding: 10,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	item: {
		margin: 10,
	},
});

export default Discovery;