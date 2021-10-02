import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import photo from '../extras/photo.jpeg';

export default function UserProfile() {
  const [userToken, setUserToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userData, setuserData] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [toRefresh, setToRefresh] = useState(true);
  let updateResponse;
  let responseAfter;
  const getUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token_key');
      if (value !== null) {
        console.log('token pus bine');
        setUserToken(value);
      } else {
        userToken = 'nuexista';
      }
    } catch (e) {
      // error reading value
    }
  };
  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_id');
      if (value !== null) {
        console.log('token pus bine userid');
        setUserId(value);
      } else {
        userId = 'nuexista userid';
      }
    } catch (e) {
      // error reading value
    }
  };
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + userToken);
  myHeaders.append('Accept', '*/*');

  async function getInfo() {
    const options = {
      method: 'GET',
      headers: myHeaders,
    };
    console.log(userId, 'in fetch');
    await fetch(`http://192.168.0.37:3001/users/${userId}`, options)
      .then(response => {
        responseAfter = response;
      })
      .catch(error => {
        console.log('there has been a problem', error);
      });
    setuserData(await responseAfter.json());
    setNewEmail(userData.email);
    setNewFirstName(userData.firstName);
    setNewLastName(userData.lastName);
  }
  async function updateChanges() {
    const data = {
      username: newEmail,
      firstName: newFirstName,
      lastName: newLastName,
    };
    console.log(data, '????>>>>?????');
    const options = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(data),
    };
    await fetch(`http://192.168.0.37:3001/users/${userId}`, options)
      .then(response => {
        updateResponse = response;
      })
      .catch(error => {
        console.log('there has been a problem', error);
      });
    console.log(updateResponse);
    setNewEmail('');
    setNewFirstName('');
    setNewLastName('');
    setToRefresh(!toRefresh);
  }
  useEffect(() => {
    getUserId();
    getUserToken();
  }, []);

  useEffect(() => {
    getInfo();
    console.log(newLastName, 'lastname new');
  }, [userToken, userId, toRefresh]);

  return (
    <SafeAreaView
      style={{
        height: '100%',
        justifyContent: 'space-between',
      }}>
      <View>
        <View style={styles.userCard}>
          <Image
            source={require('../extras/photo.jpeg')}
            style={styles.image}
          />
          <View style={styles.userDetail}>
            <Text style={styles.label}>First Name: </Text>
            <Text style={styles.info}>{userData.firstName}</Text>
            <Text style={styles.label}>Last Name: </Text>
            <Text style={styles.info}>{userData.lastName}</Text>
            <Text style={styles.label}>Email: </Text>
            <Text style={styles.info}>{userData.username}</Text>
          </View>
        </View>
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            onChangeText={text => setNewFirstName(text)}
            placeholder="New First Name"
            ref={input => {
              this.textInput = input;
            }}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setNewLastName(text)}
            placeholder="New Last Name"
            ref={input => {
              this.textInput = input;
            }}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setNewEmail(text)}
            placeholder="New Email"
            autoCapitalize="none"
            ref={input => {
              this.textInput = input;
            }}
          />
        </View>
        <TouchableOpacity style={styles.updateBtn} onPress={updateChanges}>
          <Text style={styles.updateBtnText}>Update</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../extras/Timerio-logos.jpeg')}
        style={styles.footerimage}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#77bc3f',
    margin: 4,
  },
  image: {width: 100, height: 120, margin: 5},
  userDetail: {},
  label: {color: '#77bc3f', fontSize: 20},
  info: {fontSize: 15},
  inputArea: {margin: 5},
  input: {
    borderWidth: 1,
    borderColor: '#d4d4d4',
    padding: 8,
    borderRadius: 10,
    margin: 5,
  },
  footerimage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  updateBtn: {
    borderWidth: 1,
    borderColor: '#77bc3f',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  updateBtnText: {textAlign: 'center', color: '#77bc3f', fontSize: 20},
});
