import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

function SetupTimer({ navigation }) {

  const [name, onChangeName] = React.useState('');
  const [work, onChangeWork] = React.useState('25');
  const [breakTime, onChangeBreakTime] = React.useState('5');
  const startTimer = () => {
       const workTime = parseInt(work);
       const breakTimeInt = parseInt(breakTime);
       if (!isNaN(workTime) && workTime > 0 && !isNaN(breakTimeInt) && breakTimeInt > 0) {
         navigation.navigate('Timer', { minutes: workTime, breakMinutes: breakTimeInt, name: name, navigation: navigation, numIteration: 1 });
       } else {
         alert('Please enter valid numbers for work and break time.');
       }
 };
  return (
    <View>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
      />
      <Text>Work:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={onChangeWork}
        value={work}
      />
      <Text>Break:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={onChangeBreakTime}
        value={breakTime}
      />
       <Button onPress={startTimer}>
              START
            </Button>
    </View>
  );
}

function SetupScreen({navigation}) {
  return <SetupTimer navigation={navigation}/>;
}

export default SetupScreen;
