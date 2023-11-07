import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ToDoScreen(){
  const [toDos, setToDos] = useState([]);
  const [newToDo, setNewToDo] = useState('');

  // Load ToDos from AsyncStorage on component mount
  useEffect(() => {
    const loadToDos = async () => {
      try {
        const jsonToDos = await AsyncStorage.getItem('toDos');
        if (jsonToDos) {
          setToDos(JSON.parse(jsonToDos));
        }
      } catch (e) {
        // Handle loading error
        console.error('Failed to load toDos.', e);
      }
    };

    loadToDos();
  }, []);

  // Save toDos to AsyncStorage when toDos state changes
  useEffect(() => {
    const saveToDos = async () => {
      try {
        const jsonToDos = JSON.stringify(toDos);
        await AsyncStorage.setItem('toDos', jsonToDos);
      } catch (e) {
        // Handle saving error
        console.error('Failed to save toDos.', e);
      }
    };

    saveToDos();
  }, [toDos]);

  const addToDo = () => {
    if (newToDo.trim()) {
      const newToDos = [...toDos, { id: Date.now(), text: newToDo, completed: false }];
      setToDos(newToDos);
      setNewToDo('');
    }
  };

  const toggleCompletion = (id) => {
    const newToDos = toDos.map(toDo => toDo.id === id ? { ...toDo, completed: !toDo.completed } : toDo);
    setToDos(newToDos);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new ToDo"
        value={newToDo}
        onChangeText={setNewToDo}
      />
      <Button title="Add ToDo" onPress={addToDo} />
      <FlatList
        data={toDos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.toDoItem}>
            <Text style={[styles.toDoText, item.completed && styles.toDoCompleted]}>
              {item.text}
            </Text>
            <Button title={item.completed ? 'Mark Incomplete' : 'Mark Complete'} onPress={() => toggleCompletion(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  toDoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  toDoText: {
    fontSize: 18,
  },
  toDoCompleted: {
    textDecorationLine: 'line-through',
  },
});

export default ToDoScreen;
