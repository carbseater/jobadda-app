import {
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  Searchbar,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {padding} from 'styleConfig/padding';
import {JobCard} from 'screens/app/listing-page/job-card';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {FilterModal} from 'screens/app/listing-page/filter-modal';
import {SelectedFilterRow} from 'screens/app/listing-page/filters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {margin} from 'styleConfig/margin';
import EmptyBox from 'components/EmptyBox';

export const ListingPagePresenter = ({
  handleScroll,
  flatListRef,
  listOfJobs,
  isLoading,
  loadData,
  filters,
  setFilters,
  userData,
  refreshing,
  onRefresh,
  setLastJobDocument,
  setIsFilterEdited,
}) => {
  const {colors} = useTheme();
  const [filterVisible, setFilterVisible] = useState(false);

  // console.log('User', userData);
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={colors.elevation.level1}
        barStyle={'dark-content'}
      />
      <Surface style={{paddingHorizontal: padding.small}}>
        {/* <View
          style={{
            color: 'black',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: margin.smallLg,
          }}>
          <Text
            style={{
              fontSize: 20,
              padding: 0,
              color: 'black',
            }}>
            Hi, {userData?.firstName}
          </Text>
          <MaterialCommunityIcons
            name={'bell-outline'}
            color={'black'}
            size={25}
          />
        </View> */}
        <Searchbar
          mode={'bar'}
          placeholder="Search company"
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
          loadData={loadData}
          visible={filterVisible}
          filters={filters}
          setFilters={setFilters}
          onDismiss={() => setFilterVisible(!filterVisible)}
          setLastJobDocument={setLastJobDocument}
          setIsFilterEdited={setIsFilterEdited}
        />

        <SelectedFilterRow
          filters={filters}
          setFilters={setFilters}
          setIsFilterEdited={setIsFilterEdited}
        />
      </Surface>

      <View style={{paddingHorizontal: padding.small, flex: 1}}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          data={listOfJobs}
          renderItem={({item}) => {
            // console.log(item.companyName);
            return <JobCard jobData={item} />;
          }}
          onScroll={handleScroll}
          ListFooterComponent={
            <Button style={{height: 80}} onPress={() => loadData(false)}>
              Load more
            </Button>
          }
          ListEmptyComponent={<EmptyBox message={'No jobs found'} />}
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
  },
  filterBar: {
    minHeight: scale(40),
    borderWidth: 1,
  },
  filterBody: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
