import React, {useEffect} from 'react';
import {DrawerLayoutAndroid, View} from 'react-native';
import Navigator from './components/Navigator.js';
import Login from './components/Login';
import {NavigationContainer} from '@react-navigation/native';
import AddEvent from './components/AddEvent.js';
import Statistics from './components/Statistics.js';
import UserProfile from './components/UserProfile.js';
import UserEvents from './components/UserEvents.js';

export default function App() {
  return (
    <NavigationContainer>
      <UserEvents />
    </NavigationContainer>
  );
}
