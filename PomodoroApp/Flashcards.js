import {useEffect, useState} from 'react';
import {View, Text, Button, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const flashcardExample = {
  name: 'Example Set 1',
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

async function saveSet(flashcardSet) {
  try {
    await AsyncStorage.setItem(flashcardSet.name, JSON.stringify(flashcardSet));
    Alert.alert('flashcards saved successfully');
  } catch (e) {
    console.error(e);
  }
}

function FlashcardsScreen({navigation}) {
  const [flashcardSetName, setFlashcardSetName] = useState('Example Set 1');

  return (
    <>
      <Button
        onPress={() => {
          navigation.navigate('FlashcardsSetup', {
            navigation: navigation,
            flashcardSetName: flashcardSetName,
          });
        }}>
        Flashcard quiz placeholder
      </Button>
      <Button
        onPress={() => {
          saveSet(flashcardExample);
        }}>
        Save flashcard set
      </Button>
    </>
  );
}

export default FlashcardsScreen;
