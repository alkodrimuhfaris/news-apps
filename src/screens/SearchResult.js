/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import CardNews from '../components/CardNews';

export default function SearchResult() {
  const [query, setQuery] = useState('Resep');

  return (
    <SafeAreaView style={styles.parent}>
      <ScrollView vertical style={styles.container}>
        <Header title={'Search Result'} />
        <View style={styles.headingWrapper}>
          <Text style={styles.heading} numberOfLines={2}>
            {'Result search for: ' + query}
          </Text>
        </View>
        {[...Array(5)].map((_item, index) => (
          <TouchableOpacity
            key={index}
            style={index === 0 ? styles.noTopMargin : styles.topMargin}>
            <CardNews />
          </TouchableOpacity>
        ))}
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
    marginTop: 20,
    marginBottom: 20,
  },
  heading: {
    width: '70%',
    fontSize: 18,
    color: '#102526',
    fontWeight: 'bold',
    textAlign: 'center',
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
  categorySlide: {
    marginBottom: 30,
  },
});
