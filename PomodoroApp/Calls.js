import React, {useState} from 'react';
import {Text} from 'react-native-paper';

function CallsScreen() {
  const [callReady, setCallReady] = useState(false);
  const [room, setRoom] = useState('');

  const joinCall = () => {
    setCallReady(true);
  };

  return (
    <>
      {callReady ? (
        <>
          <TextInput
            onChangeText={setRoom}
            placeholder="Enter room name here"
            style={{color: 'black', padding: 32}}
            value={room}
          />
          <Button
            color="blue"
            disabled={!room}
            onPress={joinCall}
            style={{height: 32, width: 32}}
            title="Join"
          />
        </>
      ) : (
        <Jitsi />
      )}
    </>
  );
}

export default CallsScreen;
