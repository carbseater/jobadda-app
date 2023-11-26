import {View} from 'react-native';
import React, {memo, useState} from 'react';

import {Menu, TextInput, TouchableRipple, useTheme} from 'react-native-paper';
import {scale} from 'react-native-size-matters';

const DropdownPresenter = ({options, disabled, value, onChange, label}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const {colors} = useTheme();
  // console.log(options);
  return (
    <View style={{marginVertical: scale(5)}}>
      <Menu
        visible={isDropdownVisible}
        onDismiss={() => setIsDropdownVisible(false)}
        contentStyle={{
          backgroundColor: colors.primaryContainer,
        }}
        anchor={
          <TouchableRipple
            onPress={() => setIsDropdownVisible(true)}
            disabled={disabled}>
            <View pointerEvents={'none'}>
              <TextInput
                value={value || null}
                mode={'outlined'}
                label={label}
                pointerEvents={'none'}
                disabled={disabled}
                right={
                  <TextInput.Icon
                    icon={isDropdownVisible ? 'menu-up' : 'menu-down'}
                  />
                }
              />
            </View>
          </TouchableRipple>
        }>
        {options &&
          Object.entries(options)?.map(([key, value]) => {
            // console.log(value);
            return (
              <Menu.Item
                key={value.name + value.id}
                title={value.name}
                onPress={() => {
                  onChange(value.id);
                  setIsDropdownVisible(false);
                }}
              />
            );
          })}
      </Menu>
    </View>
  );
};

export default memo(DropdownPresenter);
