import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

function IconButton({text}) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'green',
        borderWidth: 1,
        margin: 5,
      }}>
      <Image
        style={{height: 40, width: 40}}
        source={require('./icons/timer_icon.png')}
      />
      <Text style={{fontSize: 20}}>{text}</Text>
    </TouchableOpacity>
  );
}

function CallsTimerControls() {
  return (
    <View style={styles.controls}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          maxHeight: '25%',
          backgroundColor: 'red',
        }}>
        <IconButton text={'For you'}></IconButton>
        <IconButton text={'For everyone'}></IconButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'row',
  },
  controls: {
    flex: 4,
    flexDirection: 'column',
    borderTopWidth: '80%',
    borderTopWidth: 2,
  },
});
export default CallsTimerControls;
