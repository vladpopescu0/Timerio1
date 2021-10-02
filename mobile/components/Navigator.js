import React from 'react';
import {} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './Register';
import Login from './Login';

const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
export default Navigator;
