import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import { SignUp} from '../screens/SignUp';
import { Home } from '../screens/Home';
import { Entry } from '../screens/Entry';
import { ResetPassword } from '../screens/ResetPassword';
import { Profile } from '../screens/Profile';
import { AllConquest } from '../screens/AllConquest';
import { CreateNewDeck } from '../screens/CreateNewDeck';
import { ShowFlashCard } from '../screens/ShowFlashCard';
import { Filter } from '../screens/Filter';
import { TradeAvatar } from '../screens/TradeAvatar';
import { Decks } from '../screens/Decks';
 
const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
      <Navigator>
       

<Screen
          name="Entry"
          component={Entry}
          options={{ headerShown: false}}
        />

<Screen
          name="Home"
          component={Home}
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false
          }}
        />

        <Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false}}
        />  

        <Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#FFF',
          }}
        />

        <Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#FFF',
          }}
          />    
          
        <Screen
          name="Profile"
          component={Profile}
        />   

        <Screen
          name="TradeAvatar"
          component={TradeAvatar}
        />
        
        <Screen
          name="AllConquest"
          component={AllConquest}
        />

        <Screen
          name="ShowFlashCard"
          component={ShowFlashCard}
          />

        <Screen
          name="CreateNewDeck"
          component={CreateNewDeck}
          />

        <Screen
          name="Filter"
          component={Filter}
          />
          <Screen
          name="Decks"
          component={Decks}
          options={{
            title: '',
            headerShadowVisible: false,
            headerTintColor: '#FFF',
            headerStyle: {backgroundColor: '#004973'}
          }}
          />


      </Navigator>
  )
}

