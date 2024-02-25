import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Checkbox from 'expo-checkbox';
import { db } from '../firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const EditActivityScreen = ({ route, navigation }) => {
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);

  const activityId = route.params.activityId; // 假设 activityId 是通过路由参数传递的

  useEffect(() => {
    const fetchActivity = async () => {
      const docRef = doc(db, 'activities', activityId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setActivity(data.type);
        setDuration(data.duration.toString());
        setDate(new Date(data.date));
        setIsSpecial(data.special); 
      } else {
        Alert.alert('Error', 'No such activity found!');
      }
    };

    fetchActivity();
  }, [activityId]);

  const handleSave = async () => {
    // Validation logic here
    if (!activity || duration <= 0 || isNaN(duration)) {
      Alert.alert('Invalid Input', 'Please make sure all fields are valid.');
      return;
    }

    const formattedDate = date.toISOString().split('T')[0];

    const isImportant = (activity === 'Running' || activity === 'Weight Training') && duration > 60;

    const updatedActivity = {
      type: activity,
      duration: parseInt(duration, 10),
      date: formattedDate,
      important: isImportant,
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
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isSpecial}
          onValueChange={setIsSpecial}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Special Activity</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} color="#7D7B9B" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#EDE7F6', 
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
      marginTop: 10,
      borderRadius: 10, 
      overflow: 'hidden', 
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // ... 其他样式
    },
  });

export default EditActivityScreen;
