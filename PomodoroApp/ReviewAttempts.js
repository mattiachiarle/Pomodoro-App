import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';

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

function ReviewAttempts({route}) {
  const [attempts, setAttempts] = useState([]);

  const {name, navigation} = route.params;

  useEffect(() => {
    const retrieveAttempts = async () => {
      const tmp = await AsyncStorage.getItem(`${name}-attempts`);
      const att = JSON.parse(tmp);
      if (!att) {
        setAttempts([]);
      } else {
        setAttempts([...att]);
      }
    };
    retrieveAttempts();
  });

  const viewAttempt = set => {
    navigation.navigate('Attempt', {flashcardSet: set});
  };

  return (
    <View style={styles.container}>
      {attempts ? (
        attempts.map((set, index) => (
          <TouchableOpacity
            key={index}
            style={styles.flashcardsInfo}
            onPress={() => viewAttempt(set)}>
            <Text style={styles.flashcardsText}>{`Attempt ${index + 1}`}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <></>
      )}
    </View>
  );
}

export default ReviewAttempts;
