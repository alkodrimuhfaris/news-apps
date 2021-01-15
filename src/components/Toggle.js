import React from 'react';
import {View, Switch, StyleSheet} from 'react-native';

export default function Toggle({isEnabled = false, toggleSwitch}) {
  return (
    <Switch
      trackColor={{false: '#767577', true: '#457373'}}
      thumbColor={isEnabled ? '#102526' : '#f4f3f4'}
      ios_backgroundColor="#9B8148"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
}
