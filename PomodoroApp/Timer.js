import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Timer = ({ route }) => {
  const { minutes, breakMinutes, navigation, name, numIteration } = route.params;
  const [seconds, setSeconds] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setSeconds(minutes * 60);
    setIsActive(true)
  },[numIteration]);

  useEffect(() => {
    let interval;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      alert('Timer is up!');
      navigation.navigate('Pause', {
        minutes: minutes,
        breakMinutes: breakMinutes,
        name: name,
        navigation: navigation,
        numIteration: numIteration+1
      });
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, navigation, minutes, breakMinutes, name]);

  const resetTimer = () => {
    setIsActive(false);
    navigation.navigate("SetupTimer");
  };

  const formatTime = () => {
    const displayMinutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(displayMinutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
    <Text style={styles.nameText}>{name}</Text>
      <View style={styles.box}>
        <Text style={styles.timer}>{formatTime()}</Text>
      </View>
      <Button onPress={resetTimer} title="Stop" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   nameText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  box: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 20,
    marginBottom: 32,
  },
  timer: {
    fontSize: 48,
  },
});

export default Timer;
