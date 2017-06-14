import React, {Component} from 'react';
import {Image, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

class HeaderRightButton extends Component {
  render() {
    return (
      <View style={{flexDirection:'row'}}>
        <Icon name="search" color="#000" size={15} style={{marginRight:20}} />
        <Icon name="plus" color="#000" size={15} style={{marginRight:20}} />
        {/*<Image source={searchBtnImage} style={{width:20, height: 20, tintColor:'#000', marginRight:20}} />*/}
        {/*<Image source={addBtnImage} style={{width:20, height: 20, tintColor:'#000', marginRight:20}} />*/}
      </View>
    );
  }
}

export default HeaderRightButton;