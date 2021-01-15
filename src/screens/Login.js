/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Input, Form, Item, Button, Label} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
import authAction from '../redux/actions/auth';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import background from '../assets/photos/fisherMan.jpg';

export default function ChangeProfile(props) {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const token = useSelector((state) => state.auth.token);
  const auth = useSelector((state) => state.auth);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

  const login = () => {
    dispatch(authAction.login({email, password}));
    console.log(token);
  };

  const goSignUp = () => {
    navigation.navigate('AuthStack', {screen: 'Signup'});
  };

  return (
    <ImageBackground source={background} style={styles.parent}>
      <View style={styles.parentWrapper}>
        <View style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>eSea</Text>
            <Text style={styles.titleSmall}>Login</Text>
          </View>

          <ScrollView style={styles.scroll}>
            <Form style={styles.container}>
              <View style={styles.secondary}>
                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Email</Label>
                  <Input
                    placeholder="Email"
                    onChangeText={(e) => setEmail(e)}
                    style={styles.input}
                    value={email}
                    block
                  />
                </Item>

                <Item floatingLabel style={styles.floatingLbl}>
                  <Label style={styles.labelTxt}>Password</Label>
                  <Input
                    placeholder="Password"
                    onChangeText={(e) => setPassword(e)}
                    secureTextEntry
                    style={styles.input}
                    value={password}
                  />
                </Item>
              </View>
            </Form>
          </ScrollView>

          <View style={styles.forgotWrapper}>
            <Text style={styles.forgot}>Forgot your password?</Text>
            <FontAwesomeIcon icon={faLongArrowAltRight} color={'#F26487'} />
          </View>

          <Button onPress={login} style={styles.btn} block>
            <Text style={styles.btnTxt} block>
              LOGIN
            </Text>
          </Button>

          <View style={styles.signupContainer}>
            <TouchableOpacity onPress={goSignUp} style={styles.signupWrapper}>
              <Text style={styles.signupText}>
                Doesn't have an account? Sign Up here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  parent: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  parentWrapper: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D6B9750',
  },
  wrapper: {
    backgroundColor: 'transparent',
    width: '80%',
  },
  scroll: {
    height: 'auto',
  },
  container: {
    position: 'relative',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: 10,
  },
  floatingLbl: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2D6B97',
  },
  secondary: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    paddingRight: 10,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF90',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelTxt: {
    fontSize: 14,
    color: '#2D6B97',
  },
  titleWrapper: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 12,
  },
  titleSmall: {
    fontSize: 34,
    color: 'white',
    marginRight: 5,
  },
  forgotWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '5%',
    marginLeft: '5%',
    marginBottom: 30,
  },
  forgot: {
    marginRight: 2,
    color: 'white',
  },
  btn: {
    marginTop: 20,
    borderRadius: 50,
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'white',
  },
  btnTxt: {
    color: '#2D6B97',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    elevation: 5,
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    color: 'white',
    fontSize: 14,
  },
});
