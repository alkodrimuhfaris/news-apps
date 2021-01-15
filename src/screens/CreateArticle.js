/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Form, Button, Label, Image, Textarea, Icon} from 'native-base';
import {useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import LoginFirst from '../components/LoginFirst';
import ImagePicker from 'react-native-image-picker';
import ModalAlert from '../components/ModalAlert';
import ModalLoading from '../components/ModalLoading';
import ModalCenter from '../components/ModalCenter';

export default function ChangeProfile() {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [picture, setPicture] = useState('');
  const [pictureProps, setPictureProps] = useState({});
  const [notifProps, setNotifProps] = useState({});
  const [openNotif, setOpenNotif] = useState(false);
  const [selectPicture, setSelectPicture] = useState(false);
  const [article, setArticle] = useState('');

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log(title);
    console.log(caption);
    console.log(article);
  }, [title, caption, article]);

  const option = [
    {
      label: 'Open Galery',
      actions: () => {
        ImagePicker.launchImageLibrary(
          {
            mediaType: 'photo',
            noData: true,
            storageOptions: {
              skipBackup: true,
            },
          },
          (response) => {
            if (response.didCancel) {
            } else if (response.fileSize > 2 * 1024 * 1024) {
              setNotifProps({
                content: 'file size must not exceed 2 MB!',
                useOneBtn: true,
                confirm: () => {
                  setOpenNotif(false);
                },
              });
              setOpenNotif(true);
            } else {
              setPicture({uri: response.uri});
              setPictureProps({
                uri: response.uri,
                type: response.type,
                name: response.fileName,
                path: response.path,
              });
            }
          },
        );
      },
    },
    {
      label: 'Open Camera',
      actions: () => {
        ImagePicker.launchCamera(
          {
            mediaType: 'photo',
            noData: true,
            storageOptions: {
              skipBackup: true,
            },
          },
          (response) => {
            if (response.didCancel) {
            } else if (response.fileSize > 2 * 1024 * 1024) {
              setNotifProps({
                content: 'file size must not exceed 2 MB!',
                useOneBtn: true,
                confirm: () => {
                  setOpenNotif(false);
                },
              });
              setOpenNotif(true);
            } else {
              setPicture({uri: response.uri});
              setPictureProps({
                uri: response.uri,
                type: response.type,
                name: response.fileName,
                path: response.path,
              });
            }
          },
        );
      },
    },
  ];

  const loginProps = {
    content: 'Login To Create Article',
    confirm: () => {
      navigation.navigate('AuthStack', {screen: 'Login'});
    },
    discard: () => {
      navigation.goBack();
    },
  };

  return (
    <View style={styles.main}>
      {!token ? (
        <View style={styles.parent}>
          <ModalAlert modalOpen={!token && isFocused} {...loginProps} />
          <ModalCenter
            modalContent={
              <View style={styles.contentWrapper}>
                {option.map((opt, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionStyle}
                      onPress={() => opt.actions()}>
                      <Text style={styles.optionTxt}>{opt.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            }
            modalOpen={selectPicture}
            setModalOpen={setSelectPicture}
          />
          <View style={styles.groupBtn}>
            <Button style={styles.btnOutline}>
              <Text style={styles.btnTxtOutline}>DISCARD</Text>
            </Button>

            <View style={styles.saveGroup}>
              <Button style={styles.btnSave}>
                <Text style={styles.btnTxtSave}>SAVE TO DRAFT</Text>
              </Button>

              <Button style={styles.btn}>
                <Text style={styles.btnTxt}>PUBLISH</Text>
              </Button>
            </View>
          </View>

          <Form style={styles.formWrapper}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.wrapper}>
              <View style={[styles.form, styles.title]}>
                <Label style={styles.labelTxt}>Title</Label>
                <Textarea
                  placeholder="Write your title here"
                  onChangeText={(e) => setTitle(e)}
                  style={styles.input}
                  value={title}
                  block
                />
              </View>

              <View style={[styles.form, styles.article]}>
                <Label style={styles.labelTxt}>Article</Label>
                <Textarea
                  placeholder="Write your article here"
                  onChangeText={(e) => setArticle(e)}
                  style={styles.input}
                  value={article}
                  block
                />
              </View>

              <View style={[styles.form, styles.picture]}>
                <Label style={styles.labelTxt}>Picture</Label>
                <TouchableOpacity
                  onPress={() => setSelectPicture(true)}
                  style={styles.selectPicture}>
                  {picture ? (
                    <View style={styles.pictureWrapper}>
                      <Image
                        style={styles.selectedPicture}
                        source={{uri: picture}}
                      />
                    </View>
                  ) : (
                    <Icon
                      type="Ionicons"
                      name="image-outline"
                      style={styles.icon}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View style={[styles.form, styles.caption]}>
                <Label style={styles.labelTxt}>Caption</Label>
                <Textarea
                  placeholder="Write your picture's caption here"
                  onChangeText={(e) => setCaption(e)}
                  style={styles.input}
                  value={caption}
                  block
                />
              </View>
            </ScrollView>
          </Form>
        </View>
      ) : (
        <LoginFirst />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    flex: 1,
  },
  parent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FEFFFF',
  },
  groupBtn: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  saveGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  selectPicture: {
    marginTop: 10,
    width: '100%',
    borderRadius: 8,
    elevation: 2,
    padding: 15,
    height: 'auto',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutline: {
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#F26487',
  },
  btnTxtOutline: {
    color: '#F26487',
    fontSize: 12,
  },
  btnSave: {
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#145C9E',
  },
  btnTxtSave: {
    color: '#2D6B97',
    fontSize: 12,
  },
  btn: {
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 10,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#2D6B97',
  },
  btnTxt: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  formWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  wrapper: {
    width: '90%',
  },
  icon: {
    fontSize: 24,
    color: '#AAA',
  },
  form: {
    marginTop: 10,
    marginBottom: 10,
  },
  labelTxt: {
    fontSize: 16,
    color: '#145C9E',
  },
  input: {
    flex: 1,
  },
  title: {
    height: 100,
  },
  article: {
    height: 250,
  },
  selectedPicture: {
    width: '100%',
    height: 180,
    zIndex: 1,
  },
  picture: {
    height: 'auto',
  },
  pictureWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  caption: {
    height: 100,
  },
  contentWrapper: {
    backgroundColor: 'white',
    width: '70%',
  },
  optionStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  optionTxt: {
    fontSize: 14,
    color: '#AAA',
  },
});
