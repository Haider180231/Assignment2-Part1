import React, { useLayoutEffect } from 'react';
import { Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import AllActivitiesScreen from './screens/AllActivitiesScreen';
import SpecialActivitiesScreen from './screens/SpecialActivitiesScreen';
import { Entypo, AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function MainTabNavigator({ navigation, route }) {
  // useLayoutEffect to set navigation options dynamically based on navigation and route
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('AddActivity')} 
          title="Add"
          color="#007AFF" 
        />
      ),
    });
  }, [navigation]);
  // Another useLayoutEffect to dynamically set the header title based on the current route
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'AllActivities';

    navigation.setOptions({ headerTitle: routeName });
  }, [navigation, route]);

  return (
    // Tab.Navigator to define the structure of tab navigation
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          
          if (route.name === 'AllActivities') {
            return <Entypo name="credit" size={size} color={color} />;
          } else if (route.name === 'SpecialActivities') {
            return <AntDesign name="exclamation" size={size} color={color} />;
          }
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#363674', 
          
        }
      })}
    >
      <Tab.Screen name="AllActivities" component={AllActivitiesScreen} />
      <Tab.Screen name="SpecialActivities" component={SpecialActivitiesScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;

