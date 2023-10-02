import {Modal, ScrollView, StyleSheet, View} from 'react-native';
import {
  Checkbox,
  Divider,
  Text,
  TouchableRipple,
  RadioButton,
  Button,
  Surface,
  useTheme,
} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import React from 'react';
import {padding} from '../../../styleConfig/padding';
import uuid from 'react-native-uuid';
import Slider from '@react-native-community/slider';
import {formatIndianCurrency} from 'utils/general-fn';
import {
  jobFilters,
  jobFilters1,
  SelectedFilterRow,
} from 'screens/app/listing-page/filters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const FilterModal = ({filters, setFilters, visible, onDismiss,loadData,setLastJobDocument,setIsFilterEdited}) => {
  const {colors} = useTheme();
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
    let selectedOptions = [...filters[filterKey].value];
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
    console.log(filterKey, value);
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
  // console.log(filters);
  const clearFilter = () => {
    // console.log('Clicked');
    // console.log('Initial Job', jobFilters1.salary);
    const initial = Object.assign({}, jobFilters1);
    setFilters(prevState => initial);
    // console.log('Done');
  };
  const renderSelectedFilters = () => {
    const selectedFilter = Object.entries(filters).filter(
      ([filterName, filter]) => filter.selected === true,
    )[0];

    const [key, filter] = selectedFilter;
    const {options, element, value, minValue, maxValue} = filter ?? {};
    // console.log('Selected', key, filter);
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {element === 'checkBox' ? (
          options.map(option => {
            const isSelected = value.includes(option.id);
            return (
              <View style={styles.checkBox}>
                <Checkbox
                  status={isSelected ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckboxToggle(key, option.id)}
                />
                <Text variant={isSelected && 'bold'}>{option.name}</Text>
              </View>
            );
          })
        ) : element === 'rangePicker' ? (
          <View style={styles.rangePicker}>
            <View style={{padding: 10}}>
              <Text>Minimum salary</Text>
              <Text style={{fontSize: 20}}>
                ₹ {formatIndianCurrency(filter.value || filter.initialValue)}
              </Text>
            </View>

            <Slider
              step={1000}
              thumbTintColor={colors.primary}
              value={filter.value}
              maximumValue={maxValue}
              minimumValue={minValue}
              onValueChange={value => handleSliderValue(key, value)}
            />
          </View>
        ) : (
          <View style={{padding: 10}}>
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
        )}
      </ScrollView>
    );
  };

  const renderFilterLabel = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.entries(filters).map(([key, filter]) => {
          return (
            <TouchableRipple
              key={uuid.v4()}
              onPress={() => handleLabelClick(key)}>
              <Surface
                mode={filters[key].selected ? 'elevated' : 'flat'}
                // elevation={'8'}
                style={[
                  styles.labelBox,
                  {
                    backgroundColor:
                      filters[key].selected && colors.surfaceVariant,
                  },
                ]}>
                <Text>{filter.label}</Text>
              </Surface>
            </TouchableRipple>
          );
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
        <Surface mode={'flat'} style={styles.container}>
          <Surface mode={'flat'} style={styles.head}>
            <Text style={{fontSize: 18}}>Filters</Text>
            <TouchableRipple onPress={() => onDismiss(false)}>
              <MaterialCommunityIcons
                name={'close'}
                color={colors.primary}
                size={25}
              />
            </TouchableRipple>
          </Surface>

          <Surface mode={'flat'} style={styles.body}>
            <Surface style={styles.leftSection}>{renderFilterLabel()}</Surface>

            <Surface style={styles.rightSection}>
              {renderSelectedFilters()}
            </Surface>
          </Surface>
          <Surface style={styles.footer}>
            <SelectedFilterRow filters={filters} setFilters={setFilters} setIsFilterEdited={setIsFilterEdited}/>
            <Divider />
            <Surface style={styles.actionButton}>
              <Button style={{flex: 0.5}} onPress={clearFilter}>
                Clear filters
              </Button>
              <Button
                mode={'contained'}
                onPress={() => {
                  setLastJobDocument(undefined);
                  onDismiss();
                  loadData(true);
                }}
                style={{borderRadius: 5, flex: 0.5}}>
                Apply filter
              </Button>
            </Surface>
          </Surface>
        </Surface>
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
  },
  labelBox: {
    justifyContent: 'center',
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
    paddingHorizontal: padding.small,
  },
  text: {fontSize: scale(20)},
});
