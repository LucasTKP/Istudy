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
import { TabBar } from '../screens/TabBar';
 
const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
      <Navigator>

      

        

        <Screen
          name="Entry"
          component={Entry}
          options={{
            title: 'IStudy',
            headerShown: false,       
          }}
        />

      <Screen
          name="TabBar"
          component={TabBar}
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false
          }}
        />

        

        <Screen
          name="SignUp"
          component={SignUp}
          options={{
          headerStyle:{
            backgroundColor:'white', height:100
          }
          }}
        />
        
        

        <Screen
          name="SignIn"
          component={SignIn}
        />  
          
        <Screen
          name="ResetPassword"
          component={ResetPassword}
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
          name="Profile"
          component={Profile}
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
          name="TradeAvatar"
          component={TradeAvatar}
        />

      </Navigator>
  )
}

