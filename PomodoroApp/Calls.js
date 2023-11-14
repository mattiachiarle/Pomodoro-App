import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Video} from '@signalwire-community/react-native';
import CallTimerControls from './CallsTimerControls.js';

const TOKEN =
  'eyJ0eXAiOiJWUlQiLCJjaCI6InJlbGF5LnNpZ25hbHdpcmUuY29tIiwiYWxnIjoiSFM1MTIifQ.eyJpYXQiOjE2NjAyODA0ODUsImp0aSI6ImE4NTc5MzU2LTc0NGItNGM5OS05NWQ2LTZhMTY4YmEyNTFhZCIsInN1YiI6IjUwNmNlYTMzLWViNDctNGI1Ni04MmIwLWQzYzVhZmFmMzlkNCIsInUiOiJxdWlja3Rva2VudXNlciIsImphIjoibWVtYmVyIiwiciI6InJvb20iLCJzIjpbInJvb20ubGlzdF9hdmFpbGFibGVfbGF5b3V0cyIsInJvb20uc2VsZi5hdWRpb19tdXRlIiwicm9vbS5zZWxmLmF1ZGlvX3VubXV0ZSIsInJvb20uc2VsZi52aWRlb19tdXRlIiwicm9vbS5zZWxmLnZpZGVvX3VubXV0ZSIsInJvb20uc2VsZi5kZWFmIiwicm9vbS5zZWxmLnVuZGVhZiIsInJvb20uc2VsZi5zZXRfaW5wdXRfdm9sdW1lIiwicm9vbS5zZWxmLnNldF9vdXRwdXRfdm9sdW1lIiwicm9vbS5zZWxmLnNldF9pbnB1dF9zZW5zaXRpdml0eSIsInJvb20uaGlkZV92aWRlb19tdXRlZCIsInJvb20uc2hvd192aWRlb19tdXRlZCJdLCJhY3IiOnRydWUsIm1hIjoiYWxsIiwiZXJwIjp0cnVlLCJtdGEiOnt9LCJybXRhIjp7fX0.ke-qPuTmp6tUOgdHMHv_i82PjuWQgr8lsX_VRS_Krq4nwYt3REGhSn1p68N3gXTXxp7DGd6dIJIzJwjVZvdDmA';

function CallsScreen({navigation}) {
  const [callReady, setCallReady] = useState(false);
  const [room, setRoom] = useState('');

  const joinCall = () => {
    setCallReady(true);
  };

  return (
    <View style={styles.page}>
      <View style={styles.callVideoPortion}>
        <View style={styles.bookRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Flashcards', {navigation: navigation, id: 0})
            }>
            <Image
              style={styles.bookImage}
              source={require('./icons/book_icon.png')}></Image>
          </TouchableOpacity>
        </View>
        {!callReady ? (
          <View style={''}>
            <TextInput
              onChangeText={setRoom}
              placeholder="Enter room name here"
              style={styles.input}
              value={room}
            />
            <Button
              color="blue"
              disabled={!room}
              onPress={joinCall}
              style={{height: 32, width: 32}}
              title="Join"
            />
          </View>
        ) : (
          <SafeAreaView>
            <Video token={TOKEN} />
          </SafeAreaView>
          //</>
        )}
      </View>
      <View style={styles.controls}>
        <CallTimerControls />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, justifyContent: 'center', flexDirection: 'column'},
  callVideoPortion: {
    flex: 6,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  bookRow: {
    flexGrow: 30,
    maxHeight: 30,
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },
  bookImage: {
    maxWidth: 30,
    maxHeight: 30,
    alignSelf: 'flex-end',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: 'center',
    color: 'black',
  },
  controls: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default CallsScreen;
