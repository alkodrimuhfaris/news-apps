import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function Notif({
  notifHeader = 'New notif',
  notifImg = 'http://52.200.32.180:8080/Uploads/2-product_image-1603966940378.jpg',
  notifBody = 'from where you are',
}) {
  return (
    <View style={notifStyle.commentWrap}>
      <View style={notifStyle.profPicWrapper}>
        <Image source={{uri: notifImg}} style={notifStyle.profPic} />
      </View>
      <View style={notifStyle.textWrap}>
        <TouchableOpacity>
          <Text style={notifStyle.header} numberOfLines={1}>
            {notifHeader}
          </Text>
          <Text style={notifStyle.body} numberOfLines={2}>
            {notifBody}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const notifStyle = StyleSheet.create({
  commentWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profPic: {
    height: 20,
    width: 20,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  profPicWrapper: {
    width: 30,
  },
  textWrap: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 5,
  },
  header: {
    marginBottom: 3,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F271B',
  },
  body: {
    fontSize: 14,
    color: '#1F271B',
  },
});
