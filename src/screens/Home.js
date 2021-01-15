/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  RefreshControl,
} from 'react-native';
import Header from '../components/Header';
import CardNews from '../components/CardNews';
import CardCategory from '../components/CardCategory';
import {useNavigation} from '@react-navigation/native';
import service from '../helpers/services';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import actions from '../redux/actions/index';

export default function Home() {
  const dispatch = useDispatch();
  const newsData = useSelector((state) => state.getAllArticles.data);
  const categories = useSelector((state) => state.getAllCategories.data);
  const [data, setData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(actions.categoryActions.getAllCategories());
    dispatch(actions.articleActions.getAllArticles());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(actions.articleActions.getAllArticles());
    dispatch(actions.categoryActions.getAllCategories());
    setRefreshing(false);
  };

  const getData = async () => {
    const {data} = await service().get('public/article/all');
    setData(data);
    return data;
  };

  useEffect(() => {
    getData();
    console.log(data);
    console.log(data.results);
  }, []);

  const nextPage = async () => {
    const {nextLink} = data.pageInfo;

    if (nextLink) {
      const res = await axios.get(nextLink);
      const {results} = res.data;
      const newData = {
        ...data,
        results: [...data.results, ...results],
        pageInfo: res.pageInfo,
      };
      setData(newData);
    }
  };

  const goToArticle = (id) => {
    navigation.navigate('Article', {id});
    console.log(id);
  };

  const goToCategory = (id) => {
    navigation.navigate('ArticleInCategory', {id});
  };

  return (
    <SafeAreaView style={styles.parent}>
      <StatusBar barStyle="light-content" backgroundColor="#2D6B97" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        vertical
        style={styles.container}>
        <Header />
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>Categories</Text>
        </View>
        <View style={styles.categorySlide}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => goToCategory(item.id)}
                  style={
                    index === 0 ? styles.extraLeftMargin : styles.casualMargin
                  }>
                  <CardCategory data={item} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>Fresh news for you</Text>
        </View>

        <View style={styles.articlesWrapper}>
          <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.flatListRender}
            data={newsData}
            keyExtractor={(item) => item.id}
            onEndReached={nextPage}
            onEndReachedTreshold={0.5}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  onPress={() => goToArticle(item.item.id)}
                  style={styles.list}>
                  <CardNews data={item} />
                </TouchableOpacity>
              );
            }}
          />
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
  articlesWrapper: {
    flex: 1,
    width: '100%',
  },
  flatListRender: {
    marginVertical: 10,
  },
  list: {
    alignItems: 'center',
  },
  extraLeftMargin: {
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  casualMargin: {
    alignItems: 'center',
    marginRight: 5,
  },
  headingWrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
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
