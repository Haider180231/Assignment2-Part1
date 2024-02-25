import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AppNavigator from './AppNavigator';

export default function App() {
  return (

      <View style={styles.container}>
        <AppNavigator />
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
