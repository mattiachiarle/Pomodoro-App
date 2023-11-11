import {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  icon: {
    width: 120,
    height: 120,
    margin: 20,
  },
});

function FlashcardsSetup({route}) {
  const [randomNumber, setRandomNumber] = useState('1');
  const [unseenNumber, setUnseenNumber] = useState('1');
  const {navigation, flashcardSetName, flashcardSet} = route.params;

  console.log(flashcardSetName);

  const startUnseenQuiz = () => {
    navigation.navigate('FlashcardQuiz', {
      flashcardSet: flashcardSet,
      flashcardSetName: flashcardSetName,
    });
  };

  const startRandomQuiz = () => {
    navigation.navigate('FlashcardQuiz', {
      flashcardSet: flashcardSet,
      flashcardSetName: flashcardSetName,
    });
  };

  const reviewPastAttempts = () => {
    //TBD
  };

  const createCard = () => {
    //TBD
  };

  return (
    <>
      <View style={styles.input}>
        <Text>{flashcardSetName} quiz</Text>
      </View>
      <View style={styles.container}>
        <Button onPress={startUnseenQuiz}>Start unseen quiz</Button>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setUnseenNumber}
          value={unseenNumber}
        />

        <Button onPress={startRandomQuiz}>Start random quiz</Button>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setRandomNumber}
          value={randomNumber}
        />

        <Button onPress={reviewPastAttempts}>Review past attempts</Button>

        <Button onPress={createCard}>Create new card</Button>

        {/* <Text>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
        />
        <Image source={require('./icons/timer_icon.png')} style={styles.icon} />
        <Text>Work:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={onChangeWork}
          value={work}
        />
        <Text>Break:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={onChangeBreakTime}
          value={breakTime}
        />
        <Button onPress={startTimer}>START</Button> */}
      </View>
    </>
  );
}

export default FlashcardsSetup;
