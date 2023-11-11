import {useEffect, useState} from 'react';
import {View, Text, Button, IconButton} from 'react-native-paper';

const flashcardExample = {
  name: 'example set',
  items: [
    {question: 'This is a question 1', answer: 'This is an answer'},
    {question: 'This is a question 2', answer: 'This is an answer 2'},
    {question: 'This is a question 3', answer: 'This is an answer 3'},
  ],
};

async function loadSet({flashcardSetName, loadHook}) {
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
}

function FlashcardsScreen({navigation}) {
  const [flashcardSet, setFlashcardSet] = useState(null);
  useEffect(() => {}, []);

  return (
    <Button
      onPress={() => {
        navigation.navigate('FlashcardQuiz', {
          flashcardSet: flashcardExample,
        });
      }}>
      Flashcard quiz placeholder
    </Button>
  );
}

export default FlashcardsScreen;
