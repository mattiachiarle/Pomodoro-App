import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', 
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flashcardsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 16,
  },
  flashcardsText: {
    fontSize: 18,
  },
  icon: {
    width: 120,
    height: 120,
  },
});

function FlashcardsScreen({ navigation }) {
  const flashcardSets = [
    { name: 'HW1', numberCreated: 3 },
    { name: 'HW2', numberCreated: 10 },
    { name: 'HW3', numberCreated: 1 },
  ];

  const navigateToSetup = (setName) => {
    navigation.navigate('FlashcardsSetup', {
      flashcardSetName: setName,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./icons/book_icon.png')}
        style={styles.icon}
      />
      {flashcardSets.map((set, index) => (
        <TouchableOpacity
          key={index}
          style={styles.flashcardsInfo}
          onPress={() => navigateToSetup(set.name)}
        >
          <Text style={styles.flashcardsText}>{set.name}</Text>
          <Text style={styles.flashcardsText}>{`${set.numberCreated} Flashcards created`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default FlashcardsScreen;

