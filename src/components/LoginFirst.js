import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export default function LoginFirst() {
  const navigation = useNavigation();

  const goLogin = () => {
    navigation.navigate('HomeStack');
  };

  return (
    <View style={styles.loginBefore}>
      <View style={styles.loginBeforeWrap}>
        <Text style={styles.loginTxt}>
          You seems have not login yet. Login to access this page
        </Text>
        <Button onPress={goLogin} style={styles.btnOutline} block>
          <Text style={styles.btnTxtOutline}>LOGIN</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginBefore: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBeforeWrap: {
    width: '70%',
  },
  loginTxt: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F271B',
    marginBottom: 20,
  },
  btnOutline: {
    marginTop: 20,
    borderRadius: 50,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#F26487',
  },
  btnTxtOutline: {
    color: '#F26487',
    fontSize: 12,
  },
});
