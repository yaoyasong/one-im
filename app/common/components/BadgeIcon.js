import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
  badgeView: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {color: 'white', fontSize: 12},
});

export default class BadgeIcon extends Component {
  render() {
    return (
      <View>
        <Image {...this.props}  />
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
