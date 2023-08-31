import React, {memo, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {format, parse} from 'date-fns';
import {TextInput} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native';

const DatePickerComponent = ({disabled, minAge, label, onChange, value}) => {
  const [open, setOpen] = useState(false);

  const currentDate = new Date();
  const maximumDate = new Date(
    currentDate.getFullYear() - (minAge || -100),
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  // console.log('MaximumDate', maximumDate);

  const [date, setDate] = useState(minAge ? maximumDate : currentDate);

  const convertDate = stringDate => {
    if (!stringDate || stringDate.length == 0) return null;
    const parsedDate = parse(stringDate, 'yyyy-MM-dd', new Date());
    const formattedDate = format(parsedDate, 'dd MMMM yyyy');
    return formattedDate;
  };
  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)} disabled={disabled}>
        <TextInput
          mode="outlined"
          label={label}
          value={convertDate(value)}
          editable={false}
          inputMode="text"
          readOnlyMode={true}
          autoCorrect={false}
          disabled={disabled}
          right={<TextInput.Icon icon="calendar" />}
          style={{marginVertical: scale(5)}}
        />
      </TouchableOpacity>

      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        androidVariant="nativeAndroid"
        maximumDate={maximumDate}
        onConfirm={date => {
          const parsedDate = format(date, 'yyyy-MM-dd');
          setOpen(false);
          onChange(parsedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default memo(DatePickerComponent);
