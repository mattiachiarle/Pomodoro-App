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

function CallsTimerControls() {
  const [showTimerSelection, setShowTimerSelection] = useState(true);
  const [showTimerInput, setShowTimerInput] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [moduleTime, setModuleTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [moduleName, setModuleName] = useState('');
  let output = null;

  if (showTimerSelection) {
    output = (
      <View style={styles.controlsWindow}>
        <IconButton text={'For you'}></IconButton>
        <IconButton text={'For everyone'}></IconButton>
      </View>
    );
  } else if (!showTimerSelection && showTimerInput) {
    output = (
      <View style={styles.timerInputWindow}>
        <View style={styles.timerInputRow}>
          <Text style={{fontSize: 20, justifyContent: 'center'}}>Name: </Text>
          <TextInput
            style={{height: 40, width: 90, borderWidth: 1}}
            onChangeText={newText => {
              setModuleName(newText);
            }}></TextInput>
        </View>
        <View style={styles.timerInputRow}>
          <Text style={styles.timerInputLabel}>Modules:</Text>
          <TextInput
            style={styles.timerInputTextbox}
            onChangeText={newText => {
              setModuleTime(parseInt(newText) * 60);
            }}
            defaultValue="25"
            keyboardType="numeric"></TextInput>
          <Text style={styles.timerInputLabel}>mins</Text>
        </View>
        <View style={styles.timerInputRow}>
          <Text style={styles.timerInputLabel}>Breaks: </Text>
          <TextInput
            style={styles.timerInputTextbox}
            keyboardType="numeric"
            defaultValue="5"
            onChangeText={newText => {
              setBreakTime(parseInt(newText) * 60);
            }}></TextInput>
          <Text style={styles.timerInputLabel}>mins</Text>
        </View>
        <Button
          title="Start"
          onPress={() => {
            setShowTimerInput(false);
          }}></Button>
      </View>
    );
  } else if (!showTimerSelection && !showTimerInput) {
    const time = new Date();
    const duration = onBreak ? breakTime * 60 : moduleTime * 60;
    time.setSeconds(time.getSeconds() + duration);
    output = <MiniTimer expiryTimestamp={time}></MiniTimer>;
  }
  return output;

  function IconButton({text}) {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
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
  } = useTimer({expiryTimestamp});
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 100,
          height: 40,
          textAlignVertical: 'center',
          borderWidth: 1,
        }}>
        <Text>{`${minutes}:${seconds}`}</Text>
      </View>
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
  },
  timerInputTextbox: {
    width: 30,
    height: 40,
    borderWidth: 1,
  },
});
export default CallsTimerControls;
