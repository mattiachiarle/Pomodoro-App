import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  icon: {
    width: 50,
    height: 50,
    margin: 10,
  },
  titleContainer: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'top',
    fontSize: 30,
    color: 'black',
    margin: 20,
    flexDirection: 'row',
  },
});

function FlashcardsSetup({route}) {
  const [randomNumber, setRandomNumber] = useState('1');
  const [unseenNumber, setUnseenNumber] = useState('1');
  const [flashcardSet, setFlashcardSet] = useState([]);
  const {navigation, flashcardSetName} = route.params;

  useEffect(() => {
    const getFlashcards = async () => {
      try {
        console.log(flashcardSetName);
        const cards = await AsyncStorage.getItem(flashcardSetName);
        setFlashcardSet(JSON.parse(cards).items);
      } catch (e) {
        console.log(e);
      }
    };
    getFlashcards();
  }, [flashcardSetName]);

  const setCardSeen = async index => {
    const res = flashcardSet.map((o, i) =>
      i == index ? {question: o.question, answer: o.answer, seen: true} : o,
    );

    await AsyncStorage.setItem(flashcardSetName, JSON.stringify(res));
    setFlashcardSet(res);
  };

  const startUnseenQuiz = () => {
    if (!flashcardSet) {
      alert('No flashcards!');
      return;
    }
    const unseen = flashcardSet.filter(i => i.seen == false);

    if (unseen.length < parseInt(unseenNumber)) {
      alert('Not enough unseen!');
      return;
    }

    const selected = unseen.slice(0, parseInt(unseenNumber));

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

    if (flashcardSet.length < parseInt(randomNumber)) {
      alert('Not enough flashcards!');
      console.log(parseInt(randomNumber));
      return;
    }

    const selected = flashcardSet.slice(0, parseInt(randomNumber));

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
        <Image
          style={styles.icon}
          source={require('./icons/share_icon.png')}></Image>
      </View>

      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Button
            mode="outlined"
            style={{borderRadius: 0, margin: 10}}
            onPress={startUnseenQuiz}>
            Start unseen quiz
          </Button>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => {
              setUnseenNumber(parseInt(text));
            }}
            value={unseenNumber}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
          }}>
          <Button
            mode="outlined"
            style={{borderRadius: 0, margin: 10}}
            onPress={startRandomQuiz}>
            Start random quiz
          </Button>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => {
              setRandomNumber(parseInt(text));
            }}
            value={randomNumber}
          />
        </View>

        <Button
          mode="outlined"
          style={{borderRadius: 0, margin: 20}}
          onPress={reviewPastAttempts}>
          Review past attempts
        </Button>

        <Button
          mode="outlined"
          style={{borderRadius: 0, margin: 10}}
          onPress={createCard}>
          Create new card
        </Button>
      </View>
    </>
  );
}

export default FlashcardsSetup;
