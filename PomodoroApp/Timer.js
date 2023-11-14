import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const Timer = ({ route }) => {
  const { minutes, breakMinutes, navigation, name, numIteration, modulesHistory } = route.params;
  const [seconds, setSeconds] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setSeconds(minutes * 60);
    setIsActive(true);
  }, [numIteration]);

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
        numIteration: numIteration + 1,
        modulesHistory: [...(modulesHistory || []), name]
      });
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, navigation, minutes, breakMinutes, name, numIteration, modulesHistory]);

  const resetTimer = () => {
    setIsActive(false);
    navigation.navigate("SetupTimer", {
      modulesHistory: [...(modulesHistory || []), name]
    });
  };
  const extendTimer = () => {
      setSeconds((prevSeconds) => prevSeconds + 600); // Adds 10 minutes
    };


  const formatTime = () => {
    const displayMinutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(displayMinutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
  };


  const previousModules = modulesHistory && modulesHistory.slice(0, -1);

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{name}</Text>
      <Image source={require('./icons/timer_icon.png')} style={styles.icon} />
      <View style={styles.box}>
        <Text style={styles.timer}>{formatTime()}</Text>
      </View>
      <Button onPress={resetTimer} title="Stop" />
      <Button onPress={extendTimer} title="Extend 10 Minutes" />
      {/* Display the history of modules, excluding the current one */}
      {previousModules && previousModules.length > 0 && (
        <View>
          <Text style={styles.moduleHistoryLabel}>Previous Modules:</Text>
          {previousModules.map((moduleName, index) => (
            <Text key={index} style={styles.moduleHistoryText}>{moduleName}</Text>
          ))}
        </View>
      )}
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
  moduleHistoryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 32,
  },
  moduleHistoryText: {
    fontSize: 18,
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
  icon: {
    width: 120,
    height: 120,
    margin: 20,
  },
});

export default Timer;

/* Display the history of modules, excluding the current one */