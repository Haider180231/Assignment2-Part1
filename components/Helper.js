import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EDE7F6',
    justifyContent: 'space-between',
  },
  input: {
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
    marginBottom: 20,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#B39DDB',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 8,
  },
  label: {
    fontSize: 16, 
    color: '#333', 
    textAlign: 'left', 
    marginRight: 10, 
    marginLeft: 10, 
    marginBottom: 10, 
  },
});

