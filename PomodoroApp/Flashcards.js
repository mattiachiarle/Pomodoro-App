import {useEffect, useState} from 'react';
import {View, Text, Button, IconButton} from 'react-native-paper';

const flashcardExample = {
  name: 'example set',
  items: [
    {
      question: 'This is a question 1',
      answer: 'This is an answer',
      seen: false,
    },
    {
      question: 'This is a question 2',
      answer: 'This is an answer 2',
      seen: false,
    },
    {
      question: 'This is a question 3',
      answer: 'This is an answer 3',
      seen: false,
    },
  ],
};

/* async function loadSet({flashcardSetName, loadHook}) {
  try {
    const set = await AsyncStorage.getItem(flashcardSetName);

    if (set === null) return;
    JSON.parse(set);
  } catch (e) {
    console.error('Failed to load flashcard set.');
  }
}

async function saveSet({flashcardSet}) {
  try {
    await AsyncStorage.setItem(flashcardSet.name, flashcardSet);
  } catch (e) {
    console.error('Failed to load flashcard set.');
  }
} */

function FlashcardsScreen({navigation}) {
  const [flashcardSetName, setFlashcardSetName] = useState('Example Set 1');
  const [flashcardSet, setFlashcardSet] = useState(flashcardExample);

  return (
    <>
      <Button
        onPress={() => {
          navigation.navigate('FlashcardsSetup', {
            navigation: navigation,
            flashcardSet: flashcardExample,
            flashcardSetName: flashcardSetName,
            flashcardSetHook: setFlashcardSet,
          });
        }}>
        Flashcard quiz placeholder
      </Button>
      <Button
        onPress={() => {
          console.log(flashcardSet);
        }}>
        View state
      </Button>
    </>
  );
}

export default FlashcardsScreen;
