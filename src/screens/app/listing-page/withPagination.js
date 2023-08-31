import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {ToastAndroid} from 'react-native';

export const withPagination = (path, limit) => WrappedComponent => {
  const PaginationComponent = props => {
    const [data, setData] = useState([]);
    const [lastFetchedKey, setLastFetchedKey] = useState(null);

    const onChildAdded = snapshot => {
      const newItem = snapshot.val();
      console.log('New item', newItem);
      setData(prevData => {
        if (!prevData || prevData?.length < limit) {
          if (!prevData) {
            return [{key: snapshot.key, ...newItem}];
          }
          return [...prevData, {key: snapshot.key, ...newItem}];
        } else {
          // Notify the user of new job openings
          ToastAndroid.show('New job openings added!', ToastAndroid.SHORT);
          return prevData; // Return the existing data without modification
        }
      });

      setLastFetchedKey(() => snapshot.key);
    };
    useEffect(() => {
      const ref = database().ref(path).orderByKey().limitToFirst(limit);

      const onChildRemoved = snapshot => {
        const removedKey = snapshot.key;
        setData(prevData => prevData.filter(item => item.key !== removedKey));
      };

      //   ref.once('value').then(snapshot => {
      //     const initialData = snapshot.val();
      //     console.log('Initial data', initialData);
      //     const initialItems = Object.keys(initialData).map(key => ({
      //       key,
      //       ...initialData[key],
      //     }));
      //     setData(initialItems);
      //     setLastFetchedKey(initialItems[initialItems.length - 1].key);
      //   });

      ref.on('child_added', onChildAdded);
      //   ref.on('child_added', onChildAdded);
      //   ref.on('child_removed', onChildRemoved);
      return () => {
        database().ref(path).off('child_added', onChildAdded);
      };
    }, []);

    const fetchNextPage = () => {
      if (lastFetchedKey) {
        const nextPageRef = database()
          .ref(path)
          .orderByKey()
          .startAt(lastFetchedKey)
          .limitToFirst(limit);

        nextPageRef.once('value').then(snapshot => {
          setData(() => null);
          onChildAdded(snapshot);
        });
      }
    };

    return (
      <WrappedComponent {...props} data={data} fetchNextPage={fetchNextPage} />
    );
  };

  return PaginationComponent;
};
