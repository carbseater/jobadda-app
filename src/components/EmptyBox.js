import {Image, StyleSheet, View} from 'react-native';

import React from 'react';
import emptyBox from 'assets/empty-box.png';
import {Text} from 'react-native-paper';
import {windowHeight} from 'utils/dimension';

export const EmptyBox = ({message}) => {
  return (
    <View style={styles.container}>
      <Image source={emptyBox} style={styles.image} />
      <Text variant="bodyMedium">{message || 'No data found'}</Text>
    </View>
  );
};

export default EmptyBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: windowHeight * 0.7,
  },
  image: {resizeMode: 'contain', height: 100, width: 100},
});
