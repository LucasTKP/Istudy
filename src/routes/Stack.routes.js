import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { AllConquest } from '../screens/AllConquest';
import { CreateNewDeck } from '../screens/CreateNewDeck';
import { ShowFlashCard } from '../screens/ShowFlashCard';
import { Filter } from '../screens/Filter';

import { InsertFlashCard } from '../screens/InsertFlashCard';


export function StackRoutes() {
  return (
    <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: '',
              headerTransparent: true,
              headerShown: false
            }}
          />


      <Screen
          name="InsertFlashCard"
          component={InsertFlashCard}
          options={{
            title: '',
            headerTintColor: '#FFF',
            headerShadowVisible: false,
            headerStyle: {backgroundColor: '#005483', borderWidth:0},
          }}
          />


          <Stack.Screen
            name="Profile"
            component={Profile}
          />   
          
          <Stack.Screen
            name="AllConquest"
            component={AllConquest}
          />




          <Stack.Screen
            name="ShowFlashCard"
            component={ShowFlashCard}
            />


          <Stack.Screen
            name="CreateNewDeck"
            component={CreateNewDeck}
            options={{
              title: '',
              headerTransparent: true,
              headerShown: false
            }}
            />

          <Stack.Screen
            name="Filter"
            component={Filter}
          />
    </Stack.Navigator>
  )
}



