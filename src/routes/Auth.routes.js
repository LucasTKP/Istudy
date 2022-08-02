import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import { SignIn } from '../screens/SignIn';
import { SignUp} from '../screens/SignUp';
import { Entry } from '../screens/Entry';
import { ResetPassword } from '../screens/ResetPassword';
import { StackRoutes } from './Stack.routes'

export function AuthRoutes() {
  return (
      <Stack.Navigator>
            <Stack.Screen
                name="Entry"
                component={Entry}
            />

            <Stack.Screen
            name="SignIn"
            component={SignIn}
            />  

            <Stack.Screen
            name="SignUp"
            component={SignUp}
            />

            <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            /> 

            <Stack.Screen 
                name="Home"
                component={StackRoutes}
            />
      </Stack.Navigator>
  )
}

