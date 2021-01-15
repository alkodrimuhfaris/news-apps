import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function CommentTemplate({
  commentator = 'Anonim',
  profilePic = 'http://52.200.32.180:8080/Uploads/2-product_image-1603966940378.jpg',
  commentBody = 'no comment',
}) {
  return (
    <View style={commentDetail.commentWrap}>
      <View style={commentDetail.profPicWrapper}>
        <TouchableOpacity>
          <Image source={{uri: profilePic}} style={commentDetail.profPic} />
        </TouchableOpacity>
      </View>
      <View style={commentDetail.textWrap}>
        <TouchableOpacity>
          <Text style={commentDetail.commentator}>{commentator}</Text>
        </TouchableOpacity>
        <Text style={commentDetail.commentBody}>{commentBody}</Text>
      </View>
    </View>
  );
}

const commentDetail = StyleSheet.create({
  commentWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profPic: {
    height: 35,
    width: 35,
    borderRadius: 35,
    marginTop: 10,
    marginBottom: 10,
  },
  profPicWrapper: {
    width: 45,
  },
  textWrap: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 5,
  },
  commentator: {
    marginBottom: 3,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F271B',
  },
  commentBody: {
    fontSize: 14,
    color: '#1F271B',
  },
});
