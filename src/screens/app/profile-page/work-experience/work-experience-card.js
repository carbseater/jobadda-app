import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {List, Text} from 'react-native-paper';
import {margin} from 'styleConfig/margin';
import {extendedFunctions} from 'utils/eval';

export const WorkExperienceCard = ({work}) => {
  const {
    companyName,
    departmentName,
    jobTitle,
    verifiedByJobAdda,
    startDate,
    endDate,
    aboutJob,
  } = work ?? {};
  const [isExpanded, setIsExpanded] = useState(false);
  const tenure = extendedFunctions.getDateDiff(startDate, endDate);

  return (
    <View style={styles.container}>
      <List.Accordion
        left={props => <List.Icon {...props} icon="domain" />}
        title={jobTitle.name}
        titleStyle={{fontWeight: 'bold'}}
        style={{
          borderWidth: 0.5,

          borderBottomWidth: isExpanded ? 0 : 0.5,
        }}
        expanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        description={companyName.trim() + ' - ' + tenure.trim()}>
        <List.Subheader
          style={{borderWidth: 0.5, borderTopWidth: 0}}
          numberOfLines={8}>
          <Text style={{fontWeight: 'bold'}}>{departmentName.name + '\n'}</Text>

          {aboutJob}
        </List.Subheader>
      </List.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: margin.medium,
  },
  head: {
    alignItems: 'flex-start',
    borderWidth: 1,
    flexDirection: 'row',
  },
});
