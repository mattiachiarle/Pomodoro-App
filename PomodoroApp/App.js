import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider, Text, Button} from 'react-native-paper';
//import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsScreen from './Settings';
import FlashcardsScreen from './Flashcards';
import ToDoScreen from './ToDo';
import CallsScreen from './Calls';
import HomeScreen from './Home';
import TimerScreen from './Timer';
import SetupScreen from './SetupTimer.js';
import Pause from './Pause.js';
import FlashcardQuiz from './FlashcardQuiz.js';
import {MaterialHeaderButtons} from './Header';
import {HeaderButtonsProvider} from 'react-navigation-header-buttons';

const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Flashcards" component={FlashcardsScreen} />
          <Stack.Screen name="FlashcardQuiz" component={FlashcardQuiz} />
          <Stack.Screen name="ToDo" component={ToDoScreen} />
          <Stack.Screen name="Calls" component={CallsScreen} />
          <Stack.Screen name="SetupTimer" component={SetupScreen} />
          <Stack.Screen name="Timer" component={TimerScreen} />
          <Stack.Screen
            name="Pause"
            component={Pause}
            options={{title: 'Pause'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default MyTabs;
