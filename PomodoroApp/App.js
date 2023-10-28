import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  <Text>Home</Text>;
};
const SettingsScreen = () => <Text>Settings</Text>;
const CallsScreen = () => <Text>Calls</Text>;
const TimerScreen = () => <Text>Timer</Text>;
const FlashcardsScreen = () => <Text>Flashcards</Text>;
const ToDoScreen = () => <Text>ToDo</Text>;

function getIcon({focused, color, size}, name) {
  let iconName;
  iconName = focused ? name : name + '-outline';
  return (
    <MaterialCommunityIcons
      name={iconName}
      color={color}
      size={size}></MaterialCommunityIcons>
  );
}

function MyTabs() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Timer"
            component={TimerScreen}
            options={{
              tabBarLabel: 'Timer',
              tabBarIcon: ({focused, color, size}) =>
                getIcon({focused, color, size}, 'timer'),
            }}
          />
          <Tab.Screen
            name="Calls"
            component={CallsScreen}
            options={{
              tabBarLabel: 'Calls',
              tabBarIcon: ({focused, color, size}) =>
                getIcon({focused, color, size}, 'account-group'),
            }}
          />
          <Tab.Screen
            name="ToDo"
            component={ToDoScreen}
            options={{
              tabBarLabel: 'To Do',
              tabBarIcon: ({focused, color, size}) =>
                getIcon({focused, color, size}, 'check'),
            }}
          />
          <Tab.Screen
            name="Flashcards"
            component={FlashcardsScreen}
            options={{
              tabBarLabel: 'Flashcards',
              tabBarIcon: ({focused, color, size}) =>
                getIcon({focused, color, size}, 'card-text'),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({focused, color, size}) =>
                getIcon({focused, color, size}, 'cog'),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
/*
        <Tab.Screen name="Calls" component={CallsScreen} />
        <Tab.Screen name="Flashcards" component={FlashcardsScreen} />
        <Tab.Screen name="To Do" component={ToDoScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        */

export default MyTabs;
