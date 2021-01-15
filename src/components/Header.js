import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell, faCircle, faSearch} from '@fortawesome/free-solid-svg-icons';
import homePhotos from '../assets/photos/homePhotos.jpg';
import {useNavigation} from '@react-navigation/native';
import Notif from './Notif';
import {useSelector} from 'react-redux';

export default function Header({
  title = 'eSea Home',
  img = null,
  category = null,
}) {
  const [openNotif, setOpenNotif] = useState(false);
  const [search, setSearch] = useState('');
  const [clickSearch, setClickSearch] = useState(false);
  const navigation = useNavigation();

  const isLogin = useSelector((state) => state.auth.isLogin);

  const goLogin = () => {
    navigation.navigate('AuthStack', {screen: 'Login'});
  };

  return (
    <View style={headerStyles.headerParent}>
      <View style={headerStyles.imageParent}>
        <Image
          source={
            img
              ? {
                  uri: img,
                }
              : homePhotos
          }
          style={headerStyles.image}
        />
      </View>
      <View style={headerStyles.inputWrapper}>
        {clickSearch ? (
          <Input
            rounded
            style={headerStyles.input}
            placeholder={'Search'}
            placeholderTextColor={'#DADADA'}
            value={search}
            onChangeText={(e) => setSearch(e)}
          />
        ) : (
          <Text style={headerStyles.headerTitle}>{title}</Text>
        )}

        <TouchableOpacity
          onPress={() => setClickSearch(!clickSearch)}
          style={
            !clickSearch
              ? headerStyles.iconSearch
              : headerStyles.iconSearchClick
          }>
          <FontAwesomeIcon
            icon={faSearch}
            color={!clickSearch ? '#DADADA' : 'black'}
            size={16}
          />
        </TouchableOpacity>
        {clickSearch ? (
          <TouchableOpacity style={headerStyles.goWrapper}>
            <Text style={headerStyles.go}>Go!</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {openNotif ? (
        <View style={headerStyles.notification}>
          <ScrollView>
            {[...Array(5)].map((_item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={headerStyles.templateWrapper}>
                  <Notif />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
      {!clickSearch ? null : !search ? (
        <Text style={headerStyles.headerSubtitle} numberOfLines={2}>
          {category ? `Search in ${category}` : 'Search anything'}
        </Text>
      ) : (
        <Text style={headerStyles.headerSubtitle} numberOfLines={2}>
          {category
            ? `Search in ${category} for: ${search}`
            : `Search for: ${search}`}
        </Text>
      )}
      {isLogin ? (
        <TouchableOpacity
          onPress={() => setOpenNotif(!openNotif)}
          style={headerStyles.notifContainer}>
          <View style={headerStyles.notifWrapper}>
            <View style={headerStyles.bellContainer}>
              <FontAwesomeIcon
                icon={faBell}
                color={'white'}
                size={28}
                regular
              />
            </View>
            <View style={headerStyles.notifDot}>
              <FontAwesomeIcon icon={faCircle} color={'red'} size={8} regular />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => goLogin()}
          style={!clickSearch ? headerStyles.login : headerStyles.loginBottom}>
          <Text style={headerStyles.loginTxt}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const headerStyles = StyleSheet.create({
  headerParent: {
    position: 'relative',
    backgroundColor: '#084F6C',
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    zIndex: 2,
    overflow: 'visible',
  },
  login: {
    position: 'absolute',
    top: 15,
    right: 12,
    padding: 5,
    borderRadius: 8,
    zIndex: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  loginBottom: {
    position: 'absolute',
    top: 100,
    right: 12,
    padding: 5,
    borderRadius: 8,
    zIndex: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  loginTxt: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageParent: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#084F6C',
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    zIndex: 2,
    opacity: 0.4,
    overflow: 'visible',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 150,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    zIndex: 1,
  },
  inputWrapper: {
    width: '100%',
    height: 40,
    position: 'relative',
    alignItems: 'center',
    zIndex: 3,
  },
  input: {
    borderColor: '#102526',
    paddingLeft: 70,
    borderRadius: 30,
    width: '70%',
    height: 40,
    zIndex: 3,
    backgroundColor: 'white',
  },
  goWrapper: {
    position: 'absolute',
    right: '15%',
    width: 40,
    height: 40,
    padding: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    zIndex: 5,
    elevation: 1,
  },
  go: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  iconSearch: {
    position: 'absolute',
    right: 26,
  },
  iconSearchClick: {
    position: 'absolute',
    left: '15%',
    top: -10,
    width: 60,
    height: 60,
    padding: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    zIndex: 4,
  },
  notification: {
    position: 'absolute',
    width: '70%',
    padding: 10,
    height: 300,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    top: 116,
    right: 49,
    zIndex: 4,
  },
  templateWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  headerTitle: {
    width: '70%',
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    marginTop: 25,
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    width: '60%',
    zIndex: 3,
  },
  notifContainer: {
    position: 'absolute',
    top: 90,
    right: 15,
    zIndex: 4,
  },
  notifWrapper: {
    position: 'relative',
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  bellContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
});
