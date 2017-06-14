/**
 * Created by yaoyasong on 2017/5/5.
 */

import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity, Image,Dimensions
} from 'react-native';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actions from '../../auth/actions';
import {SERVICE_REST_URL} from "../../constants";
import ImagePicker from 'react-native-image-picker'

class ProfileSetting extends Component {

  static navigationOptions = {
    title: '设置',
		rightButtonTitle: '保存',
  };

  constructor(props) {
    super(props);
    this._onAvatarPress = this._onAvatarPress.bind(this);
  }

  _onAvatarPress() {
    const options = {
      title:'请选择',
      cancelButtonTitle:'取消',
      takePhotoButtonTitle:'拍照',
      chooseFromLibraryButtonTitle: '从图库选择',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = { uri: response.uri };

        this.setState({
          avatarSource: source
        });
      }
    });

  }

  render() {
		const { user } = this.props;
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.msg} onPress={this._onAvatarPress}>
            <Text style={styles.label}>头像</Text>
            <Image style={styles.avatar} source={{uri: `${SERVICE_REST_URL}/fileUploadController/showPic/${user.userPicId}`}} />
          </TouchableOpacity>
          <View style={styles.msg}>
            <Text style={styles.label}>账号</Text>
            <Text style={styles.content}>{user.getUsername()}</Text>
          </View>
          <View style={styles.msg}>
            <Text style={styles.label}>姓名</Text>
            <Text style={styles.content}>{user.get('realname')}</Text>
          </View>
          <View style={styles.msg}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.content}>{user.getEmail()}</Text>
          </View>
          <View style={styles.msg}>
            <Text style={styles.label}>手机</Text>
            <Text style={styles.content}>{user.getMobilePhoneNumber()}</Text>
          </View>
          <View style={styles.msg}>
            <Text style={styles.label}>职位</Text>
            <Text style={styles.content}>{user.get('userOrgs')}</Text>
          </View>
          <View style={styles.btn} >
					  <Button onPress={ () => this.props.logoutRequest() } title = '退出登录' />
          </View>
				</View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		marginTop: 10,
    backgroundColor: '#fff',
	},
	avatar: {
    width:50,
    height:50,
  },
	msg: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  content: {
    flex:2,
    textAlign: 'right',
  },
  label: {
	  width: 50,
    textAlign: 'left',
    flex:1,
  },
  btn: {
    marginTop: 50,
    alignItems: 'center',
  }

});

const mapStateToProps = state => {
  return {
    user: state.getIn(['auth','authedUser'])}
};

export default connect(mapStateToProps, dispatch => bindActionCreators({...actions}, dispatch) )(ProfileSetting);