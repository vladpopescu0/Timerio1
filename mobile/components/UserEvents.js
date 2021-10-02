import React from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import Eventbar from './Eventbar';
export default function UserEvents() {
  async function getEvents() {
    const options = {
      method: 'GET',
      headers: myHeaders,
    };
    await fetch('http://127.0.0.1:3001/events/', options)
      .then(response => {
        updateResponse = response;
      })
      .catch(error => {
        console.log('there has been a problem', error);
      });
    setallEvents(await updateResponse.json());
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>Your Events</Text>
      {}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
});
