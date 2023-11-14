import {React, useState, useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FlashcardQuiz({route}) {
  const {flashcardSet, flashcardSetName, flashcardSetHook} = route.params;
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [attempt, setAttempt] = useState([]);
  const [prevAttempts, setPrevAttempts] = useState([]);

  const [questionText, setQuestionText] = useState(
    flashcardSet.items[flashcardIndex].question,
  );
  const [answerText, setAnswerText] = useState(
    flashcardSet.items[flashcardIndex].answer,
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const numFlashcards = flashcardSet.items.length;

  useEffect(() => {
    const retrivePreviousAttempts = async () => {
      const tmp = await AsyncStorage.getItem(`${flashcardSetName}-attempts`);
      const prev = JSON.parse(tmp);
      if (!prev) {
        setPrevAttempts([]);
      } else {
        setPrevAttempts([...prev]);
      }
    };
    retrivePreviousAttempts();
  }, []);

  useEffect(() => {
    resetText();
  }, [flashcardIndex]);

  function resetText() {
    setShowAnswer(false);
    setQuestionText(flashcardSet.items[flashcardIndex].question);
    setAnswerText(flashcardSet.items[flashcardIndex].answer);
    // flashcardSet.items[flashcardIndex].seen = true;
    flashcardSetHook(flashcardIndex);
    return;
  }

  const updateAttempt = async (index, correct) => {
    console.log(attempt);
    const inserted = attempt.filter(a => a.id === index);
    console.log(inserted);

    const updatedAttempt =
      inserted.length > 0
        ? attempt.map(a =>
            a.id === index
              ? {
                  id: index,
                  question: flashcardSet.items[index].question,
                  answer: flashcardSet.items[index].answer,
                  correct: correct,
                }
              : a,
          )
        : [
            ...attempt,
            {
              id: index,
              question: flashcardSet.items[index].question,
              answer: flashcardSet.items[index].answer,
              correct: correct,
            },
          ];

    const jsonAttempt = JSON.stringify([...prevAttempts, updatedAttempt]);
    await AsyncStorage.setItem(`${flashcardSetName}-attempts`, jsonAttempt);

    setAttempt(updatedAttempt);

    console.log(attempt);
  };

  return (
    <View style={styles.page}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.title}>{flashcardSetName}</Text>
      </View>
      <View style={styles.questionWindow}>
        <Text>{questionText}</Text>
      </View>
      <View style={styles.answerWindow}>
        <Text>{showAnswer ? answerText : ''}</Text>
      </View>
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.button}
          title="Prev"
          onPress={() => {
            if (flashcardIndex > 0) {
              setFlashcardIndex(flashcardIndex - 1);
            }
          }}>
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>
        {showAnswer ? (
          <View>
            <TouchableOpacity
              style={styles.button}
              title="Show"
              onPress={() => {
                updateAttempt(flashcardIndex, true);
              }}>
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              title="Show"
              onPress={() => {
                updateAttempt(flashcardIndex, false);
              }}>
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.button}
            title="Show"
            onPress={() => {
              setShowAnswer(true);
            }}>
            <Text style={styles.buttonText}>Show Answer</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          title="Next"
          onPress={() => {
            if (flashcardIndex < numFlashcards - 1) {
              setFlashcardIndex(flashcardIndex + 1);
            }
          }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  questionWindow: {
    flex: 4,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  answerWindow: {
    flex: 4,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default FlashcardQuiz;
