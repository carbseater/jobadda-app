import {
  cityOptions,
  departments,
  sortOption,
  workShift,
} from 'constants/dropdown-options';
import React, {useRef} from 'react';
import {ScrollView, View} from 'react-native';
import {Avatar, Chip, Surface} from 'react-native-paper';
import {isObjectNullOrEmpty} from 'utils/general-fn';
import {padding} from '../../../styleConfig/padding';

export const jobFilters = {
  department: {
    selected: true,
    dbPath: 'aboutJob.jobDepartment',
    label: 'Department',
    value: [],
    multipleValue: true,
    element: 'checkBox',
    options: departments,
  },
  city: {
    selected: false,
    dbPath: 'aboutJob.companyCity',
    label: 'City',
    initialValue: 'noida',
    value: ['noida'],
    multipleValue: true,
    element: 'checkBox',
    options: cityOptions,
    clause: 'where',
    operator: '==',
  },
  salary: {
    selected: false,
    dbPath: 'salaryStructure.minimumSalary',
    id: 'salary',
    label: 'Salary',
    initialValue: 5000,
    value: null,
    multipleValue: false,
    element: 'rangePicker',
    minValue: 5000,
    maxValue: 100000,
    clause: 'where',
    operator: '>=',
  },
  workShift: {
    selected: false,
    dbPath: 'workBenefits.nightShiftAvailable.available',
    id: 'workShift',
    label: 'Work shift',
    value: [],
    multipleValue: true,
    element: 'checkBox',
    options: workShift,
  },
  sortBy: {
    selected: false,
    element: 'radioButton',
    initialValue: '',
    value: null,
    label: 'Sort by',
    multipleValue: false,
    options: sortOption,
  },
};

export const jobFilters1 = {
  department: {
    selected: true,
    dbPath: 'aboutJob.jobDepartment',
    label: 'Department',
    value: [],
    multipleValue: true,
    element: 'checkBox',
    options: departments,
  },
  city: {
    selected: false,
    dbPath: 'aboutJob.companyCity',
    label: 'City',
    initialValue: 'noida',
    value: ['noida'],
    multipleValue: true,
    element: 'checkBox',
    options: cityOptions,
    clause: 'where',
    operator: '==',
  },
  salary: {
    selected: false,
    dbPath: 'salaryStructure.minimumSalary',
    id: 'salary',
    label: 'Salary',
    initialValue: 5000,
    value: null,
    multipleValue: false,
    element: 'rangePicker',
    minValue: 5000,
    maxValue: 100000,
    clause: 'where',
    operator: '>=',
  },
  workShift: {
    selected: false,
    dbPath: 'workBenefits.nightShiftAvailable.available',
    id: 'workShift',
    label: 'Work shift',
    value: [],
    multipleValue: true,
    element: 'checkBox',
    options: workShift,
  },
  sortBy: {
    selected: false,
    element: 'radioButton',
    initialValue: '',
    value: null,
    label: 'Sort by',
    multipleValue: false,
    options: sortOption,
  },
};

export const SelectedFilterRow = ({filters, setFilters}) => {
  const scrollViewRef = useRef(null);
  const handleRemoveFilter = filterName => {
    setFilters(prevState => ({
      ...prevState,
      [filterName]: {
        ...prevState[filterName],
        value: jobFilters[filterName].value,
      },
    }));
  };

  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };
  // const isSelectedFilterRowVisible = Object.entries(filters).some(([key,filter])=>return filter.)
  return (
    <View style={{}}>
      <View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={scrollToEnd}
          contentContainerStyle={{
            gap: 8,
            padding: padding.small,
          }}>
          {Object.entries(filters).map(([filterName, filter]) => {
            if (!isObjectNullOrEmpty(filter.value)) {
              const selectedOptionsLength =
                typeof filter.value === 'object' && filter.value.length;
              // console.log(filterName, selectedOptionsLength, filter);
              return (
                <Chip
                  key={filterName}
                  avatar={
                    selectedOptionsLength && (
                      <Avatar.Text label={selectedOptionsLength} size={25} />
                    )
                  }
                  onClose={() => handleRemoveFilter(filterName)}>
                  {filter.label}
                </Chip>
              );
            }
          })}
        </ScrollView>
      </View>
    </View>
  );
};
