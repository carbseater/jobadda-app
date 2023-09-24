import {View, Text, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {SegmentedButtons} from 'react-native-paper';
import {useUserData} from '../../../UserContext';

export const MyWork = () => {
  const [formKey, setFormKey] = useState('applied_jobs');
  const segmentButton = [
    {
      value: 'applied_jobs',
      label: 'Applied jobs',
      icon: 'text-box-multiple',
    },
    {
      value: 'invitations',
      label: 'Job invites',
      icon: 'bell-badge',
    },
  ];
  const {appliedJobs} = useUserData();
  return (
    <View>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <SegmentedButtons
        value={formKey}
        onValueChange={setFormKey}
        buttons={segmentButton}
        style={{borderRadius: 8}}
      />
      <View>
        {Object.entries(appliedJobs).map(([jobId, jobData]) => (
          <Text>{jobId}</Text>
        ))}
      </View>
    </View>
  );
};
