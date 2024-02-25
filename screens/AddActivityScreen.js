import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; 
import ActivitiesContext from '../contexts/ActivitiesContext';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';


const AddActivityScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { addActivity } = useContext(ActivitiesContext);
  


  const handleSave = async () => {
    if (!activity || duration <= 0 || isNaN(duration)) {
      Alert.alert('Invalid Input', 'Please make sure all fields are valid.');
      return;
    }
    const newActivity = {
      type: activity,
      duration: parseInt(duration, 10), // Ensure duration is a number
      date: date.toISOString(), // Use ISO string or another appropriate date format
    };
    
    try {
      await addDoc(collection(db, 'activities'), newActivity);
      Alert.alert('Success', 'Activity added successfully');
      navigation.goBack(); // or navigation.navigate('SomeScreen');
    } catch (error) {
      console.error("Error adding activity: ", error);
      Alert.alert('Error', 'There was an error adding the activity');
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
        defaultValue={activity}
        containerStyle={{ height: 40, marginBottom: 20 }}
        style={ styles.dropdown }
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={styles.dropdown}
        onChangeItem={item => setActivity(item.value)}
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
});

export default AddActivityScreen;
