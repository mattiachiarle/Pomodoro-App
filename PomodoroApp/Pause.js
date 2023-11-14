import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet,  TouchableOpacity } from 'react-native';

const Pause = ({ route }) => {
  const { minutes, breakMinutes, name, navigation, numIteration, modulesHistory } = route.params;
  const [breakSeconds, setBreakSeconds] = useState(breakMinutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setBreakSeconds(breakMinutes * 60); // Corrected from minutes to breakMinutes
    setIsActive(true)
  }, [numIteration, breakMinutes]);

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
         numIteration: numIteration + 1,
         modulesHistory: modulesHistory
       });
      }
      return () => clearInterval(interval);
    }, [isActive, breakSeconds, minutes, breakMinutes, name, navigation]);

  const formatTime = () => {
    const breakMinutes = Math.floor(breakSeconds / 60);
    const secondsLeft = breakSeconds % 60;
    return `${String(breakMinutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
  };

 return (
   <View style={styles.container}>
     <Text style={styles.titleText}>Break!</Text>
     <Image source={require('./icons/timer_icon.png')} style={styles.largeIcon} />

     <View style={styles.timerContainer}>
       <Image source={require('./icons/bed.png')} style={styles.smallIcon} />
       <View style={styles.box}>
         <Text style={styles.timer}>{formatTime()}</Text>
       </View>
     </View>

     <TouchableOpacity
       style={styles.todoButton}
       onPress={() => navigation.navigate('ToDo', {
         fromScreen: 'Pause',
         breakSeconds: breakSeconds,
         minutes: minutes,
         breakMinutes: breakMinutes,
         name: name,
         numIteration: numIteration,
         navigation: navigation,
       })}
     >
       <Text style={styles.buttonText}>Track your ToDos</Text>
     </TouchableOpacity>
   </View>
 );
  };

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      marginBottom: 20,
      color: 'black',
    },
    largeIcon: {
      width: 120,
      height: 120,
      margin: 20,
    },
    timerContainer: {
        flexDirection: 'row', // Align items in a row
        alignItems: 'center', // Center items vertically in the row
        marginBottom: 32, // Space below the entire timer section
      },
      smallIcon: {
        width: 45, // Adjust size as needed
        height: 45, // Adjust size as needed
        marginRight: 10, // Space between the icon and the box
      },
      box: {
        borderWidth: 2,
        borderColor: 'black',
        padding: 20,
        justifyContent: 'center', // Center the timer text vertically
        alignItems: 'center', // Center the timer text horizontally
      },
    timer: {
      fontSize: 48,
    },
    todoButton: {
      borderWidth: 1,
      borderColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 20,
    },
    buttonText: {
      color: 'black',
      textAlign: 'center',
      fontSize: 16,
    },
});

export default Pause;
