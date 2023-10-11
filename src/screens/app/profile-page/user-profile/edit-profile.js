import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, TextInput} from 'react-native-paper';
import {padding} from 'styleConfig/padding';

export const EditProfile = ({route}) => {
  const {fields} = route.params;
  console.log(fields);
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {fields.map(({label, value: previousValue}) => {
        return (
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                mode="outlined"
                label={label}
                keyboardType="numeric"
                //   disabled={!isFormEditable}
                returnKeyType="next"
                value={previousValue || value}
                style={{marginTop: 10}}
                onChangeText={text => onChange(text)}
              />
            )}
            name={label}
          />
        );
      })}
      <Button>Save</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: padding.smallMd,
  },
});
