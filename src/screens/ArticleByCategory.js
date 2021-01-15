/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import CardNews from '../components/CardNews';

export default function SearchResult({route, navigation}) {
  const {id} = route ? route.params : {id: 0};
  const [category, setCategory] = useState('Environment');

  return (
    <SafeAreaView style={styles.parent}>
      <ScrollView vertical style={styles.container}>
        <Header
          title={category}
          category={category}
          img={
            'http://52.200.32.180:8800/Uploads/1-categoryPicture-1604820599024.jpg'
          }
        />
        <View style={styles.articlesInCategory}>
          {[...Array(5)].map((_item, index) => (
            <TouchableOpacity
              key={index}
              style={index === 0 ? styles.noTopMargin : styles.topMargin}>
              <CardNews />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FEFFFF',
    zIndex: 1,
  },
  articlesInCategory: {
    marginTop: 50,
    marginBottom: 50,
  },
  noTopMargin: {
    alignItems: 'center',
    marginBottom: 10,
  },
  topMargin: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  noLeftMargin: {
    alignItems: 'center',
    marginRight: 5,
  },
  leftMargin: {
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  headingWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    width: '70%',
    fontSize: 18,
    color: '#102526',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  saveBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  wrapper: {
    backgroundColor: '#FEFFFF',
    width: '80%',
  },
  container: {
    width: '100%',
    position: 'relative',
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
    fontWeight: 'bold',
  },
});
