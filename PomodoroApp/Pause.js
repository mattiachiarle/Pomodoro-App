import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Pause = ({ route }) => {
console.log(route.params)
  const { minutes, breakMinutes, name, navigation, numIteration } = route.params;
  const [breakSeconds, setBreakSeconds] = useState(breakMinutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
      setBreakSeconds(minutes * 60);
      setIsActive(true)
    },[numIteration]);

  useEffect(() => {
      let interval;
      if (isActive && breakSeconds > 0) {
        interval = setInterval(() => {
          setBreakSeconds((prevBreakSeconds) => prevBreakSeconds - 1);
        }, 1000);
      } else if (breakSeconds === 0) {
        clearInterval(interval);
        setIsActive(false);
        alert('Pause is up!');
        navigation.navigate('Timer', {
          minutes: minutes,
          breakMinutes: breakMinutes,
          name: name,
          navigation: navigation,
          numIteration: numIteration+1
        });
      }
      return () => clearInterval(interval);
    }, [isActive, breakSeconds, minutes, breakMinutes, name, navigation]);


//  const resetTimer = () => {
//    setIsActive(false);
//    navigation.navigate('Timer', {
//      minutes: minutes,
//      breakMinutes: route.params.breakMinutes,
//      name: name,
//      navigation: navigation,
//      numIteration: numIteration+1
//    });
//
//  };

  const formatTime = () => {
    const breakMinutes = Math.floor(breakSeconds / 60);
    const secondsLeft = breakSeconds % 60;
    return `${String(breakMinutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.timer}>{formatTime()}</Text>
      </View>
//      <Button onPress={resetTimer} title="Skip Pause" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Pause;
