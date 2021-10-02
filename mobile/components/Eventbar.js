import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

export default function Eventbar({
  title,
  text,
  type,
  time,
  id,
  completion,
  start,
}) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + userToken);
  myHeaders.append('Accept', '*/*');
  const [userToken, setUserToken] = useState('');

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
  function convertUTCDateToLocalDate(date) {
    var dateLocal = new Date(date);
    var newDate = new Date(
      dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000,
    );
    console.log(dateLocal.getTimezoneOffset() * 60 * 1000);
    let month = newDate.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = newDate.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    return (
      newDate.getFullYear() +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      newDate.getHours() +
      ':' +
      newDate.getMinutes()
    );
  }

  useEffect(() => {
    getUserToken;
  }, []);

  return (
    <SafeAreaView style={styles.item}>
      <View style={styles.entry}>
        <Text>Title</Text>
        <Text>{title}</Text>
      </View>
      <View style={styles.entry}>
        <Text>Text</Text>
        <Text>{text}</Text>
      </View>
      <View style={styles.entry}>
        <Text>Type</Text>
        <Text>{type}</Text>
      </View>
      <View style={styles.entry}>
        <Text>Start Date</Text>
        <Text>{convertUTCDateToLocalDate(start).toString()}</Text>
      </View>
      <View style={styles.entry}>
        <Text>End Date</Text>
        <Text>{convertUTCDateToLocalDate(time).toString()}</Text>
      </View>
      <View style={styles.entry}>
        <Text>Status</Text>
        <Text>{completion}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  item: {borderColor: 'black', borderWidth: 3, flexDirection: 'row'},
  entry: {backgroundColor: 'grey'},
});
