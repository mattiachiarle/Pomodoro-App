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

function CallsScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.callPlaceholder}>
        <View style={styles.bookRow}>
          <Text style={styles.bookRowName}> Fran</Text>
          <Image
            style={styles.bookImage}
            source={require('./icons/book_icon.png')}></Image>
        </View>
        <View style={styles.avatarRow}>
          <Image
            style={styles.avatarImage}
            source={require('./icons/square_avatar.png')}></Image>
        </View>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, justifyContent: 'center', flexDirection: 'column'},
  callPlaceholder: {
    flex: 6,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'row',
  },
  avatarRow: {
    flex: 9,
    flexBasis: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bookRow: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bookImage: {
    flex: 1,
    maxWidth: 30,
    maxHeight: 30,
  },
  bookRowName: {
    flex: 9,
    fontSize: 20,
    start: 170,
  },
  avatarImage: {
    maxWidth: 100,
    maxHeight: 100,
    alignSelf: 'center',
  },
  controls: {
    flex: 4,
    flexDirection: 'column',
    borderTopWidth: '80%',
    borderTopWidth: 2,
  },
});
export default CallsScreen;
