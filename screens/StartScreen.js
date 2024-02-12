import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';


const StartScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
  
    useEffect(() => {
      setIsEmailValid(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
      setIsPhoneValid(/^\d{10}$/.test(phoneNumber));
    }, [email, phoneNumber]);
  
    const handleStartPress = () => {
      if (isEmailValid && isPhoneValid) {
        navigation.navigate('Main');
      } else {
        Alert.alert('Invalid Input', 'Please enter a valid email and phone number.');
      }
    };
  
    const handleResetPress = () => {
      setEmail('');
      setPhoneNumber('');
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={[styles.input, !isEmailValid && email.length > 0 ? styles.errorInput : null]}
        />
        {isEmailValid || email.length === 0 ? null : <Text style={styles.errorText}>Please enter a valid email address.</Text>}
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={[styles.input, !isPhoneValid && phoneNumber.length > 0 ? styles.errorInput : null]}
        />
        {isPhoneValid || phoneNumber.length === 0 ? null : <Text style={styles.errorText}>Please enter a valid phone number.</Text>}
        <Button title="Start" onPress={handleStartPress} disabled={!(isEmailValid && isPhoneValid)} />
        <Button title="Reset" onPress={handleResetPress} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#EDE7F6'
    },
    input: {
      marginVertical: 10,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      borderColor: 'grey',
    },
    errorInput: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      alignSelf: 'flex-start',
    },
  });
  
  export default StartScreen;
  