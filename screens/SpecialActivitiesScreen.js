import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import ActivitiesList from '../components/ActivitiesList';
import ActivitiesContext from '../contexts/ActivitiesContext';
import useFirestoreActivities from '../hooks/useFirestoreActivities';

const SpecialActivitiesScreen = () => {
  // const { activities } = useContext(ActivitiesContext);
  const activities = useFirestoreActivities();


  return (
    <View style={styles.container}>
      <ActivitiesList activities={activities} specialOnly={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE7F6'
  },
});

export default SpecialActivitiesScreen;
