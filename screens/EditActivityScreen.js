import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import CustomButton from '../components/CustomButton';

const EditActivityScreen = ({ route, navigation }) => {
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [important, setImportant] = useState(false);
  
  const activityId = route.params.activityId; 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={confirmDeletion}>
          <Ionicons name="trash-bin" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const confirmDeletion = () => {
    Alert.alert(
      "Delete Activity",
      "Are you sure you want to delete this activity?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: deleteActivity, style: 'destructive' }
      ]
    );
  };

  const deleteActivity = async () => {
    try {
      await deleteDoc(doc(db, 'activities', activityId));
      Alert.alert('Success', 'Activity deleted successfully');
      navigation.goBack();
    } catch (error) {
        console.error("Error deleting document: ", error);
      Alert.alert('Error', 'There was an error deleting the activity');
    }
  };

  useEffect(() => {
    const fetchActivity = async () => {
      const docRef = doc(db, 'activities', activityId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setActivity(data.type);
        setDuration(data.duration.toString());
        setDate(new Date(data.date));
        setImportant(data.important);
      } else {
        Alert.alert('Error', 'No such activity found!');
      }
    };

    fetchActivity();
  }, [activityId]);


  const handleSave = async () => {
    if (!activity || duration <= 0 || isNaN(duration)) {
      Alert.alert('Invalid Input', 'Please make sure all fields are valid.');
      return;
    }
  
    Alert.alert(
      "Confirm Save",
      "Are you sure you want to save these changes?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Save", onPress: () => saveActivity() }
      ]
    );
  };

  const saveActivity = async () => {
    // Validation logic here
    if (!activity || duration <= 0 || isNaN(duration)) {
      Alert.alert('Invalid Input', 'Please make sure all fields are valid.');
      return;
    }

    const formattedDate = date.toISOString().split('T')[0];
    const isActivityImportant = !important && ((activity === 'Running' || activity === 'Weight Training') && duration > 60);


    const updatedActivity = {
      type: activity,
      duration: parseInt(duration, 10),
      date: formattedDate,
      important: isActivityImportant,
    };

    try {
      const docRef = doc(db, 'activities', activityId);
      await updateDoc(docRef, updatedActivity);
      Alert.alert('Success', 'Activity updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error("Error updating activity: ", error);
      Alert.alert('Error', 'There was an error updating the activity');
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    setDate(selectedDate || date);
  };

  return (
    <View style={styles.container}>
    <View style={{flex: 1}}>
      <DropDownPicker
        open={open}
        value={activity}
        items={[
          { label: 'Walking', value: 'Walking' },
          { label: 'Running', value: 'Running' },
          { label: 'Swimming', value: 'Swimming' },
          { label: 'Weight Training', value: 'Weight Training' },
          { label: 'Yoga', value: 'Yoga' },
          { label: 'Cycling', value: 'Cycling' },
          { label: 'Hiking', value: 'Hiking' },
        ]}
        setOpen={setOpen}
        setValue={setActivity}
        setItems={() => {}}
        defaultValue={activity}
        containerStyle={{ height: 40, marginBottom: 20 }}
        style={styles.dropdown}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => setActivity(item.value)}
      />
      <TextInput
        placeholder="Duration (min)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        style={styles.dateInput}
        value={date.toLocaleDateString()}
        placeholder="Choose Date"
        onTouchStart={showDatePicker}
        editable={false}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={date}
      />
      </View>
      <View>
      <View style={styles.checkboxContainer}>
        {(activity === 'Running' || activity === 'Weight Training') && parseInt(duration) > 60 && (
            <Checkbox
            value={important}
            onValueChange={setImportant}
            style={styles.checkbox}
            />
        )}
        {(activity === 'Running' || activity === 'Weight Training') && parseInt(duration) > 60 && (
            <Text style={styles.label}>This item is marked as special. Select the checkbox if you would like to approve it.</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton 
        title="Save"
        onPress={handleSave}
        />
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#EDE7F6', 
      justifyContent: 'space-between'
    },
    dropdown: {
      backgroundColor: '#fafafa',
      borderRadius: 10, 
    },
    input: {
      borderWidth: 1,
      borderColor: '#B39DDB', 
      padding: 10,
      marginBottom: 20,
      borderRadius: 10,
      color: '#000', 
    },
    dateInput: {
      borderWidth: 1,
      borderColor: '#B39DDB',
      padding: 10,
      marginBottom: 20,
      borderRadius: 10,
      color: '#000',
    },
    buttonContainer: {
      borderRadius: 10, 
      overflow: 'hidden', 
      marginBottom: '25%',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      checkbox: {
        marginRight: 8, 
      },
  });

export default EditActivityScreen;
