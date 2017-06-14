import React,{Component} from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

class ChatInputBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg:null,
    }

    this._sendMsg = this._sendMsg.bind(this);
  }

  _sendMsg() {
    this.props.sendMsg(this.state.inputMsg);
    this.setState({inputMsg: null});
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} value={this.state.inputMsg} onChangeText={(inputMsg) => {this.setState({inputMsg})}} />
        <Button style={styles.send} title="发送" onPress={ () => this._sendMsg() }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height:50,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
  },
  send: {
    padding: 20,
    margin: 20,
  }

});

export default ChatInputBar;