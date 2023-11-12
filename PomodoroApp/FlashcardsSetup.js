import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
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
    width: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  icon: {
    width: 120,
    height: 120,
    margin: 20,
  },
  titleContainer: {
    // flex: 1,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'top',
    fontSize: 25,
    color: 'black',
  },
});

function FlashcardsSetup({route}) {
  const [randomNumber, setRandomNumber] = useState('1');
  const [unseenNumber, setUnseenNumber] = useState('1');
  const [flashcardSet, setFlashcardSet] = useState([]);
  const {navigation, flashcardSetName} = route.params;

  useEffect(() => {
    const getFlashcards = async () => {
      const cards = await AsyncStorage.getItem(flashcardSetName);
      setFlashcardSet(JSON.parse(cards));
    };
    getFlashcards();
  }, [flashcardSetName]);

  const setCardSeen = async index => {
    const res = flashcardSet.map((o, i) =>
      i == index ? {question: o.question, answer: o.answer, seen: true} : o,
    );
    console.log(res);
    await AsyncStorage.setItem(flashcardSetName, JSON.stringify(res));
    setFlashcardSet(res);
  };

  const startUnseenQuiz = () => {
    if (!flashcardSet) {
      alert('No flashcards!');
      return;
    }
    const unseen = flashcardSet.filter(i => i.seen == false);

    if (unseen.length < unseenNumber) {
      alert('Not enough unseen!');
      return;
    }

    const selected = unseen.slice(0, unseenNumber);

    navigation.navigate('FlashcardQuiz', {
      flashcardSet: {name: flashcardSet.name, items: selected},
      flashcardSetName: flashcardSetName,
      flashcardSetHook: setCardSeen,
    });
  };

  const startRandomQuiz = () => {
    if (!flashcardSet) {
      alert('No flashcards!');
      return;
    }

    if (flashcardSet.length < randomNumber) {
      alert('Not enough flashcards!');
      return;
    }

    const selected = flashcardSet.slice(0, randomNumber);

    navigation.navigate('FlashcardQuiz', {
      flashcardSet: {name: flashcardSet.name, items: selected},
      flashcardSetName: flashcardSetName,
      flashcardSetHook: setCardSeen,
    });
  };

  const reviewPastAttempts = () => {
    //TBD
  };

  const createCard = () => {
    navigation.navigate('CreateCard', {
      flashcardSetName: flashcardSetName,
      navigation: navigation,
    });
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.titleContainer}>{flashcardSetName} quiz</Text>
      </View>

      <View style={styles.container}>
        <View>
          <Button
            mode="outlined"
            style={{borderRadius: 0}}
            onPress={startUnseenQuiz}>
            Start unseen quiz
          </Button>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setUnseenNumber}
            value={unseenNumber}
          />
        </View>

        <View>
          <Button
            mode="outlined"
            style={{borderRadius: 0}}
            onPress={startRandomQuiz}>
            Start random quiz
          </Button>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setRandomNumber}
            value={randomNumber}
          />
        </View>

        <Button
          mode="outlined"
          style={{borderRadius: 0}}
          onPress={reviewPastAttempts}>
          Review past attempts
        </Button>

        <Button mode="outlined" style={{borderRadius: 0}} onPress={createCard}>
          Create new card
        </Button>

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
