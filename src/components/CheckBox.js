import {StyleSheet, Text, View} from 'react-native';
import {Checkbox as Check, Chip, useTheme} from 'react-native-paper';
import React from 'react';
import {scale} from 'react-native-size-matters';

const CheckBox = ({disabled, value, onChange, label}) => {
  return (
    <Chip
      disabled={disabled}
      selected={value}
      showSelectedOverlay
      onClose={() => console.log('closed')}
      onPress={() => onChange(!value)}>
      {label}
    </Chip>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    minHeight: scale(25),
    minWidth: scale(60),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
