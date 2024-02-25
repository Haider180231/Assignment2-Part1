import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from './screens/StartScreen';
import MainTabNavigator from './MainTabNavigator';
import AddActivityScreen from './screens/AddActivityScreen';
import EditActivityScreen from './screens/EditActivityScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    // NavigationContainer wraps the whole navigation structure and provides necessary context
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#363674',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="AddActivity" component={AddActivityScreen} />
        <Stack.Screen name="EditActivityScreen" component={EditActivityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

