import {StyleSheet, View} from 'react-native';
import {RadioButton as Radio, useTheme, Text} from 'react-native-paper';
import {scale} from 'react-native-size-matters';

import {memo} from 'react';
import {margin} from 'styleConfig/margin';
import {padding} from 'styleConfig/padding';

const RadioButton = ({radioOptions, disabled, value, onChange, label}) => {
  const {colors} = useTheme();

  // console.log('Radio button rendered');
  return (
    <View
      style={[
        styles.radioButton,
        {
          backgroundColor: disabled ? colors.background : 'white',
          borderColor: disabled ? colors.onSurfaceDisabled : 'black',
        },
      ]}>
      <Text
        style={{
          marginBottom: scale(5),
          paddingLeft: scale(8),
          color: disabled ? colors.onSurfaceDisabled : 'black',
        }}>
        {label}
      </Text>
      <Radio.Group
        onValueChange={newValue => {
          onChange(newValue);
        }}
        value={value}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {Object.entries(radioOptions).map(([key, val]) => {
            return (
              <View
                key={val.id}
                style={{
                  flexDirection: 'row',
                  marginHorizontal: scale(5),
                  alignItems: 'center',
                }}>
                <Radio value={val.name} disabled={disabled} />
                <Text
                  style={{
                    textAlign: 'center',
                    color: disabled ? colors.onSurfaceDisabled : 'black',
                  }}>
                  {val.name}
                </Text>
              </View>
            );
          })}
        </View>
      </Radio.Group>
    </View>
  );
};

export default memo(RadioButton);

const styles = StyleSheet.create({
  radioButton: {
    marginTop: margin.mediumXs,
    borderWidth: 0.5,
    padding: padding.small,
    borderRadius: 3,
  },
});
