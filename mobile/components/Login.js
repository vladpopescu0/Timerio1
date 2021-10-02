import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  Touchable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userValue, setUserValue] = useState({});

  const storeData = async (value1, value2) => {
    try {
      await AsyncStorage.setItem('@token_key', value1);
      await AsyncStorage.setItem('@user_id', value2);
    } catch (e) {
      console.log('error, token not saved');
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token_key');
      if (value !== null) {
        console.log('token pus bine', value);
        navigation.navigate('Register');
      }
    } catch (e) {
      // error reading value
    }
  };
  async function loginEvent() {
    setUserValue({username: email, password: password});
    const data = userValue;
    console.log(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response2 = await fetch(
      'http://192.168.0.37:3001/users/authenticate',
      options,
    ).catch(error => {
      console.log('There has been a problem with the fetch', error);
      throw error;
    });
    let body = await response2.json();
    console.log(body, 'bodybodybody');
    if (body?.token) {
      storeData(body.token, body.id.toString());
      getData();
    } else {
      console.log('Login Invalid');
    }
  }

  return (
    <View>
      <View style={styles.inputsView}>
        <Text style={styles.title}>Welcome back</Text>
        <View style={styles.singularInput}>
          <Text>Email</Text>
          <TextInput
            placeholder="Your Email"
            onChangeText={text => setEmail(text)}
            style={styles.input}
            autoCapitalize="none"
            defaultValue=""
          />
        </View>
        <View style={styles.singularInput}>
          <Text>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Your Password"
            onChangeText={text => setPassword(text)}
            style={styles.input}
            autoCapitalize="none"
            defaultValue=""
          />
        </View>
        <TouchableOpacity style={styles.registerBtn} onPress={loginEvent}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <Text
          style={styles.redirect}
          onPress={() => navigation.navigate('Register')}>
          New here? Create an account
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#d4d4d4',
    padding: 8,
    borderRadius: 10,
  },
  singularInput: {
    margin: 10,
  },
  inputsView: {
    marginTop: -10,
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
    width: '100%',
  },
  title: {fontSize: 30, textAlign: 'center'},
  registerBtn: {
    backgroundColor: '#0d6efd',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  btnText: {color: 'white', fontSize: 30, textAlign: 'center'},
  redirect: {
    color: '#d4d4d4',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
});
