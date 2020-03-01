import React, { Component } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './components/home'
import AddList from './components/add-list'

const Stack = createStackNavigator();

function MainStackNavigator(){

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false,}}>
        <Stack.Screen name="Home" component={Home} initialParams={{ listName: '' }} />
         <Stack.Screen name="AddList" component={AddList} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator