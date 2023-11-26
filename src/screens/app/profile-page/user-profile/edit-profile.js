import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {padding} from 'styleConfig/padding';
import RadioButton from 'components/RadioButton';
import Datepicker from 'components/Datepicker';
import Dropdown from 'components/Dropdown';
import {margin} from 'styleConfig/margin';
import firestore from '@react-native-firebase/firestore';
import {collection} from 'constants/dbConstants';
import {useAuth} from 'AuthContext';
import BackButton from 'components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
export const EditProfile = ({route}) => {
  const navigator = useNavigation();
  const {fields, pageName} = route.params;

  const defaultValues = {};
  fields.forEach(item => (defaultValues[item.id] = item.value));

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: defaultValues,
  });

  console.log('Errors', errors);
  const {
    currentUser: {uid},
  } = useAuth();
  const onSubmitForm = async form => {
    console.log('UID', uid);
    await firestore()
      .doc(`${collection.EMPLOYEE}/${uid}`)
      .set(form, {merge: true});
    navigator.goBack();
    ToastAndroid.show(`${pageName} updated`, ToastAndroid.SHORT);
    console.log('Succesfully updated');
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton onPress={() => navigator.goBack()} />
      <Text style={styles.pageName}>{pageName}</Text>
      <View style={{height: scale(30)}} />

      {fields.map(
        ({value: defaultValue, id, minLength, maxLength, regex, ...props}) => {
          return (
            <>
              <Controller
                control={control}
                rules={{
                  pattern: {
                    message: props.label + ' is not correct',
                    value: regex,
                  },
                  required: {
                    message: props.label + ' is required',
                    value: true,
                  },

                  minLength: {
                    message:
                      props.label +
                      ' is less than ' +
                      minLength +
                      ' characters',
                    value: minLength,
                  },
                  maxLength: {
                    message:
                      props.label +
                      ' is greater than ' +
                      maxLength +
                      ' characters',
                    value: maxLength,
                  },
                }}
                render={({field: {onChange, value}}) => (
                  <FormElementMapper
                    onChange={onChange}
                    defaultValue={defaultValue}
                    value={value}
                    {...props}
                  />
                )}
                name={id}
              />
              {errors[id]?.message && (
                <HelperText type="error">{errors[id]?.message}</HelperText>
              )}
            </>
          );
        },
      )}
      <View style={styles.button}>
        <Button onPress={() => navigator.goBack()}>Cancel</Button>
        <Button mode="contained" onPress={handleSubmit(onSubmitForm)}>
          Save
        </Button>
      </View>
    </ScrollView>
  );
};

const FormElementMapper = props => {
  const {
    type,
    label,
    onChange,
    value,
    defaultValue,
    options,
    keyboardType,
    disabled,
  } = props;
  const elements = {
    text: (
      <TextInput
        style={{marginTop: margin.smallMd}}
        mode="outlined"
        autoCapitalize="characters"
        defaultValue={defaultValue}
        value={value}
        onChangeText={text => onChange(text)}
        label={label}
        disabled={disabled}
        keyboardType={keyboardType || 'default'}
      />
    ),
    radio: <RadioButton {...props} />,
    datePicker: <Datepicker minAge={18} {...props} />,
    dropdown: <Dropdown {...props} />,
  };
  return elements[type];
};
const styles = StyleSheet.create({
  container: {
    padding: padding.smallMd,
  },
  button: {
    marginTop: margin.large,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  pageName: {
    textAlign: 'center',
    fontSize: 20,
  },
});
