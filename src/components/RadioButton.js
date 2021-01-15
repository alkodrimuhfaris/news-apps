import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle, faDotCircle} from '@fortawesome/free-solid-svg-icons';

const Radio = ({checked, setChecked, genders}) => {
  return (
    <View>
      <View style={styles.btn}>
        {genders.map((gender, key) => {
          return (
            <View key={gender}>
              {checked == key ? (
                <TouchableOpacity style={styles.btn}>
                  <FontAwesomeIcon
                    icon={faCircle}
                    size={20}
                    color={'#457373'}
                    regular
                  />
                  <Text style={key === 0 ? styles.male : styles.female}>
                    {gender}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setChecked(key);
                  }}
                  style={styles.btn}>
                  <FontAwesomeIcon
                    icon={faDotCircle}
                    size={20}
                    color={'#457373'}
                    regular
                  />
                  <Text style={key === 0 ? styles.male : styles.female}>
                    {gender}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
      {/* <Text>{gender[checked]}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  male: {
    fontSize: 16,
    marginRight: 20,
    marginLeft: 5,
  },
  female: {
    fontSize: 16,
    marginLeft: 5,
  },
  radio: {
    flexDirection: 'row',
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Radio;
