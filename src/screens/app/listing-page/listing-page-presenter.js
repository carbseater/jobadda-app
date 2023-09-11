import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Chip,
  Searchbar,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import ChipDropdown from 'components/ChipDropdown';
import {cityOptions, departments} from 'constants/dropdown-options';
import {padding} from '../../../styleConfig/padding';
import {JobCard} from 'screens/app/listing-page/job-card';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {FilterModal} from 'screens/app/listing-page/filter-modal';
import {SelectedFilterRow} from 'screens/app/listing-page/filters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ListingPagePresenter = ({
  handleScroll,
  flatListRef,
  listOfJobs,
  isLoading,
  loadData,
  filters,
  setFilters,
}) => {
  const {colors} = useTheme();
  const [filterVisible, setFilterVisible] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Searchbar
        mode={'bar'}
        placeholder="Find jobs"
        style={styles.searchBar}
        traileringIcon={prop => (
          <TouchableRipple
            onPress={() => setFilterVisible(true)}
            borderless={true}>
            <MaterialCommunityIcons
              name="filter-outline"
              size={25}
              color={prop.color}
            />
          </TouchableRipple>
        )}
      />
      <FilterModal
        visible={filterVisible}
        filters={filters}
        setFilters={setFilters}
        onDismiss={() => setFilterVisible(!filterVisible)}
      />
      {/*<View style={styles.filterBar}>*/}
      <SelectedFilterRow filters={filters} setFilters={setFilters} />
      {/*</View>*/}

      <View style={{paddingHorizontal: padding.smallLg, flex: 1}}>
        <FlatList
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          data={listOfJobs}
          renderItem={({item}) => {
            console.log(item.companyName);
            return <JobCard jobData={item} />;
          }}
          onScroll={handleScroll}
          ListFooterComponent={
            <Button style={{height: 80}} onPress={loadData}>
              Load more
            </Button>
          }
        />
        {isLoading && (
          <ActivityIndicator color={colors.primary} size={'large'} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 8,
    margin: 10,
  },
  filterBar: {
    minHeight: scale(40),
    borderWidth: 1,
  },
  filterBody: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padding.small,
  },
});
