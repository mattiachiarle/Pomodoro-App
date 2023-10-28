import 'react-native-gesture-handler';
import React from 'react';
import {useState} from 'react';
import {Text, Button, ProgressBar} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {useTimer} from 'react-timer-hook';
import CircularProgress from 'react-native-circular-progress-indicator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function MyTimer({expiryTimestamp}) {
  const startAmt = 100; // hardcoded for testing
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
    expiryTimestamp: time.setSeconds(time.getSeconds() + startAmt),
    onExpire: () => {
      console.warn('onExpire called');
    },
    autoStart: false,
  });

  return (
    <View style={styles.container}>
      <CircularProgress value={totalSeconds} />
      <Button
        onPress={() => {
          resume();
        }}>
        Start
      </Button>
      <Button
        onPress={() => {
          pause();
        }}>
        Stop
      </Button>
      <Button
        onPress={() => {
          const time = new Date();
          restart(time.setSeconds(time.getSeconds() + startAmt), false);
        }}>
        Restart
      </Button>
    </View>
  );
}

function TimerScreen() {
  const time = new Date();
  return <MyTimer />;
}

export default TimerScreen;
