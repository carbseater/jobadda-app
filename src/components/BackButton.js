import React, {memo} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import arrowBack from 'assets/arrow_back.png';
const BackButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Image style={styles.image} source={arrowBack} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 10,
    zIndex: 5,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);
