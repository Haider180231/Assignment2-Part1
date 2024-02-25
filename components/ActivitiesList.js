import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import ActivitiesContext from '../contexts/ActivitiesContext';
import { Ionicons } from '@expo/vector-icons';

const ActivitiesList = ({ activities, specialOnly }) => {
  // Access the removeActivity function from ActivitiesContext
  const { removeActivity } = useContext(ActivitiesContext);

  const isSpecial = (activity) => {
    return (activity.type === 'Running' || activity.type === 'Weight Training') && activity.duration > 60;
  };

  // Filter activities based on the specialOnly flag
  const filteredActivities = specialOnly ? activities.filter(isSpecial) : activities;

  

  // Render each activity item
  const renderActivityItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>
          {item.type} {isSpecial(item) && <Text style={styles.special}>🌟</Text>}
        </Text>
        <Text style={styles.duration}>{item.duration} min</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => removeActivity(item.id)}>
        <Ionicons name="trash-bin" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
  

  return (
    <FlatList
      data={filteredActivities}
      renderItem={renderActivityItem}
      keyExtractor={(item, index) => 'activity-' + index}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#6e3b6e', 
    padding: 20,
    borderRadius: 10, 
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  rowContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'white', 
    marginBottom: 4, 
    flex: 2,
  },
  duration: {
    fontSize: 18, 
    color: 'white', 
    marginBottom: 4, 
    flex: 1,
  },
  date: {
    fontSize: 16, 
    color: 'white', 
    flex: 2,
  },
  special: {
    fontSize: 24, 
    color: 'yellow', 
  },
  deleteIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  }
});


export default ActivitiesList;
