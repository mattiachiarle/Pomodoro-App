import {useState, useEffect, React} from 'react';
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

function CallsTimerControls() {
  const [showTimerSelection, setShowTimerSelection] = useState(true);
  const [showTimerInput, setShowTimerInput] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [moduleTime, setModuleTime] = useState(0);
  const [moduleSeconds, setModuleSeconds] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [moduleName, setModuleName] = useState('');
  const [timeInterval, setTimeInterval] = useState(null);

  const formatTime = () => {
    const seconds = onBreak ? breakSeconds : moduleSeconds;
    const displayMinutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(displayMinutes).padStart(2, '0')}:${String(
      secondsLeft,
    ).padStart(2, '0')}`;
  };

  useEffect(() => {
    let seconds = onBreak ? breakSeconds : moduleSeconds;
    if (isActive && seconds <= 0) {
      // if work time ended
      setTimeInterval(clearInterval(timeInterval));
      if (!onBreak) {
        //if not on break, start break
        Alert.alert('Good work! Take a break.');
        setOnBreak(true);
        setTimeInterval(
          setInterval(() => {
            setBreakSeconds(seconds => seconds - 1);
          }, 1000),
        );
      } else if (isActive) {
        //if on break and breaktime ended
        setIsActive(false);
        setTimeInterval(clearInterval(timeInterval));
        setShowTimerInput(true);
        setOnBreak(false);
        Alert.alert(`Module ${moduleName} complete!`);
      }
    }
  }, [moduleSeconds, breakSeconds]);

  let output = null;

  if (showTimerSelection) {
    // if selecting between for you & for everyone (this is a dummy, does nothing)
    output = (
      <View style={styles.controlsWindow}>
        <IconButton text={'For you'}></IconButton>
        <IconButton text={'For everyone'}></IconButton>
      </View>
    );
  } else if (!showTimerSelection && showTimerInput) {
    // if timer type selected and we havent started timer yet, show timer input
    output = (
      <View style={styles.timerInputWindow}>
        <View style={styles.timerInputRow}>
          <Text style={{fontSize: 20, justifyContent: 'center'}}>Name: </Text>
          <TextInput //Module name input
            style={{height: 40, width: 90, borderWidth: 1}}
            onChangeText={newText => {
              setModuleName(newText);
            }}></TextInput>
        </View>
        <View style={styles.timerInputRow}>
          <Text style={styles.timerInputLabel}>Modules:</Text>
          <TextInput // Module time input
            style={styles.timerInputTextbox}
            onChangeText={newText => {
              setModuleTime(newText);
            }}
            keyboardType="numeric"></TextInput>
          <Text style={styles.timerInputLabel}>mins</Text>
        </View>
        <View style={styles.timerInputRow}>
          <Text style={styles.timerInputLabel}>Breaks: </Text>
          <TextInput // Break time input
            style={styles.timerInputTextbox}
            keyboardType="numeric"
            onChangeText={newText => {
              setBreakTime(newText);
            }}></TextInput>
          <Text style={styles.timerInputLabel}>mins</Text>
        </View>
        <Button
          title="Start"
          onPress={() => {
            // hide input, set timer active, set break times, and begin work timer
            setShowTimerInput(false);
            setIsActive(true);
            setBreakSeconds(parseInt(breakTime) * 60);
            setModuleSeconds(parseInt(moduleTime) * 60);
            setTimeInterval(
              // start work timer when pressing start button
              setInterval(() => {
                setModuleSeconds(seconds => seconds - 1);
              }, 1000),
            );
          }}></Button>
      </View>
    );
  } else if (!showTimerSelection && !showTimerInput) {
    // active timer presentation
    output = (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text fontSize="40">{moduleName}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              onBreak
                ? setBreakSeconds(seconds => seconds + 300)
                : setModuleSeconds(seconds => seconds + 300);
            }}>
            <Image // This button adds 5 min to current duration
              style={{height: 40, width: 40}}
              source={require('./icons/stopwatch_icon.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              width: 100,
              height: 40,
              textAlignVertical: 'center',
              borderWidth: 1,
              margin: 2,
            }}>
            <Text>{formatTime()}</Text>
          </View>
          <TouchableOpacity // stop button
            onPress={() => {
              setIsActive(false);
              setShowTimerInput(true);
              setOnBreak(false);
              setTimeInterval(clearInterval(timeInterval));
            }}>
            <Image
              style={{height: 40, width: 40}}
              source={require('./icons/stop_icon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
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
