import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ToDoScreen() {
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

  const Checkbox = ({ isChecked, onPress }) => {
    return (
      <TouchableOpacity style={styles.checkbox} onPress={onPress}>
        {isChecked && <View style={styles.checked} />}
      </TouchableOpacity>
    );
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
            <Checkbox
              isChecked={item.completed}
              onPress={() => toggleCompletion(item.id)}
            />
            <Text style={[styles.toDoText, item.completed && styles.toDoCompleted]}>
              {item.text}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  toDoText: {
    fontSize: 18,
    flex: 1, // Added to ensure text takes up the remaining space
  },
  toDoCompleted: {
    textDecorationLine: 'line-through',
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checked: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
});

export default ToDoScreen;
