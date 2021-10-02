import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';

export default function AddEvent() {
  const [start, setStart] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const [userToken, setUserToken] = useState('');
  const [selectedType, setSelectedType] = useState('Sport');

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + userToken);
  myHeaders.append('Accept', '*/*');

  const getUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token_key');
      if (value !== null) {
        console.log('token pus bine');
        setUserToken(value);
      } else {
        setUserToken('nuexista');
      }
    } catch (e) {
      // error reading value
    }
  };
  async function createEvent() {
    const data = {
      title: title,
      text: text,
      completion: 'ONGOING',
      start: start,
      time: time,
      type: selectedType,
    };
    const option = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    await fetch('http://192.168.0.37:3001/events/', option)
      .then(response => {
        updateResponse = response;
      })
      .catch(error => {
        console.log('there has been a problem', error);
      });
  }

  useEffect(() => {
    getUserToken();
  }, []);

  const currentDate = new Date();
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Add an event</Text>
        <TextInput
          style={styles.input}
          placeholder="Event Title"
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Event Text"
          onChangeText={text => setText(text)}
        />
        <Text style={styles.span}>Select a Type:</Text>
        <Picker
          selectedValue={selectedType}
          style={styles.typePicker}
          onValueChange={value => setSelectedType(value)}>
          <Picker.Item label="Sport" value="Sport" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Eat" value="Eat" />
          <Picker.Item label="Relax" value="Relax" />
          <Picker.Item label="Self Care" value="Self Care" />
          <Picker.Item label="Something else" value="Something else" />
        </Picker>
        <Text style={styles.span}>Start Date:</Text>
        <DatePicker
          date={start}
          onDateChange={setStart}
          style={styles.picker}
          minimumDate={currentDate}
        />
        <Text style={styles.span}>End Date:</Text>
        <DatePicker
          date={time}
          onDateChange={setTime}
          minimumDate={start}
          style={styles.picker}
        />
        <TouchableOpacity onPress={createEvent} style={styles.createBtn}>
          <Text style={styles.btnText}>Add Event</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#d4d4d4',
    margin: 5,
    marginLeft: '10%',
    marginRight: '10%',
    fontSize: 20,
    padding: 8,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  span: {
    fontSize: 24,
    marginLeft: '10%',
  },
  picker: {
    height: 100,
    marginLeft: '10%',
  },
  createBtn: {
    borderWidth: 1,
    borderColor: '#77bc3f',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: '10%',
    marginRight: '10%',
  },
  btnText: {
    textAlign: 'center',
    color: '#77bc3f',
    fontSize: 20,
  },
  typePicker: {
    marginLeft: '10%',
    marginRight: '10%',
    height: 200,
  },
});
