import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import { SignUp} from '../screens/SignUp';
import { Entry } from '../screens/Entry';
import { ResetPassword } from '../screens/ResetPassword';

 
const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
      <Navigator>

        <Screen
          name="Entry"
          component={Entry}
        />

        <Screen
          name="SignIn"
          component={SignIn}
        />  

        <Screen
          name="SignUp"
          component={SignUp}
        />

        <Screen
          name="ResetPassword"
          component={ResetPassword}
          />    
        
      </Navigator>
  )
}

