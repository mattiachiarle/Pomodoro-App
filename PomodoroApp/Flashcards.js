import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';

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

function FlashcardsScreen({route}) {
  // const flashcardSets = [
  //   {name: 'HW1', numberCreated: 3},
  //   {name: 'HW2', numberCreated: 10},
  //   {name: 'HW3', numberCreated: 1},
  // ];
  const [groups, setGroups] = useState([]);
  const [num, setNum] = useState([]);
  const {navigation, id} = route.params;

  const isFocused = useIsFocused();

  // useFocusEffect(() => {
  //   console.log('Screen focused. Refreshing...');
  //   refreshScreen();
  // }, [refreshScreen]);

  const refreshScreen = useCallback(async () => {
    // Implement the logic to refresh or fetch new data
    // For example, you can re-fetch the groups and num data
    setGroups([]);
    setNum([]);
    await retrieveGroups();
  }, []);

  const navigateToSetup = setName => {
    navigation.navigate('FlashcardsSetup', {
      flashcardSetName: setName,
      navigation: navigation,
    });
  };

  // useEffect(() => {
  //   // if (!isFocused) {
  //   //   return;
  //   // }
  //   // const focusListener = navigation.addListener('focus', () => {
  //   //   console.log('Screen focused. Refreshing...');
  //   //   // Add your logic to run when the screen is focused
  //   //   refreshScreen();
  //   // });
  //   retrieveGroups();
  //   console.log(groups);
  //   console.log(num);
  //   return () => {
  //     focusListener();
  //   };
  // }, [navigation, refreshScreen]);

  useEffect(() => {
    if (isFocused) {
      console.log('Screen focused. Refreshing...');
      refreshScreen();
    }
  }, [isFocused, refreshScreen]);

  const retrieveGroups = async () => {
    const tmp = await AsyncStorage.getItem('groups');
    const group = JSON.parse(tmp);
    // console.log('After await');
    // console.log(group);
    setGroups(old => {
      console.log(group);
      const newGroups = group;
      if (newGroups) {
        newGroups.forEach(async g => {
          // const tmp = [...num];
          const tmpNum = await AsyncStorage.getItem(g);
          console.log(tmpNum);
          let n = 0;
          if (tmpNum) {
            n = JSON.parse(tmpNum).length;
          }
          // tmp.push(n);
          setNum(old => [...old, n]);
        });
      }
      return newGroups;
    });
    console.log(num);
  };

  const createGroup = () => {
    navigation.navigate('CreateGroup', {
      navigation: navigation,
      id: id,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require('./icons/book_icon.png')} style={styles.icon} />
      {groups && groups.length > 0 ? (
        groups.map((set, index) => (
          <TouchableOpacity
            key={index}
            style={styles.flashcardsInfo}
            onPress={() => navigateToSetup(set)}>
            <Text style={styles.flashcardsText}>{set}</Text>
            <Text style={styles.flashcardsText}>{`${
              num.length > index ? num[index] : 0
            } Flashcards created`}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <></>
      )}
      <Button
        mode="outlined"
        style={{borderRadius: 0, margin: 10}}
        onPress={createGroup}>
        Create new group
      </Button>
    </View>
  );
}

export default FlashcardsScreen;
