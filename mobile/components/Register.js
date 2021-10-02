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

export default function Register({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  async function registerUser() {
    setUserData({
      username: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    });
    const data = userData;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    };
    console.log(data, 'send');
    await fetch('http://192.168.0.37:3001/users/register', options)
      .then(data => {
        if (data.status >= 200 && data.status < 300) {
          console.log(data, 'data');
        }
      })
      .catch(error => {
        console.log('There has been a problem with the fetch', error);
      });
  }

  return (
    <View>
      <View style={styles.inputsView}>
        <Text style={styles.title}>Welcome</Text>
        <View style={styles.singularInput}>
          <Text>First Name</Text>
          <TextInput
            placeholder="First Name"
            onChangeText={text => setFirstName(text)}
            style={styles.input}
            autoCapitalize="none"
            defaultValue=""
          />
        </View>
        <View style={styles.singularInput}>
          <Text>Last Name</Text>
          <TextInput
            placeholder="Last Name"
            onChangeText={text => setLastName(text)}
            style={styles.input}
            autoCapitalize="none"
            defaultValue=""
          />
        </View>
        <View style={styles.singularInput}>
          <Text>Email</Text>
          <TextInput
            placeholder="Your Email"
            onChangeText={text => setEmail(text)}
            style={styles.input}
            defaultValue=""
            autoCapitalize="none"
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
        <TouchableOpacity style={styles.registerBtn} onPress={registerUser}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        <Text
          style={styles.redirect}
          onPress={() => navigation.navigate('Login')}>
          Already registered?
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
