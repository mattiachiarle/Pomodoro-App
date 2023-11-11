import {React, useState, useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

function FlashcardQuiz({route}) {
  const {flashcardSet} = route.params;
  return (
    <View style={styles.page}>
      <Text style={styles.title}>{flashcardSet.name}</Text>
      <View style={styles.questionWindow}></View>
      <View style={styles.answerWindow}></View>
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button} title="Prev"></TouchableOpacity>
        <TouchableOpacity style={styles.button} title="Show"></TouchableOpacity>
        <TouchableOpacity style={styles.button} title="Next"></TouchableOpacity>
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
    backgroundColor: 'blue',
  },
  answerWindow: {
    backgroundColor: 'red',
    flex: 4,
  },
  buttonsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 10,
    height: 10,
    margin: 5,
  },
});

export default FlashcardQuiz;
