import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

function SetupTimer() {
  const [name, onChangeName] = React.useState('');
  const [work, onChangeWork] = React.useState('25');
  const [breakTime, onChangeBreakTime] = React.useState('5');

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
      <Button
        onPress={() => {
          //TBD
        }}>
        START
      </Button>
    </View>
  );
}

function SetupScreen() {
  return <SetupTimer />;
}

export default SetupScreen;
