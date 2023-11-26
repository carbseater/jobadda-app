import {lightColors} from 'core/theme';
import React from 'react';
import {Controller} from 'react-hook-form';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  value,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginVertical: 8,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          onChangeText={newText => onChangeText(newText)}
          value={value}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          onChangeText={newText => onChangeText(newText)}
          value={value}
          style={{flex: 1, paddingVertical: 0}}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: lightColors.primary, fontWeight: '700'}}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export const FormInput = ({onChangeText, value, ...props}) => {
  const {id, label, control, length} = props;
  return (
    <Controller
      control={control}
      rules={{
        required: {
          message: label + ' is required',
          value: true,
        },
      }}
      render={({field: {onChange, value}}) => (
        <InputField onChangeText={onChange} value={value} {...props} />
      )}
      name={id}
    />
  );
};
