import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title, style, textStyle, disabled }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style, 
        disabled ? styles.disabled : {}, 
        { backgroundColor: pressed && !disabled ? '#6C63FF' : (disabled ? '#A9A9A9' : '#7D7B9B') }, 
      ]}
      onPress={disabled ? null : onPress} 
      disabled={disabled} 
    >
      <Text style={[styles.text, textStyle, disabled ? styles.textDisabled : {}]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#A9A9A9', 
    borderColor: '#787878', 
  },
  textDisabled: {
    color: '#787878', 
  },
});

export default CustomButton;
