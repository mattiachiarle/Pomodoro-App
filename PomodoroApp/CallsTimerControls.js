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

function CallsTimerControls({timerState}) {
  const [showTimerSelection, setShowTimerSelection] = useState(true);
  const [showTimerInput, setShowTimerInput] = useState(true);
  const [moduleTime, setModuleTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [onBreak, setOnBreak] = useState(false);
  const [moduleName, setModuleName] = useState('');

  function TimerEntry() {
    return (
      <View style={styles.timerInputWindow}>
        <View style={styles.timerInputRow}>
          <Text style={{fontSize: 20, justifyContent: 'center'}}>Name: </Text>
          <TextInput
            style={{height: 40, width: 90, borderWidth: 1}}
            onChangeText={newText =>
              setModuleName(parseInt(newText) * 60)
            }></TextInput>
        </View>
        <View style={styles.timerInputRow}>
          <Text style={styles.timerInputLabel}>Modules:</Text>
          <TextInput
            style={styles.timerInputTextbox}
            onChange={newText => setModuleTime(parseInt(newText) * 60)}
            keyboardType="numeric"></TextInput>
          <Text style={styles.timerInputLabel}>mins</Text>
        </View>
        <View style={styles.timerInputRow}>
          <Text style={styles.timerInputLabel}>Breaks: </Text>
          <TextInput
            style={styles.timerInputTextbox}
            keyboardType="numeric"
            onChangeText={newText =>
              setBreakTime(parseInt(newText) * 60)
            }></TextInput>
          <Text style={styles.timerInputLabel}>mins</Text>
        </View>
        <Button title="Start" onPress={() => setShowTimerInput(false)}></Button>
      </View>
    );
  }

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
          setShowTimerSelection(false);
        }}>
        <Image
          style={{height: 40, width: 40}}
          source={require('./icons/timer_icon.png')}
        />
        <Text style={{fontSize: 20}}>{text}</Text>
      </TouchableOpacity>
    );
  }
  let output = null;
  if (showTimerSelection) {
    output = (
      <View style={styles.controlsWindow}>
        <IconButton text={'For you'}></IconButton>
        <IconButton text={'For everyone'}></IconButton>
      </View>
    );
  } else if (!showTimerSelection && showTimerInput) {
    output = <TimerEntry></TimerEntry>;
  } else if (!showTimerSelection && !showTimerInput) {
    const time = new Date();
    const duration = onBreak ? breakTime : moduleTime;
    console.log(duration);
    time.setSeconds(time.getSeconds() + duration);
    output = <MiniTimer expiryTimestamp={time}></MiniTimer>;
  }
  return output;
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
    onExpire: () => {
      if (!showTimerInput && !onBreak) {
        setShowTimerInput(true);
      }
    },
  });
  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
      <View
        style={{
          width: 100,
          height: 40,
          textAlignVertical: 'center',
          borderWidth: 1,
        }}></View>
    </View>
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
    fontSize: 30,
    width: 130,
    backgroundColor: 'green',
  },
  timerInputTextbox: {
    width: 30,
    height: 40,
    borderWidth: 1,
  },
});
export default CallsTimerControls;
