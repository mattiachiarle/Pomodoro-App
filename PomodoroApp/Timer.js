import React from 'react';
import {Text, Button, ProgressBar} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {useTimer, useTime} from 'react-timer-hook';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function MyTimer({expiryTimestamp}) {
  const time = new Date();
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called'),
    autoStart: false,
  });

  return (
    <>
      <Text>{seconds}</Text>
      <Button onPress={resume}>Start</Button>
      <Button onPress={pause}>Stop</Button>
      <Button
        onPress={() => {
          const time = new Date();
          restart(time.setSeconds(time.getSeconds() + 100), false);
        }}>
        Restart
      </Button>
    </>
  );
}

function TimerScreen() {
  const time = new Date();
  return (
    <View>
      <MyTimer
        expiryTimestamp={time.setSeconds(time.getSeconds() + 100)}></MyTimer>
    </View>
  );
}

export default TimerScreen;
