import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {API_URL} from '@env';

export default function CardCategories({data}) {
  return (
    <View style={categoryStyle.parent}>
      <Image
        source={{
          uri: API_URL + data.categoryPicture,
        }}
        style={categoryStyle.image}
      />
      <Text ellipsizeMode="tail" numberOfLines={2} style={categoryStyle.title}>
        {data.categoryName}
      </Text>
    </View>
  );
}

const categoryStyle = StyleSheet.create({
  parent: {
    width: 120,
    height: 'auto',
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    zIndex: 1,
  },
  title: {
    width: '70%',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
    color: '#102526',
  },
});
