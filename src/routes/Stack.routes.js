import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import { SignUp} from '../screens/SignUp';
import { Home } from '../screens/Home';
import { Entry } from '../screens/Entry';
import { Confirmation } from '../screens/Confirmation';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
      <Navigator>

        <Screen
          name="Entry"
          component={Entry}
          options={{
            title: 'IStudy',
            headerShown: false
          }}
        />

        <Screen
          name="Login"
          component={SignIn}
        />

        <Screen
          name="Cadastro"
          component={SignUp}
        />

        <Screen
          name="Confirmation"
          component={Confirmation}
          />

        <Screen
          name="Home"
          component={Home}
        />
      </Navigator>
  )
}

