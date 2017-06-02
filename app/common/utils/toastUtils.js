import { Alert, ToastAndroid, Platform } from 'react-native';

const showShort = (content) => {
  if (!content) {
    return;
  }
  if (Platform.OS === 'ios') {
    Alert.alert('提示', content.toString());
  } else {
    ToastAndroid.show(content.toString(), ToastAndroid.SHORT);
  }
};

const showLong = (content) => {
  if (Platform.OS === 'ios') {
    Alert.alert('提示', content.toString());
  } else {
    ToastAndroid.show(content.toString(), ToastAndroid.LONG);
  }
};

export default {
  showShort,
  showLong
}
