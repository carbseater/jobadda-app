import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, Searchbar} from 'react-native-paper';
import {padding} from 'styleConfig/padding';

export const SkillsPage = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Tell us about your skills</Text>
      <Searchbar
        placeholder="Search skills"
        value="ads"
        onChangeText={newText => {}}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: padding.small,
  },
});
