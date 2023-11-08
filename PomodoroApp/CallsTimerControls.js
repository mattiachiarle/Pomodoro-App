import {useState, React} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  TextInput,
} from 'react-native';
import {useTimer} from 'react-timer-hook';

function TimerEntry() {
  return (
    <View style={styles.timerInputWindow}>
      <View style={styles.timerInputRow}>
        <Text style={{fontSize: 20, justifyContent: 'center'}}>Name: </Text>
        <TextInput style={{height: 30, width: 90, borderWidth: 1}}></TextInput>
      </View>
      <View style={styles.timerInputRow}>
        <Text style={styles.timerInputLabel}>Modules:</Text>
        <TextInput style={styles.timerInputTextbox}></TextInput>
        <Text style={styles.timerInputLabel}>mins</Text>
      </View>
      <View style={styles.timerInputRow}>
        <Text style={styles.timerInputLabel}>Breaks: </Text>
        <TextInput style={styles.timerInputTextbox}></TextInput>
        <Text style={styles.timerInputLabel}>mins</Text>
      </View>
      <Button title="Start"></Button>
    </View>
  );
}

function MiniTimer({expiryTimestamp}) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called'),
  });
}

function CallsTimerControls({timerState}) {
  const [showTimer, setShowTimer] = useState(true);
  const [moduleTime, setModuleTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);

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
        }}
        onPress={() => {
          setShowTimer(false);
        }}>
        <Image
          style={{height: 40, width: 40}}
          source={require('./icons/timer_icon.png')}
        />
        <Text style={{fontSize: 20}}>{text}</Text>
      </TouchableOpacity>
    );
  }
  return showTimer ? (
    <View style={styles.controlsWindow}>
      <IconButton text={'For you'}></IconButton>
      <IconButton text={'For everyone'}></IconButton>
    </View>
  ) : (
    <TimerEntry></TimerEntry>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'row',
  },
  controlsWindow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    maxHeight: '25%',
    backgroundColor: 'pink',
  },
  timerInputWindow: {
    flex: 1,
    flexDirection: 'column',
  },
  timerInputRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerInputLabel: {
    textAlignVertical: 'center',
    fontSize: 25,
    width: 110,
    backgroundColor: 'green',
  },
  timerInputTextbox: {
    width: 30,
    height: 30,
    borderWidth: 1,
  },
});
export default CallsTimerControls;
