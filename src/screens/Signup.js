/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Input, Form, Item, Button, Label} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';

export default function ChangeProfile() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    console.log(email);
    console.log(name);
    console.log(password);
  }, [email, name, password]);

  return (
    <View style={styles.parent}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Sign Up</Text>

        <ScrollView style={styles.scroll}>
          <Form style={styles.container}>
            <View style={styles.secondary}>
              <Item floatingLabel style={styles.floatingLbl}>
                <Label style={styles.labelTxt}>Name</Label>
                <Input
                  placeholder="Name"
                  onChangeText={(e) => setName(e)}
                  style={styles.input}
                  value={name}
                  block
                />
              </Item>

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

              <Item floatingLabel style={styles.floatingLbl}>
                <Label style={styles.labelTxt}>Confirm Password</Label>
                <Input
                  placeholder="Confirm Password"
                  onChangeText={(e) => setConfirmPassword(e)}
                  secureTextEntry
                  style={styles.input}
                  value={confirmPassword}
                />
              </Item>
            </View>
          </Form>
        </ScrollView>

        <View style={styles.forgotWrapper}>
          <Text style={styles.forgot}>Already have an account?</Text>
          <FontAwesomeIcon icon={faLongArrowAltRight} color={'#F26487'} />
        </View>

        <Button style={styles.btn} block>
          <Text style={styles.btnTxt} block>
            SIGN UP
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFFFF',
  },
  wrapper: {
    backgroundColor: '#FEFFFF',
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
    borderBottomColor: '#F26487',
  },
  secondary: {
    marginTop: 10,
    marginBottom: 20,
    elevation: 5,
    borderRadius: 10,
    paddingRight: 10,
    paddingBottom: 20,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelTxt: {
    fontSize: 16,
    color: '#F26487',
  },
  title: {
    marginLeft: 20,
    fontSize: 34,
    color: '#145C9E',
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
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
    color: '#084F6C',
  },
  btn: {
    marginTop: 20,
    borderRadius: 50,
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#145C9E',
  },
  btnTxt: {
    color: 'white',
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
});
