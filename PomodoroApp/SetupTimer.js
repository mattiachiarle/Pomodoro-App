import React from 'react';
import {View, Image, TextInput, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  nameInput: {
    height: 35,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    textAlignVertical: 'auto',
  },
  timeInput: {
    height: 40,
    width: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  icon: {
    width: 120,
    height: 120,
    margin: 20,
  },
});

function SetupTimer({navigation}) {
  const [name, onChangeName] = React.useState('');
  const [work, onChangeWork] = React.useState('25');
  const [breakTime, onChangeBreakTime] = React.useState('5');


  const startTimer = () => {
    const workTime = parseInt(work);
    const breakTimeInt = parseInt(breakTime);
    if (
      !isNaN(workTime) &&
      workTime > 0 &&
      !isNaN(breakTimeInt) &&
      breakTimeInt > 0
    ) {


      navigation.navigate('Timer', {
        minutes: workTime,
        breakMinutes: breakTimeInt,
        name: name,
        navigation: navigation,
        numIteration: 1,

      });
    } else {
      alert('Please enter valid numbers for work and break time.');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text style={{margin: 15, fontSize: 15, color: 'black'}}>Name:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={onChangeName}
          value={name}
        />
      </View>
      <Image source={require('./icons/timer_icon.png')} style={styles.icon} />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text style={{margin: 12, fontSize: 25, color: 'black'}}>Modules:</Text>
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          onChangeText={onChangeWork}
          value={work}
        />
        <Text
          style={{
            margin: 10,
            fontSize: 20,
            color: 'black',
            textAlignVertical: 'bottom',
          }}>
          mins
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text style={{margin: 12, fontSize: 25, color: 'black'}}>Breaks:</Text>
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          onChangeText={onChangeBreakTime}
          value={breakTime}
        />
        <Text
          style={{
            margin: 10,
            fontSize: 20,
            color: 'black',
            textAlignVertical: 'bottom',
          }}>
          mins
        </Text>
      </View>
      <Button
        mode="outlined"
        style={{borderRadius: 0, margin: 20, width: 150}}
        // labelStyle={{fontSize: 160}}
        onPress={startTimer}>
        <Text style={{fontSize: 20}}>START</Text>
      </Button>
    </View>
  );
}

function SetupScreen({navigation}) {
  return <SetupTimer navigation={navigation} />;
}

export default SetupScreen;
/* Display the history of modules, excluding the current one */
