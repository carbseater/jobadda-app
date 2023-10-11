import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import React, {useState} from 'react';
import {color} from 'constants/colors';
import {scale} from 'react-native-size-matters';
import {windowWidth} from 'utils/dimension';

export const CircularLoader = () => {
  const {colors} = useTheme();
  return (
    // <Modal animationType="fade" transparent={true} visible={true}>
    <View style={styles.centeredView}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
    // </Modal>
  );
};

export function ErrorPage({error}) {
  const [visible, setVisible] = useState(true);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.error}>
          {!error && (
            <Text style={{fontSize: scale(15), textAlign: 'center'}}>
              Something went wrong
            </Text>
          )}
          {error && (
            <Text style={{fontSize: scale(12)}}>{error.toString()}</Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // backgroundColor: '#000000AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 0.1,
    backgroundColor: 'white',
    padding: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    width: windowWidth * 0.7,
    paddingHorizontal: scale(10),
  },
});
