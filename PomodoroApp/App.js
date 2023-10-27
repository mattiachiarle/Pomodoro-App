import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const TimerRoute = () => <Text>Timer</Text>;

const CallRoute = () => <Text>Call</Text>;

const FlashcardsRoute = () => <Text>Flashcards</Text>;

const ToDoRoute = () => <Text>To Do</Text>;

const SettingsRoute = () => <Text>Settings</Text>;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'timer',
      title: 'Timer',
      focusedIcon: 'timer',
      unfocusedIcon: 'timer-outline',
    },
    {
      key: 'call',
      title: 'Call',
      focusedIcon: 'account-group',
      unfocusedIcon: 'account-group-outline',
    },
    {
      key: 'flashcards',
      title: 'Flashcards',
      focusedIcon: 'card-text',
      unfocusedIcon: 'card-text-outline',
    },
    {
      key: 'todo',
      title: 'To-Do',
      focusedIcon: 'check-bold',
      unfocusedIcon: 'check-outline',
    },
    {
      key: 'settings',
      title: 'Settings',
      focusedIcon: 'cog',
      unfocusedIcon: 'cog-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    timer: TimerRoute,
    call: CallRoute,
    flashcards: FlashcardsRoute,
    todo: ToDoRoute,
    settings: SettingsRoute,
  });

  return (
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </SafeAreaProvider>
  );
};

export default MyComponent;
