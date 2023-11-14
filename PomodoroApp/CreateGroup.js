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

function CreateGroup({route}) {
  const [name, setName] = useState('');
  const {navigation, id} = route.params;

  const groupCreation = async () => {
    try {
      const tmp = await AsyncStorage.getItem('groups');
      const currentGroups = JSON.parse(tmp);
      let jsonGroup = null;
      if (currentGroups != null) {
        const newGroups = [...currentGroups, name];
        jsonGroup = JSON.stringify(newGroups);
      } else {
        jsonGroup = JSON.stringify([name]);
      }
      await AsyncStorage.setItem('groups', jsonGroup);

      navigation.navigate('Flashcards', {
        navigation: navigation,
        id: id + 1,
      });
    } catch (e) {
      // Handle saving error
      console.error('Failed to save the new group', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>Name: </Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} />
      <Button onPress={groupCreation}>Create group</Button>
    </View>
  );
}

export default CreateGroup;
