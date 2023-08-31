import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Chip, IconButton, Menu, useTheme} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
const ChipDropdown = ({
  label,
  value,
  onChange,
  disabled,
  iconName,
  chipOptions,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const isSelected = value;
  const {colors} = useTheme();
  return (
    <Menu
      visible={isMenuVisible}
      onDismiss={() => setIsMenuVisible(false)}
      anchor={
        <TouchableOpacity
          onPress={() => setIsMenuVisible(true)}
          style={[
            styles.container,
            {
              backgroundColor: isSelected
                ? 'rgba(0,0,0,0.1)'
                : colors.primaryContainer,
            },
          ]}>
          <Text>{value?.name || label}</Text>
          {value && (
            <Icon onPress={() => onChange(null)} size={20} name="close" />
          )}
          {!value && <Icon size={20} name="arrow-drop-down" />}
        </TouchableOpacity>
      }>
      {Object.entries(chipOptions)?.map(([key, value]) => (
        <Menu.Item
          key={key + value.name}
          onPress={() => {
            onChange({id: value.id, name: value.name});
            setIsMenuVisible(false);
          }}
          title={value.name}
        />
      ))}
    </Menu>
  );
};

export default ChipDropdown;

const styles = StyleSheet.create({
  container: {
    minHeight: scale(30),
    minWidth: scale(60),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    padding: 8,
    flexDirection: 'row',
  },
});
