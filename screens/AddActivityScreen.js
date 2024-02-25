import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; 
import CustomButton from '../components/CustomButton';
import { globalStyles } from '../components/Helper';

import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';


const AddActivityScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  


  const handleSave = async () => {
    if (!activity || duration <= 0 || isNaN(duration)) {
      Alert.alert('Invalid Input', 'Please make sure all fields are valid.');
      return;
    }
  
    // Check if the activity is 'running' or 'weight training' and duration is more than 60
    const isImportant = (activity === 'Running' || activity === 'Weight Training') && duration > 60;
  
    // Format the date to include only year-month-day
    const formattedDate = date.toISOString().split('T')[0];
  
    const newActivity = {
      type: activity,
      duration: parseInt(duration, 10), // Ensure duration is a number
      date: formattedDate, // Save only the year-month-day part
      important: isImportant, // Set important flag based on conditions
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
    <View style={globalStyles.container}>
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
        defaultValue={activity}
        containerStyle={{ height: 40, marginBottom: 20 }}
        style={ globalStyles.dropdown }
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={globalStyles.dropdown}
        onChangeItem={item => setActivity(item.value)}
      />
      <TextInput
        placeholder="Duration (min)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={globalStyles.input}
      />
      <TextInput
        style={globalStyles.dateInput}
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
      <View style={globalStyles.buttonContainer}>
      <CustomButton 
        title="Save"
        onPress={handleSave}
        />
      </View>
    </View>
  );
};

export default AddActivityScreen;
