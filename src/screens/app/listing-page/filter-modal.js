import {Modal, ScrollView, StyleSheet, View} from 'react-native';
import {
  Checkbox,
  Divider,
  Text,
  TouchableRipple,
  RadioButton,
  Button,
} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import React from 'react';
import {windowWidth} from 'utils/dimension';
import {padding} from '../../../styleConfig/padding';
import {margin} from '../../../styleConfig/margin';
import Slider from '@react-native-community/slider';
import {formatIndianCurrency} from 'utils/general-fn';
import {SelectedFilterRow} from 'screens/app/listing-page/filters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const FilterModal = ({filters, setFilters, visible, onDismiss}) => {
  // console.log(filters);
  console.log(filters);
  const handleLabelClick = key => {
    setFilters(prevState => {
      const newState = {};
      for (const stateKey in prevState) {
        newState[stateKey] = {
          ...prevState[stateKey],
          selected: stateKey === key,
        };
      }
      return newState;
    });
  };

  // Function to handle checkbox selection
  const handleCheckboxToggle = (filterKey, id) => {
    // Check if the option is already selected
    let selectedOptions = filters[filterKey].value;
    if (selectedOptions?.includes(id)) {
      selectedOptions = selectedOptions.filter(option => option != id);
    } else {
      selectedOptions.push(id);
    }
    setFilters(prevState => ({
      ...prevState,
      [filterKey]: {
        ...prevState[filterKey],
        value: selectedOptions,
      },
    }));
  };

  const handleSliderValue = (filterKey, value) => {
    const roundedValue = Math.round(value);
    setFilters(prevState => ({
      ...prevState,
      [filterKey]: {...prevState[filterKey], value: roundedValue},
    }));
  };

  const handleRadioButton = (filterKey, value) => {
    setFilters(prevState => ({
      ...prevState,
      [filterKey]: {...prevState[filterKey], value: value},
    }));
  };
  const renderSelectedFilters = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.entries(filters).map(([key, filter]) => {
          if (filter.selected) {
            const {options, element} = filter;
            console.log('options', options);
            if (element === 'checkBox') {
              return options.map(option => {
                return (
                  <View style={styles.checkBox}>
                    <Checkbox
                      status={
                        filters[key].value?.includes(option.id)
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => handleCheckboxToggle(key, option.id)}
                    />
                    <Text>{option.name}</Text>
                  </View>
                );
              });
            } else if (element === 'rangePicker') {
              const {maxValue, minValue, value} = filter;

              return (
                <View style={styles.rangePicker}>
                  <Text>Minimum salary</Text>
                  <Text>
                    {formatIndianCurrency(filter.value || filter.initialValue)}
                  </Text>
                  <Slider
                    step={1000}
                    value={value}
                    maximumValue={maxValue}
                    minimumValue={minValue}
                    onValueChange={value => handleSliderValue(key, value)}
                  />
                </View>
              );
            } else {
              const {value, initialValue} = filter;
              return (
                <View style={{}}>
                  {options.map(option => {
                    return (
                      <View style={styles.radioButton}>
                        <RadioButton
                          value={value}
                          status={value === option.id ? 'checked' : 'unchecked'}
                          onPress={() => handleRadioButton(key, option.id)}
                        />
                        <Text>{option.name}</Text>
                      </View>
                    );
                  })}
                </View>
              );
            }
            // return <Text>{filter.label}</Text>;
          }
          return null; // Filter is not selected, don't render it
        })}
      </ScrollView>
    );
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onDismiss(false)}>
      <View style={styles.centeredView}>
        <View style={styles.container}>
          <View style={styles.head}>
            <Text style={{fontSize: 15}}>Filters</Text>
            <TouchableRipple onPress={() => onDismiss(false)}>
              <MaterialCommunityIcons name={'close'} size={25} />
            </TouchableRipple>
          </View>
          <Divider />
          <View style={styles.body}>
            <View style={styles.leftSection}>
              {Object.entries(filters).map(([key, filter]) => {
                return (
                  <TouchableRipple onPress={() => handleLabelClick(key)}>
                    <View
                      style={[
                        styles.labelBox,
                        {
                          backgroundColor: filters[key].selected
                            ? '#dadbdb'
                            : 'white',
                        },
                      ]}>
                      <Text>{filter.label}</Text>
                    </View>
                  </TouchableRipple>
                );
              })}
            </View>
            <Divider />
            <View style={styles.rightSection}>{renderSelectedFilters()}</View>
          </View>
          <View style={styles.footer}>
            <SelectedFilterRow filters={filters} setFilters={setFilters} />
            <Divider />
            <View style={styles.actionButton}>
              <Button style={{flex: 0.5}}>Clear filters</Button>
              <Button mode={'contained'} style={{borderRadius: 5, flex: 0.5}}>
                Apply filter
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000000AA',
    alignItems: 'center',
  },
  container: {
    flex: 1,

    width: '100%',
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  leftSection: {
    flex: 0.3,
    borderRightWidth: 0.2,
  },
  labelBox: {
    justifyContent: 'center',
    borderBottomWidth: 0.2,
    padding: padding.small,
  },
  rightSection: {
    flex: 0.7,
    paddingHorizontal: padding.small,
  },
  footer: {
    minHeight: 40,
  },
  checkBox: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 10,
    width: '90%',
    padding: padding.smallSm,
  },
  rangePicker: {},
  head: {
    padding: padding.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeIcon: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
    flex: 0.1,
    marginTop: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: scale(50),
  },
  text: {fontSize: scale(20)},
});
