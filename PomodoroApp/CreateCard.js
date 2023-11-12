import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {Text, TextInput, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 200,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
    color: 'black',
  },
});

function CreateCard({route}) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const {navigation, flashcardSetName} = route.params;

  const cardCreation = async () => {
    try {
      const card = {
        question: question,
        answer: answer,
        seen: false,
      };
      const currentCards = await AsyncStorage.getItem(flashcardSetName);
      let jsonCard = null;
      if (currentCards != null) {
        const newCards = [...currentCards, card];
        jsonCard = JSON.stringify(newCards);
      } else {
        jsonCard = JSON.stringify([card]);
      }
      await AsyncStorage.setItem(flashcardSetName, jsonCard);

      navigation.navigate('FlashcardsSetup', {
        navigation: navigation,
        flashcardSetName: flashcardSetName,
      });
    } catch (e) {
      // Handle saving error
      console.error('Failed to save the new card', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>Question: </Text>
      <TextInput
        style={styles.input}
        onChangeText={setQuestion}
        value={question}
        multiline={true}
      />
      <Text style={{color: 'black'}}>Answer: </Text>
      <TextInput style={styles.input} onChangeText={setAnswer} value={answer} />
      <Button onPress={cardCreation}>Create card</Button>
    </View>
  );
}

export default CreateCard;
