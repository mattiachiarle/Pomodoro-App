import React, {useState} from 'react';
import {Text, Avatar} from 'react-native-paper';
import {StyleSheet, View, Image} from 'react-native';

function CallsScreen() {
  const [callReady, setCallReady] = useState(false);
  const [room, setRoom] = useState('');

  const joinCall = () => {
    setCallReady(true);
  };

  return (
    <View style={styles.page}>
      <View style={styles.callPlaceholder}>
        <View style={styles.bookRow}>
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
    </View>
    // <>
    //   {callReady ? (
    //     <>
    //       <TextInput
    //         onChangeText={setRoom}
    //         placeholder="Enter room name here"
    //         style={{color: 'black', padding: 32}}
    //         value={room}
    //       />
    //       <Button
    //         color="blue"
    //         disabled={!room}
    //         onPress={joinCall}
    //         style={{height: 32, width: 32}}
    //         title="Join"
    //       />
    //     </>
    //   ) : (
    //     <Jitsi />
    //   )}
    // </>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, justifyContent: 'center', flexDirection: 'row'},
  callPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'red',
    height: '60%',
  },
  avatarRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'green',
    maxHeight: 'min',
  },
  bookRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  avatarImage: {
    maxWidth: 100,
    maxHeight: 100,
    alignSelf: 'center',
  },
  bookImage: {
    maxWidth: 30,
    maxHeight: 30,
    alignSelf: 'flex-end',
  },
});
export default CallsScreen;
