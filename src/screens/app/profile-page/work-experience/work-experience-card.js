import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {List, Surface, Text} from 'react-native-paper';
import {extendedFunctions} from 'utils/eval';
import {lightColors} from 'core/theme';

export const WorkExperienceCard = ({work}) => {
  const {job_title, employer, start_date, end_date, description, location} =
    work ?? {};
  const [isExpanded, setIsExpanded] = useState(false);
  const tenure = extendedFunctions.getDateDiff(start_date, end_date);

  return (
    <Surface mode="flat" style={styles.container}>
      <List.Accordion
        left={props => <List.Icon {...props} icon="domain" />}
        title={employer}
        titleStyle={{fontWeight: 'bold'}}
        style={styles.accordion}
        expanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        description={job_title + ' - ' + tenure.trim()}>
        <List.Subheader numberOfLines={8}>
          <Text style={{fontWeight: 'bold'}}>{location + '\n'}</Text>
          {description}
        </List.Subheader>
      </List.Accordion>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
  },
  head: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  accordion: {
    backgroundColor: lightColors.elevation.level1,
    borderRadius: 3,
  },
});
