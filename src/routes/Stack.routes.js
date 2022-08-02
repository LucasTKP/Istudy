import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { AllConquest } from '../screens/AllConquest';
import { CreateNewDeck } from '../screens/CreateNewDeck';
import { ShowFlashCard } from '../screens/ShowFlashCard';
import { Filter } from '../screens/Filter';
import { TradeAvatar } from '../screens/TradeAvatar';

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

          <Stack.Screen
            name="Profile"
            component={Profile}
          />   

          <Stack.Screen
            name="TradeAvatar"
            component={TradeAvatar}
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
            />

          <Stack.Screen
            name="Filter"
            component={Filter}
          />
    </Stack.Navigator>
  )
}



