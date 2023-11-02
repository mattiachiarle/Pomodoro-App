import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import SetupScreen from './SetupTimer.js';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('SetupTimer')}>
          <Image
            source={require('./icons/timer_icon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* The timer icon and button are interactive; we just need to attach timer here. */}
        <Image source={require('./icons/video_icon.png')} style={styles.icon} />
      </View>
      <View style={styles.row}>
        <Image source={require('./icons/book_icon.png')} style={styles.icon} />
        <Image
          source={require('./icons/checklist_icon.png')}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    width: 120, // Increased the width
    height: 120, // Increased the height
    margin: 20,
  },
});

export default HomeScreen;
