import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet , TouchableOpacity } from 'react-native';

const Timer = ({ route }) => {
  const { minutes, breakMinutes, navigation, name, numIteration, modulesHistory } = route.params;
  const [seconds, setSeconds] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setSeconds(minutes * 60);
    setIsActive(true);
  }, [numIteration, minutes]);

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
  }, [isActive, seconds, navigation, minutes, breakMinutes, name, numIteration]);

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
         <Image source={require('./icons/timer_icon.png')} style={styles.largeIcon} />

         <View style={styles.timerContainer}>
           <Image source={require('./icons/stopwatch_icon.png')} style={styles.smallIcon} />
           <View style={styles.box}>
             <Text style={styles.timer}>{formatTime()}</Text>
           </View>
         </View>

         <TouchableOpacity style={styles.stopButton} onPress={resetTimer}>
           <Text style={styles.buttonText}>Stop</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.extendButton} onPress={extendTimer}>
           <Text style={styles.buttonText}>Extend</Text>
         </TouchableOpacity>
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
    stopButton: {
      borderWidth: 2,
      borderColor: 'red',
      paddingVertical: 20,
      paddingHorizontal: 55,
      borderRadius: 8,
      marginVertical: 12,
      marginHorizontal: 20,
    },
    extendButton: {
      borderWidth: 2,
      borderColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginHorizontal: 20,
    },
    buttonText: {
      color: 'black',
      textAlign: 'center',
      fontSize: 25,
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
});

export default Timer;

/* Display the history of modules, excluding the current one */