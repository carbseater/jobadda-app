import {useAuth} from 'AuthContext';
import {CircularLoader, ErrorPage} from 'components/CircularLoader';
import Datepicker from 'components/Datepicker';
import Dropdown from 'components/Dropdown';
import {departments} from 'constants/dropdown-options';
import {addWorkExperience} from 'firebase-database/write-operations';
import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Modal, StyleSheet, View} from 'react-native';
import {
  TextInput,
  Button,
  HelperText,
  Provider,
  Portal,
  IconButton,
  Text,
} from 'react-native-paper';
import {margin} from 'styleConfig/margin';
import {padding} from 'styleConfig/padding';

export const WorkExperienceForm = ({visible, dismiss, defaultValues}) => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm({defaultValues: defaultValues || {}});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const currentFormValues = watch();
  const {departmentName} = currentFormValues;
  const jobOptions =
    departments.find(department => department.id === departmentName?.id)
      ?.jobs || [];
  const {
    currentUser: {uid},
  } = useAuth();

  const onSubmit = async data => {
    try {
      await addWorkExperience(data, uid);
    } catch (err) {
      setIsError(err.toString());
    }
  };
  return (
    <Modal visible={visible} onRequestClose={dismiss}>
      {isLoading && <CircularLoader />}
      {isError && <ErrorPage error={isError} />}
      <Portal.Host>
        <View style={styles.content}>
          <View>
            <IconButton onPress={dismiss} icon={'close'} />
          </View>
          <View style={styles.heading}>
            <Text variant="headlineMedium">About job</Text>
          </View>
          <Controller
            control={control}
            rules={{
              required: 'Company name is required',
              minLength: {
                value: 3,
                message: 'Company name should contain at least 3 characters',
              },
            }}
            render={({field: {onChange, value}}) => (
              <TextInput
                mode="outlined"
                label="Company name"
                onChangeText={newText => onChange(newText)}
                value={value}
                style={{marginTop: 10}}
              />
            )}
            name="companyName"
          />
          {errors.companyName && (
            <HelperText style={{color: 'red'}}>
              {errors.companyName.message}
            </HelperText>
          )}

          <Controller
            control={control}
            rules={{
              required: 'Department is required',
            }}
            render={({field: {onChange, value}}) => (
              <Dropdown
                dropdownOptions={departments}
                onChange={onChange}
                label="Department"
                value={value}
              />
            )}
            name="departmentName"
          />
          {errors.departmentName && (
            <HelperText style={{color: 'red'}}>
              {errors.departmentName.message}
            </HelperText>
          )}

          <Controller
            control={control}
            rules={{
              required: 'Job title is required',
            }}
            render={({field: {onChange, value}}) => (
              <Dropdown
                dropdownOptions={jobOptions}
                disabled={departmentName == null}
                onChange={onChange}
                label="Job title"
                value={value}
              />
            )}
            name="jobTitle"
          />

          {errors.jobTitle && (
            <HelperText style={{color: 'red'}}>
              {errors.jobTitle.message}
            </HelperText>
          )}
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Datepicker
                onChange={onChange}
                label="Start date"
                value={value}
              />
            )}
            name="startDate"
          />

          {errors.startDate && (
            <HelperText style={{color: 'red'}}>
              {errors.startDate.message}
            </HelperText>
          )}
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Datepicker onChange={onChange} label="End date" value={value} />
            )}
            name="endDate"
          />

          {errors.endDate && (
            <HelperText style={{color: 'red'}}>
              {errors.endDate.message}
            </HelperText>
          )}
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                mode="outlined"
                onChangeText={newText => onChange(newText)}
                multiline
                numberOfLines={5}
                label="About job"
                value={value}
                placeholder="For eg. I was working as a CNC operator, and I learnt about CNC machines"
              />
            )}
            name="aboutJob"
          />

          {errors.aboutJob && (
            <HelperText style={{color: 'red'}}>
              {errors.aboutJob.message}
            </HelperText>
          )}

          <Button
            mode="contained"
            style={styles.addButton}
            onPress={handleSubmit(onSubmit)}>
            Add
          </Button>
        </View>
      </Portal.Host>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: padding.mediumMd,
  },
  heading: {
    alignItems: 'center',
  },
  addButton: {
    marginTop: margin.extraLarge,
    borderRadius: 3,
  },
});
