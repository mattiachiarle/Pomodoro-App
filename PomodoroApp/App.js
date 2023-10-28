import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  <Text>Home</Text>;
};
const SettingsScreen = () => <Text>Settings</Text>;
const CallsScreen = () => <Text>Calls</Text>;
const FlashcardsScreen = () => <Text>Flashcards</Text>;
const ToDoScreen = () => <Text>ToDo</Text>;

function getTabBarIcon({name, focused, color, size}) {
  let iconName;
  switch (name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'ToDo':
      iconName = 'check';
      break;
  }
  focused ? name : name + '-outline';
  return <Icon name={iconName} color={color} size={size}></Icon>;
}

function getScreenOptions({route}) {
  return {
    tabBarIcon: getTabBarIcon(route.name, focused, color, size),
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  };
}

function MyTabs() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => {
            getScreenOptions(route);
          }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="ToDo" component={ToDoScreen} />
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
