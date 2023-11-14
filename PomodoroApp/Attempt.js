import {React, useState, useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Attempt({route}) {
  const {flashcardSet} = route.params;
  console.log(flashcardSet);
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  const [questionText, setQuestionText] = useState(
    flashcardSet[flashcardIndex].question,
  );
  const [answerText, setAnswerText] = useState(
    flashcardSet[flashcardIndex].answer,
  );
  const numFlashcards = flashcardSet.length;

  const [result, setResult] = useState(flashcardSet[flashcardIndex].correct);

  useEffect(() => {
    resetText();
  }, [flashcardIndex]);

  function resetText() {
    setQuestionText(flashcardSet[flashcardIndex].question);
    setAnswerText(flashcardSet[flashcardIndex].answer);
    setResult(flashcardSet[flashcardIndex].correct);
    return;
  }

  return (
    <View style={styles.page}>
      <View style={styles.questionWindow}>
        <Text>{questionText}</Text>
      </View>
      <View style={styles.answerWindow}>
        <Text>{answerText}</Text>
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
        <Text style={styles.buttonText}>{result ? 'Correct' : 'Wrong'}</Text>
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

export default Attempt;
