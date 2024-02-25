import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import ActivitiesList from '../components/ActivitiesList';
import useFirestoreActivities from '../hooks/useFirestoreActivities';

const AllActivitiesScreen = () => {
  const activities = useFirestoreActivities();

  return (
    <View style={styles.container}>
      <ActivitiesList activities={activities} importantOnly={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE7F6'
  },
});

export default AllActivitiesScreen;
