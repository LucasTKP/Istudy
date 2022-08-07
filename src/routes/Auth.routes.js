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
                options={{
                  title: '',
                  headerShown: false,
                  headerStyle: {backgroundColor: '#004973', borderWidth:0},
                }}
            />

            <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
                title: '',
                headerTintColor: '#FFF',
                headerShadowVisible: false,
                headerStyle: {backgroundColor: '#004973', borderWidth:0},
              }}
            />  

            <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: '',
              headerTintColor: '#FFF',
              headerShadowVisible: false,
              headerStyle: {backgroundColor: '#004973', borderWidth:0},
            }}
            />

            <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
                title: '',
                headerTintColor: '#FFF',
                headerShadowVisible: false,
                headerStyle: {backgroundColor: '#004973', borderWidth:0},
              }}
            /> 

            <Stack.Screen 
                name="Home"
                component={StackRoutes}
            />
      </Stack.Navigator>
  )
}

