/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Form, Button, Label, Textarea} from 'native-base';
import Comment from '../components/Comment';
import {useSelector, useDispatch} from 'react-redux';
import {API_URL} from '@env';
import moment from 'moment';
import actions from '../redux/actions/index';
import ModalLoading from '../components/ModalLoading';

export default function Article({route}) {
  const dispatch = useDispatch();
  const {id} = route.params;
  const [comment, setComment] = useState('');
  const getArticleId = useSelector((state) => state.getArticleId);
  const data = useSelector((state) => state.getArticleId.data);

  useEffect(() => {
    dispatch(actions.articleActions.getArticleById(id));
  }, [id]);

  const sendComment = () => {
    console.log(comment);
  };

  return (
    <View style={styles.parent}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ModalLoading modalOpen={getArticleId.pending} />
      <ScrollView vertical style={styles.container}>
        <View style={styles.wrap}>
          <Text style={styles.title}>
            {Object.keys(data).length && data.title}
          </Text>
        </View>
        <View style={styles.detailWrap}>
          <Text style={styles.detail}>
            Author: {Object.keys(data).length && data.Author.name}
          </Text>
          <Text style={styles.detail}>
            Posted on:
            {Object.keys(data).length &&
              moment(data.createdAt).format(' MMM Do, YYYY')}
          </Text>
        </View>
        <Image
          source={{
            uri: Object.keys(data).length
              ? API_URL + data.picture
              : 'https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg',
          }}
          style={styles.picture}
        />
        <Text style={styles.caption}>
          Gambar: {Object.keys(data).length && data.caption}.
        </Text>
        <Text style={styles.article}>
          {Object.keys(data).length && data.article}
        </Text>

        <View style={styles.authorWrapper}>
          <View style={styles.authorContainer}>
            <Text style={styles.authorName}>
              {data.Author ? data.Author.name : null}
            </Text>
          </View>
        </View>

        <View style={styles.btnWrap}>
          <Form style={styles.commentPost}>
            <Label style={styles.labelTxt}>Comment</Label>
            <Textarea
              placeholder="Write your comment here"
              onChangeText={(e) => setComment(e)}
              style={styles.input}
              value={comment}
              block
            />
          </Form>
          <View style={styles.btnWrapper}>
            <Button onPress={() => sendComment()} style={styles.btnComment}>
              <Text style={styles.btnTxtComment}>COMMENT</Text>
            </Button>
          </View>
        </View>

        <View style={styles.commentWrap}>
          <ScrollView style={styles.commentContainer}>
            {[...Array(5)].map((_item, index) => {
              return (
                <View key={index} style={styles.templateWrapper}>
                  <Comment />
                </View>
              );
            })}
          </ScrollView>
          <TouchableOpacity style={styles.loadCommentWrapper}>
            <Text style={styles.labelTxt}>Load more comments...</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    position: 'relative',
  },
  wrap: {
    margin: '5%',
  },
  title: {
    color: '#1F271B',
    fontSize: 28,
    fontWeight: 'bold',
  },
  detailWrap: {
    flexDirection: 'row',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '2%',
    paddingBottom: '2%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#084F6C',
    marginBottom: 10,
  },
  detail: {
    marginRight: 10,
    color: '#1F271B',
  },
  picture: {
    width: '100%',
    height: 200,
  },
  caption: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: 12,
    color: '#5A6868',
  },
  article: {
    fontSize: 14,
    color: '#1F271B',
    marginTop: 10,
    marginBottom: 30,
    marginLeft: '5%',
    marginRight: '5%',
  },
  authorWrapper: {
    width: '100%',
    marginBottom: 50,
    backgroundColor: '#084F6C',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorContainer: {
    width: '80%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorProfpic: {
    height: 70,
    width: 70,
    borderRadius: 70,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  authorBio: {
    fontSize: 14,
    color: 'white',
  },
  btnWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  commentWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
  commentPost: {
    width: '90%',
    height: 100,
    marginTop: 5,
    marginBottom: 5,
  },
  labelTxt: {
    fontSize: 14,
    color: '#1F271B',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#084F6C',
    marginTop: 5,
    marginBottom: 5,
  },
  btnWrapper: {
    width: '90%',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  btnComment: {
    borderRadius: 50,
    alignItems: 'center',
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#145C9E',
  },
  btnTxtComment: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  templateWrapper: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    alignItems: 'center',
  },
  commentContainer: {
    width: '90%',
    height: 'auto',
    marginBottom: 30,
  },
  loadCommentWrapper: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
