import React, {Component} from 'react';
import {connect} from "react-redux";
import {
  Image,
  View,
  StyleSheet, Text
} from "react-native";
import {getNotificationsCount} from "../../chat/selector";

const styles = StyleSheet.create({
  badgeView: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {color: 'white', fontSize: 10},
});

class BadgeTabIcon extends Component {
  render() {
    return (
      <View>
        {this.props.icon}
        { this.props.notificationCount > 0 ?
          <View style={styles.badgeView}>
            <Text style={styles.badgeText}>{this.props.notificationCount}</Text>
          </View>
          : null
        }
      </View>
    );
  }
}

export default connect(state => ({
  notificationCount: getNotificationsCount(state),
}))(BadgeTabIcon);
