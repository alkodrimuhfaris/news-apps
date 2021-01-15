/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Icon} from 'native-base';
import {API_URL} from '@env';
import moment from 'moment';
import ModalAlert from '../components/ModalLoading';
import {useSelector, useDispatch} from 'react-redux';
import actions from '../redux/actions/index';

export default function CardNews({data}) {
  const {item} = data;
  const selfId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const deleteArticle = useSelector((state) => state.deleteArticle);
  const [toggle, setToggle] = React.useState(false);
  const [openNotif, setOpenNotif] = React.useState(false);
  const [notifProps, setNotifProps] = React.useState({});
  const [option, setOption] = React.useState([
    {
      name: 'Not interested',
      actions: () => console.log('not interested'),
    },
  ]);

  React.useEffect(() => {
    if (deleteArticle.succss || deleteArticle.error) {
      setNotifProps({
        content: deleteArticle.message,
        confirm: () => {
          dispatch(actions.articleActions.clearMessage());
          setOpenNotif(false);
        },
        useOneBtn: true,
      });
      setOpenNotif(true);
    }
  }, [deleteArticle.pending]);

  React.useEffect(() => {
    if (item.userId === selfId) {
      const newOption = [
        ...option,
        {
          name: 'Delete',
          actions: () => {
            setNotifProps({
              content: 'Are you sure want to delete this?',
              confirm: () => {
                dispatch(actions.articleActions.deleteArticle(token, item.id));
                setOpenNotif(false);
              },
              discard: () => {
                setOpenNotif(false);
              },
            });
            setOpenNotif(true);
          },
        },
      ];
      setOption(newOption);
    }
  }, [selfId]);

  return (
    <View style={cardStyle.parent}>
      <ModalAlert modalOpen={openNotif} {...notifProps} />
      {toggle ? (
        <View style={cardStyle.options}>
          {option.map((opt, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={opt.actions}
                style={cardStyle.optionChoice}>
                <Text style={cardStyle.optionTxt}>{opt.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
      <Image
        source={{
          uri: API_URL + item.picture,
        }}
        style={cardStyle.image}
      />
      <View style={cardStyle.container}>
        <View style={cardStyle.titleWrapper}>
          <Text ellipsizeMode="tail" numberOfLines={2} style={cardStyle.title}>
            {item.title}
          </Text>
        </View>
        <View style={cardStyle.captionWrapper}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={3}
            style={cardStyle.caption}>
            {item.caption}
          </Text>
        </View>
        <View style={cardStyle.iconWrapper}>
          <TouchableOpacity
            style={[cardStyle.iconContainer, cardStyle.width50]}>
            <Icon
              type="Ionicons"
              name="person-outline"
              style={cardStyle.icons}
            />
            <Text
              style={cardStyle.authorWrapper}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.Author.name}
            </Text>
          </TouchableOpacity>
          <Text style={cardStyle.time}>{moment(item.createdAt).fromNow()}</Text>
          <TouchableOpacity style={[cardStyle.iconContainer]}>
            <Icon
              type="Ionicons"
              name="share-social-outline"
              style={cardStyle.icons}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setToggle((prevState) => !prevState)}
            style={[cardStyle.iconContainer]}>
            <Icon
              type="Ionicons"
              name="ellipsis-vertical-outline"
              style={cardStyle.icons}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const cardStyle = StyleSheet.create({
  parent: {
    width: '90%',
    height: 'auto',
    borderRadius: 10,
    elevation: 3,
    marginVertical: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  options: {
    position: 'absolute',
    bottom: '15%',
    right: '12%',
    backgroundColor: 'white',
    elevation: 5,
  },
  optionChoice: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionTxt: {
    fontSize: 14,
    color: '#222',
  },
  relativeParent: {
    position: 'relative',
  },
  signTxt: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
    zIndex: 3,
  },
  image: {
    width: '100%',
    height: 180,
    zIndex: 1,
  },
  bellowImgWrap: {
    padding: 4,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  starWrap: {
    flexDirection: 'row',
  },
  caption: {
    fontSize: 16,
    color: '#AAA',
    fontWeight: '300',
  },
  container: {
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  title: {
    fontSize: 16,
    color: '#102526',
    fontWeight: 'bold',
  },
  titleWrapper: {
    marginBottom: 5,
    width: '100%',
  },
  captionWrapper: {
    marginBottom: 5,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  width50: {
    width: '40%',
  },
  authorWrapper: {
    width: '100%',
    fontSize: 16,
    color: '#AAA',
  },
  time: {
    fontSize: 16,
    color: '#AAA',
  },
  icons: {
    fontSize: 16,
    marginRight: 5,
  },
});
