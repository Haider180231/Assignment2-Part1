import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { db } from "../firebaseConfig";
import { doc, deleteDoc } from 'firebase/firestore';

const ActivitiesList = ({ activities, importantOnly }) => {
  const navigation = useNavigation();

  const filteredActivities = importantOnly ? activities.filter(activity => activity.important) : activities;

  const handlePressActivity = (id) => {
    navigation.navigate('EditActivityScreen', { activityId: id });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'activities', id));
      Alert.alert('Success', 'Activity deleted successfully');
    } catch (error) {
      console.error("Error removing activity: ", error);
      Alert.alert('Error', 'There was an error deleting the activity');
    }
  };

  // Render each activity item
  const renderActivityItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressActivity(item.id)}>
      <View style={styles.item}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>
            {item.type} {item.important && <Text style={styles.important}>🌟</Text>}
          </Text>
          <Text style={styles.duration}>{item.duration} min</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-bin" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
  important: {
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
