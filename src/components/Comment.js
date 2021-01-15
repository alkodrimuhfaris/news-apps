import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Form, Button, Label, Textarea} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import CommentTemplate from './CommentTemplate';

export default function Comment() {
  const [commentRep, setCommentRep] = useState('');
  const [openRep, setOpenRep] = useState(false);
  const sendCommentRep = () => {
    console.log(commentRep);
  };

  return (
    <View style={commentStyles.parent}>
      <View style={commentStyles.templateWrapper}>
        <CommentTemplate />
      </View>
      <View style={commentStyles.repWrapper}>
        <View style={commentStyles.chevronFlex}>
          <TouchableOpacity onPress={() => setOpenRep(!openRep)}>
            <FontAwesomeIcon
              icon={openRep ? faChevronRight : faChevronDown}
              size={20}
              color={'#084F6C'}
            />
          </TouchableOpacity>
        </View>
        <View style={commentStyles.rightFlex}>
          {openRep ? (
            <View style={commentStyles.fillerRep}>
              <TouchableOpacity onPress={() => setOpenRep(!openRep)}>
                <Text style={commentStyles.labelTxt}>See replies...</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={commentStyles.rep}>
              <TouchableOpacity styles={commentStyles.loadCommentWrapper}>
                <Text style={commentStyles.labelTxt}>
                  Load more comments...
                </Text>
              </TouchableOpacity>
              <View style={commentStyles.commentRepWrapper}>
                <ScrollView>
                  {[...Array(5)].map((_item, index) => {
                    return (
                      <View key={index} style={commentStyles.templateWrapper}>
                        <CommentTemplate />
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
              <View>
                <Form style={commentStyles.commentPost}>
                  <Label style={commentStyles.labelTxt}>Give A Reply</Label>
                  <Textarea
                    placeholder="Write your reply here"
                    onChangeText={(e) => setCommentRep(e)}
                    style={commentStyles.input}
                    value={commentRep}
                    block
                  />
                </Form>
                <KeyboardAvoidingView style={commentStyles.btnWrapper}>
                  <Button
                    onPress={() => sendCommentRep()}
                    style={commentStyles.btnComment}>
                    <Text style={commentStyles.btnTxtComment}>REPLY</Text>
                  </Button>
                </KeyboardAvoidingView>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const commentStyles = StyleSheet.create({
  parent: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  templateWrapper: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    alignItems: 'center',
  },
  repWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  chevronFlex: {
    width: 45,
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  commentRightFlex: {
    flex: 1,
    padding: 5,
  },
  fillerRep: {
    height: 'auto',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rep: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  commentRepWrapper: {
    height: 'auto',
    width: '100%',
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
  loadCommentWrapper: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
