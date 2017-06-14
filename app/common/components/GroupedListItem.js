import React, { PropTypes } from 'react';
import { View, StyleSheet, ListView, Image,Text } from 'react-native';

const styles = StyleSheet.create({
	itemContainer: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: 'white',
		marginTop: 10,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	
	item: {
		margin: 5,
	}
});

const GroupedListItem = ({icon,row}) => {
	return (
		<View style={styles.itemContainer}>
			{icon}
			<Text className={styles.item} >{row.name}</Text>
		</View>	
	);
};

export default GroupedListItem;
