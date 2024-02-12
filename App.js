import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivitiesProvider } from './contexts/ActivitiesContext';
import AppNavigator from './AppNavigator';

export default function App() {
  return (
    <ActivitiesProvider>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </ActivitiesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
